import mysql from 'mysql2/promise'

const dbConnection = async () => await mysql.createConnection({
    host: process.env.HOST_DB,
    user: process.env.USER_DB,
    password: process.env.PASS_DB,
    database: process.env.DATABASE_DB
})

export default dbConnection