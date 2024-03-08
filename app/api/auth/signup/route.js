import { send } from "@utils/VerificationEmail"
import code from "@utils/responses"
import db from "@utils/database"
import moment from "moment"
import { hash } from 'bcrypt'
import { NextResponse } from "next/server"

export const POST = async req => {
    try {
        const body = await req.json()
        const { email, username, password } = body
        const hashedPassword = await hash(password, 10)
        const res = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM users WHERE email=?', email, (err, result) => {
                if (err) return reject(err)
                if (result.length) {
                    if(result[0].active) return resolve({ message: "User already exists", success: false })
                    db.query('SELECT expires, users.id FROM users, verify WHERE email=? AND users.id=verify.id', [email], async(err, result) => {
                        if (err) return reject(err)
                        if (new Date(result[0].expires) < new Date()) {
                                const {code, expires} = await codeHandler(email, username)
                                db.query("UPDATE verify SET code=?, expires=? WHERE id=?", [code, new Date(expires), result[0].id], (err, result) => {
                                    if (err) return reject(err)
                                    return resolve({ success: true, message: 'We send a new code to your email' })
                                })
                        } else return resolve({ success: false, message: 'Active your account'})
                    })
                } else {
                    db.query('INSERT INTO users (email, username, password) VALUES (?, ?, ?)', [ email, username, hashedPassword ], err => {
                        if (err) return reject(err)
                        db.query('SELECT * FROM users WHERE email=?', email, async (err, result) => {
                            try {
                                if (err) return reject(err)
                                const {code, expires} = await codeHandler(email, username)
                                db.query('INSERT INTO verify (id, code, expires) VALUES (?, ?, ?)', [ result[0].id, code, new Date(expires) ], err => {
                                    if (err) return reject(err)
                                    return resolve({ success: true, message: 'We send a code to your email'})
                                })
                            } catch (error) {
                                return reject({ error })
                            }
                        })

                    })
                }
            })
        })
        return NextResponse.json(res)
    } catch (error) {
        return NextResponse.json({ success: false, message: error.code})
    }
}

const codeHandler = async(email, username) => {
    const code = Math.round(Math.random()*900000 + 100000)
    await send(email, code, username)
    const expires = moment().add(1, 'days')
    return { code, expires }
}