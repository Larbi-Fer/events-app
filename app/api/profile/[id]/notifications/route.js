
import { NextResponse } from "next/server"
import dbConnection from '@utils/db'

export const GET = async(req, { params: { id } }) => {
    try {        
        // GET notifications details
        const db = await dbConnection()
        const [notifications] = await db.execute('SELECT notifications.*, image AS logo FROM notifications, users WHERE userId = ? and users.id = relatedUser ORDER BY createdAt DESC LIMIT 10', [id])
        db.end()

        return NextResponse.json({ success: true, notifications})
    } catch (error) {
        console.error(error);
        return NextResponse.error(error)
    }
}

// Reading the notifications
export const POST = async(req, { params: {id} }) => {
    try {
        const db = await dbConnection()
        await db.execute('UPDATE notifications SET isRead=true WHERE userId = ? AND isRead = false', [id]);
        db.end()

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error(error);
        return NextResponse.error(error)
    }
}

// On open a notification
export const PATCH = async req => {
    try {
        const { notificationId } = await req.json()

        const db = await dbConnection()
        await db.execute('UPDATE notifications SET isOpen=true WHERE id = ?', [notificationId]);
        db.end()

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error(error);
        return NextResponse.error(error)
    }
}