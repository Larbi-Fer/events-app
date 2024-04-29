import { NextResponse } from "next/server"
import dbConnection from '@utils/db'

export const DELETE = async (req, { params: {id} }) => {
    try {
        const {creator} = await req.json()

        const db = await dbConnection()

        const [users] = await db.execute('SELECT userId FROM attendees WHERE eventId = ? AND isAttend = true', [id])
        await db.execute('DELETE FROM attendees WHERE eventId = ?', [id])

        await db.execute('DELETE FROM events WHERE id = ?', [id])
        
        // Send notifications
        const [[creatorData]] = await db.execute('SELECT username FROM users WHERE id = ?', [creator])

        const rows = users.map(user => `(${user.userId}, ${creator}, '${creatorData.username} deleted an event!', '/event/${id}')`).join(', ')
        await db.execute('INSERT INTO notifications(userId, relatedUser, message, redirectUrl) VALUES ' + rows)

        db.end()

        return NextResponse.json({ success: true })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false })
    }
}