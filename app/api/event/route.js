import { NextResponse } from 'next/server'

import CODES from '@utils/responses'
import dbConnection from '@utils/db'

// Create a new event
export const POST = async req => {
    try {
        const body = await req.json()

        const params = [ body.creator, body.title, body.description, body.category, body.tags, body.startDate, body.endDate, body.location, body.url, body.dueDate.is, body.max.is, body.attendButton]
        const keys = [ 'creator', 'title', 'description', 'category', 'tags', 'startDate', 'endDate', 'location', 'url', 'isDue', 'isMax', 'attendButton' ]

        const pushToQu = (key, value) => {
            params.push(value)
            keys.push(key)
        }

        // Edit some fields
        if (!body.imageUrl) pushToQu('image', 'https://images/defaultEvent')
            else pushToQu('image', body.imageUrl)
        if (body.dueDate.is) pushToQu('dueDate', body.dueDate.date)
        if (body.max.is) pushToQu('max', body.max.num)
            
            const qu = 'INSERT INTO events (' + keys.join(', ') + ') VALUES (' + keys.map((v, i) => '?') + ')'
            const db = await dbConnection()
            
            const [result] = await db.execute(qu, params)
            
        // Send a notification to users
        const [users] = await db.execute('SELECT follower FROM followers WHERE followed = ? AND isFollow = true', [body.creator]);
        if (!users.length) {
            db.end()
            return NextResponse.json({ success: true, id: result.insertId })
        }
        const [[creator]] = await db.execute('SELECT * FROM users WHERE id = ?', [body.creator]);
        const rows = users.map(user => `(${user.follower}, ${body.creator}, '${creator.username} created a new event - ${body.title}', '/event/${result.insertId}')`).join(', ')

        await db.execute('INSERT INTO notifications(userId, relatedUser, message, redirectUrl) VALUES ' + rows)
    
        db.end()

        return NextResponse.json({ success: true, id: result.insertId })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false })
    }
}


export const GET = async req => {
    try {
        const params = req.nextUrl.searchParams
        const id = params.get('id'), userId = params.get('userId')
        const db = await dbConnection()

        const [result] = await db.execute('SELECT events.*, users.username FROM events, users WHERE events.id=? AND events.creator = users.id', [id])

        if (!result.length) {
            db.end()
            return NextResponse.json({ success: false, message: CODES.NOT_FOUND })
        }


        const query = userId == result[0].creator
                                    ? 'SELECT userId, orderDate, username, email, image, isAttend FROM attendees, users WHERE eventId = ? and isAttend=1 and userId = users.id ORDER BY orderDate'
                                    : 'SELECT userId, isAttend FROM attendees WHERE eventId = ? and isAttend=1'
        const [data] = await db.execute(query, [id])
        if (!userId) {
            db.end()
            return NextResponse.json({ success: true, event: {...result[0], attend: data.length, user: { isAttend: 0 }} })
        }


        const user = data.find(v => v.userId == userId) ?? {}
        if (!user.userId) user.isAttend = 0

        db.end()
        return NextResponse.json({ success: true, event: {...result[0], attend: data.length, user, attendees: userId == result[0].creator ? data : null} })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false })
    }
}