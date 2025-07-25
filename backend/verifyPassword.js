import bcrypt from 'bcrypt';
import mysql from 'mysql2/promise';
import { config } from 'dotenv';
config();

const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

export async function verifyUserPassword(username, plainPassword) {
  try {
    const [rows] = await pool.execute(
      'SELECT password FROM users WHERE username = ?',
      [username]
    );

    if (rows.length === 0) {
      return { success: false, message: 'User not found.' };
    }

    const hashedPassword = rows[0].password;
    const match = await bcrypt.compare(plainPassword, hashedPassword);

    if (match) {
      return { success: true, message: 'Password is correct.' };
    } else {
      return { success: false, message: 'Password is incorrect.' };
    }
  } catch (err) {
    console.error(err);
    return { success: false, message: 'Internal server error.' };
  }
}
