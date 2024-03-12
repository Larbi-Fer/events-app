import { NextResponse } from "next/server"
import dbConnection from '@utils/db'
import { CommentsLimit } from "@/utils/const"

export const GET = async req => {
    try {
        const eventId = req.nextUrl.searchParams.get('eventId')
        const db = await dbConnection()

        const [data] = await db.execute(`SELECT comments.id, u1.username as author, u1.image, comments.authorId, comments.text, comments.date,
                                                cm.id AS id_rep, u2.username AS author_rep, u2.image AS image_rep, cm.text AS text_rep,  cm.authorId AS authorId_rep, cm.date AS date_rep
                                            FROM comments
                                            LEFT JOIN comments AS cm ON cm.reply = comments.id
                                            LEFT JOIN 
                                                users AS u1 ON comments.authorId = u1.id 
                                            LEFT JOIN 
                                                users AS u2 ON cm.authorId = u2.id
                                            WHERE comments.eventId = ? AND comments.reply IS NULL
                                            LIMIT ${CommentsLimit}`, [ eventId ])


        const comments = []
        data.forEach( comment => {
            const i = comments.findIndex( com => com.id == comment.id )
            if ( i < 0 ) {
                const handleData = {
                    id: comment.id,
                    authorId: comment.authorId,
                    author: comment.author,
                    image: comment.image,
                    text: comment.text,
                    date: comment.date,
                    replies: []
                }
                if (comment.id_rep) handleData.replies.push({
                    id: comment.id_rep,
                    authorId: comment.authorId_rep,
                    author: comment.author_rep,
                    image: comment.image_rep,
                    date: comment.date_rep,
                    text: comment.text_rep,
                })
                comments.push(handleData)
            }
            else comments[i].replies.push({
                id: comment.id_rep,
                authorId: comment.authorId_rep,
                author: comment.author_rep,
                date: comment.date_rep,
                text: comment.text_rep,
            })
        } )

        db.end()
        return NextResponse.json({ success: true, comments }, {status: 200})
    } catch (error) {
        console.error(error)
        return NextResponse.json({ success: false, error }, {status: 500})
    }
}