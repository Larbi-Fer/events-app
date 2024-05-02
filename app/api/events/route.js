import { NextResponse } from "next/server"
import dbConnection from '@/utils/db'
import { showEventsLimit } from '@/utils/const'

export const GET = async(req) => {
    try {
        const params = req.nextUrl.searchParams
        var start = params.get('start') || 0 || 10, q = params.get('q'), tag = params.get('tag')
        start = parseInt(start)

        const db = await dbConnection()
        var conditions = ''
        if (tag) {
            conditions += `WHERE tags LIKE '%${tag}%'`
        } else if (q) {
            conditions += `WHERE tags LIKE '%${q}%' OR title LIKE '%${q}%' OR description LIKE '%${q}%'`
        }
        const query = `SELECT * FROM events ${conditions} ORDER BY id DESC`
        const [res] = await db.execute(query, [start, showEventsLimit]);
        db.end()

        return NextResponse.json({ success: true, events: res })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false })
    }
}