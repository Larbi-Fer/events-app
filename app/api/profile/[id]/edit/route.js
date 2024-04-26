import { defaultIcon } from '@utils/const';
import dbConnection from '@utils/db'
import { NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

export const PATCH = async(req, { params: { id } }) => {
    try {
        const { newUsername, newIcon } = await req.json();

        if (newUsername) updateUsername(id, newUsername)
        if (newIcon) updateIcon(id, newIcon)

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

const updateIcon = async (id, newImage) => {
    const db = await dbConnection();
    
    const [[user]] = await db.execute('SELECT image FROM users WHERE id = ?', [id])
    if (user.image != defaultIcon) {
        // Remove the old icon
        const utapi = new UTApi();
        utapi.deleteFiles(user.image.split('/').pop(), {keyType: 'fileKey'})
    }

    await db.execute('UPDATE users SET image = ? WHERE id = ?', [newImage, id])
    db.end();
}