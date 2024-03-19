import dbConnection from '@utils/db'
import { NextResponse } from 'next/server'

export const POST = async (req, res) => {
    try {
        const userId = (await req.json()).userId
        const eventId = res.params.id
        
        const db = await dbConnection()
        
        const [data] = await db.execute('SELECT * FROM attendees WHERE eventId = ? and userId = ?', [eventId, userId])
        if (data.length) {
            await db.execute('UPDATE attendees SET isAttend=?, orderDate=? WHERE eventId = ? and userId = ?', [!data[0].isAttend, new Date(), eventId, userId])
        } else {
            await db.execute('INSERT INTO attendees VALUES (?, ?, ?, ?, ?)', [userId, eventId, new Date(), 1, 0])
        }

        db.end()
        if (!data.length) return NextResponse.json({ success: true, data: { eventId, userId, isAttend: true, isLike: false } })
        return NextResponse.json({ success: true, data: { ...data[0], isAttend: !data[0].isAttend } })
    } catch (error) {
        return NextResponse.json({ success: false, error}, { status: 500 })
    }
}

export const GET = async (req, res) => {
    try {
        const eventId = res.params.id
        const q = req.nextUrl.searchParams.get('q')

        const db = await dbConnection()
        const [result] = await db.execute(`SELECT attendees.*, username, image, email FROM attendees, users WHERE eventId=? AND id=userId AND isAttend=true AND (username LIKE '%${q}%' OR email LIKE '%${q}%' )`, [ eventId ])
        db.end()

        return NextResponse.json({ success: true, users: result })
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error }, { status: 500 })
    }
}