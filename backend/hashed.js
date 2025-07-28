// import bcrypt from "bcrypt";
// import mysql from "mysql2/promise";
// import fs from "fs/promises";
// import {config} from 'dotenv'
// config();

// async function run() {
//     const rawData = await fs.readFile('../frontend/public/login_credentials.json', 'utf-8');
//     const users = JSON.parse(rawData);

//     const pool = await mysql.createPool({
//         host:process.env.HOST,
//         user:process.env.USER,
//         password:process.env.PASSWORD,
//         database:process.env.DATABASE
//     });

//     for (const user of users) {
//         const hashedPassword = await bcrypt.hash(user.password, 10);
//         try {
//             const [result] = await pool.execute(
//                 'UPDATE users SET password = ? WHERE username = ?',
//                 [hashedPassword, user.username]
//             );

//             if (result.affectedRows === 0) {
//                 console.warn(`No user found with username ${user.username} to update.`);
//             } else {
//                 console.log(`Updated password for ${user.username}`);
//             }
//         } catch (err) {
//             console.error(`Failed to update ${user.username}: ${err.message}`);
//         }
//     }

//     await pool.end();
//     console.log('Done!');
// }

// run();
