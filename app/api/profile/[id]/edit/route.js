import dbConnection from '@utils/db'
import { NextResponse } from "next/server";

export const PATCH = async(req, { params: { id } }) => {
    try {
        const { newUsername } = await req.json();

        if (newUsername) updateUsername(id, newUsername)

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false })
    }
}

const updateUsername = async (id, newUsername) => {
    const db = await dbConnection();
    await db.execute('UPDATE users SET username = ? WHERE id = ?', [newUsername, id])
    db.end();
}