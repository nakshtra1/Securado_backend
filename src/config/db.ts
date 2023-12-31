var mysql = require('mysql2');
import * as dotenv from 'dotenv';

dotenv.config();

export const pool = mysql.createPool({
    connectionLimit: 5,
    host     : process.env.DB_HOST,
    port     : process.env.DB_PORT,
    user     : process.env.DB_USER,
    password : process.env.DB_PWD,
    database : process.env.DB_NAME,
    debug: false
});
console.log("database connected ");

