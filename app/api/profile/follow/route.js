import { NextResponse } from "next/server"
import dbConnection from '@utils/db'

export const POST = async(req) => {
    try {
        const db = await dbConnection()
        const { follower, followed } = await req.json()

        const [result] = await db.execute('SELECT * FROM followers WHERE follower = ? AND followed = ?', [follower, followed])

        if (result.length) await db.execute('UPDATE followers SET isFollow = ? WHERE follower = ? AND followed = ?', [!result[0].isFollow, follower, followed])
        else await db.execute('INSERT INTO followers VALUES (?, ?, ?)', [follower, followed, true])

        db.end()
        return NextResponse.json({ success: true, isFollow: !result.length ? true : !result[0].isFollow})
    } catch (error) {
        console.log(error);
        return NextResponse.error({ success: false, error})
    }
}