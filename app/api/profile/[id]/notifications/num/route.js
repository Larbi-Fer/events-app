
import { NextResponse } from "next/server"
import dbConnection from '@utils/db'

export const GET = async(req, { params: { id } }) => {
    try {
        // GET number of new notifications
        const db = await dbConnection()
        const [[res]] = await db.execute('SELECT COUNT(*) AS number FROM notifications WHERE userId = ? and isRead = false', [id])
        db.end()

        return NextResponse.json({ success: true, number: res.number})
    } catch (error) {
        console.error(error);
        return NextResponse.error(error)
    }
}