import { NextResponse } from 'next/server'

import dbConnection from '@utils/db'
import CODES from '@/utils/responses'

export const GET = async(req, { params: { id } }) => {
    try {
        const sparams = req.nextUrl.searchParams
        const email = sparams.get('userEmail'), type = sparams.get('type')

        const db = await dbConnection()
        
        // check if the user is found
        const [[profileUser]] = await db.execute('SELECT id, username FROM users WHERE id = ?', [id])
        if (!profileUser) return NextResponse.json({ success: false, message: CODES.NOT_FOUND })

        // Get user details if email is provided
        let user;
        if (email) [[user]] = await db.execute('SELECT id, username FROM users WHERE email = ?', [email])

        // If the current user requested old and specific events (My_Tickets or Organized_Events)
        if (type == 'My_Tickets') {
            const [events] = await db.execute('SELECT events.*, username FROM events, attendees, users WHERE attendees.userId = ? AND events.startDate < NOW() AND attendees.isAttend AND attendees.eventId = events.id AND events.creator = users.id', [id])
            db.end()
            return NextResponse.json({ success: true, events})
        } else if (type == 'Organized_Events') {
            let q = user ?
            'SELECT events.*, attendees.isAttend FROM events LEFT JOIN attendees ON events.id = attendees.eventId AND attendees.userId = ? WHERE creator = ? AND startDate < NOW()' :
            'SELECT * FROM events WHERE creator=? AND startDate < now()';
            const [events] = await db.execute(q, user ? [user.id, id] : [id])
            db.end()

            return NextResponse.json({ success: true, events})
        }

        // retrieve events organized by the user
        let q = user ?
            'SELECT events.*, attendees.isAttend FROM events LEFT JOIN attendees ON events.id = attendees.eventId AND attendees.userId = ? WHERE creator = ? AND startDate > NOW()' :
            'SELECT * FROM events WHERE creator=? AND startDate > now()'
        q += ' LIMIT ?, ?'
        const [organized] = await db.execute(q, user ? [user.id, id, 0, 10] : [id, 0, 10])

        let myTickets;
        // retrieve events attended by the user if the user is the same as the requested id
        if (user?.id == id) [myTickets] = await db.execute('SELECT events.*, username FROM events, attendees, users WHERE attendees.userId = ? AND events.startDate > NOW() AND attendees.isAttend AND attendees.eventId = events.id AND events.creator = users.id', [id])

        var follow;
        // check if the user is following the profile user
        if (user) [[follow]] = await db.execute('SELECT * FROM followers WHERE follower = ? AND followed = ?', [user.id, id])

        // get count of followers and following
        const [[followers]] = await db.execute('SELECT COUNT(*) AS followers FROM followers WHERE followed = ? AND isFollow = true', [id])
        const [[following]] = await db.execute('SELECT COUNT(*) AS following FROM followers WHERE follower = ? AND isFollow = true', [id])

        db.end()

        // return the response with the organized events, my tickets, and the user details
        return NextResponse.json({ success: true, organized, myTickets, user: { isFollow: follow ? ( follow.isFollow ) : false, followersCount: followers.followers, followingCount: following.following}})
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, error: error})
    }
}
