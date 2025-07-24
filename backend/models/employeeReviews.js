import { pool } from '../config/db.js';

export async function getAllEmployeeReviews() {
  const [results] = await pool.query('SELECT * FROM reviews');
  return results;
}