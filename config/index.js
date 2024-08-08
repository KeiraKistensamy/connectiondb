import { createPool } from "mysql2";
import 'dotenv/config.js'

let connection = createPool ({
    host: process.env.hostDb,
    user: process.env.userDb,
    password:  process.env.pwdDb,
    database: process.env.dbName,
    multipleStatement: true,
    connectionLimit: 30
})

connection.on('connection', (pool) => {
    if (!pool) throw new Error('Can not connect to database right now ')
})

export {
    connection
}