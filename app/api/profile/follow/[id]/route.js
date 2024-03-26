import dbConnection from "@utils/db"
import { NextResponse } from "next/server"

export const GET = async(req, { params: {id} }) => {
    try {
        // Get the follower and followed from the query params
        const type = req.nextUrl.searchParams.get('type')

        // Get the database connection
        const db = await dbConnection()

        // Get the followers or following from the database
        const query = `SELECT follower, followed, username, email, image FROM followers, users WHERE ${type == 'followers' ? 'followed' : 'follower'} = ?
                        AND ${type == 'followers' ? 'follower' : 'followed'} = users.id AND isFollow = true`
        const [result] = await db.execute(query, [id])

        db.end()

        return NextResponse.json({ success: true, [type]: result })
    } catch (error) {
        console.log(error);
        return NextResponse.error({ success: false, error})
    }
}