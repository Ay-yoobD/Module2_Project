import { pool } from '../config/db.js';

export async function getAttendance() {
  const [results] = await pool.query('SELECT * FROM attendance');
  return results;
}