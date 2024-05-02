import mysql from 'mysql'

const db = mysql.createConnection({
    host: process.env.HOST_DB,
    user: process.env.USER_DB,
    password: process.env.PASS_DB,
    database: process.env.DATABASE_DB,
    port: process.env.PORT_DB
})

db.connect(err => {
    if (err) return console.error(err)
    console.log("Connect to mysql")
})

export default db