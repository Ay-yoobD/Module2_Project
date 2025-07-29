import bcrypt from 'bcrypt';
import { config } from 'dotenv';
import { pool } from './config/config.js';
config();

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