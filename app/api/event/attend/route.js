import dbConnection from '@utils/db'
import { NextResponse } from 'next/server'

export const POST = async req => {
    try {
        const params = req.nextUrl.searchParams
        const eventId = params.get('eventId'), userId = params.get('userId')
        const db = await dbConnection()
        
        const [data] = await db.execute('SELECT * FROM attendees WHERE eventId = ? and userId = ?', [eventId, userId])
        if (data.length) {
            await db.execute('UPDATE attendees SET isAttend=? WHERE eventId = ? and userId = ?', [!data[0].isAttend, eventId, userId])
        } else {
            await db.execute('INSERT INTO attendees VALUES (?, ?, ?, ?)', [userId, eventId, 1, 0])
        }

        db.end()
        if (!data.length) return NextResponse.json({ success: true, data: { eventId, userId, isAttend: true, isLike: false } })
        return NextResponse.json({ success: true, data: { ...data[0], isAttend: !data[0].isAttend } })
    } catch (error) {
        return NextResponse.json({ success: false, error})
    }
}