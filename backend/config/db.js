import { config } from 'dotenv';
config({ path: '../.env'});

import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});