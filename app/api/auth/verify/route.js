import db from "@utils/database"
import { NextResponse } from "next/server"

export const POST = async req => {
    try {
        const flds = await req.json()
        const result = await new Promise((resolve, reject) => {
            db.query(`SELECT users.id, code, active FROM verify, users WHERE email = ? AND users.id = verify.id`, [flds.email], (err, result) => {
                if (err) return reject(err);
                if (!result.length) {
                    db.query('SELECT id FROM users WHERE email = ?', [flds.email], (err, result) => {
                        if (err) return reject(err);
                        if (result.length) return resolve({ success: false, message: 'This account already active'});
                        else return resolve({ success: false, message: 'This account not found, go to Sign Up page' });
                    })
                } else {
                    if (result[0].code != flds.code) return resolve({ success: false, message: 'Invalid'});
                    if (new Date(result[0].expires) < new Date()) return resolve({ success: false, message: 'Date Expires, signup again' });
                    db.query('CALL accActivate(?)', [result[0].id], err => err ? reject(err) : resolve({ success: true }))
                }
            })
        })
        db.end()
        return NextResponse.json({OK: true, result});
    } catch (error) {
        return NextResponse.json({OK: false, success: false, error});
    }
}