import { NextResponse } from 'next/server'

import CODES from '@utils/responses'
import db from '@utils/database'

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

        const result = await new Promise((resolve, reject) => {
            db.query(qu, params, (err, res) => {
                if (err) return reject(err)
                resolve(res)
            })
        })

        return NextResponse.json({ success: true, id: result.insertId })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false })
    }
}


export const GET = async req => {
    try {
        // const body = await req.json()
        const id = req.nextUrl.searchParams.get('id')

        const result = await new Promise((resolve, reject) => {
            db.query('SELECT events.*, users.username FROM events, users WHERE events.id=? AND events.creator = users.id', [id], (err, res) => {
                if (err) return reject(err)
                resolve(res)
            })
        })

        if (!result.length) return NextResponse.json({ success: false, message: CODES.NOT_FOUND })
        return NextResponse.json({ success: true, event: result[0] })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false })
    }
}