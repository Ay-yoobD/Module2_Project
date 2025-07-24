import express from 'express';
import { getAttendance } from '../models/attendance.js';

const router = express.Router();

router.get('/attendance', async (req, res) => {
  try {
    const results = await getAttendance();
    res.json(results);
  } catch (err) {
    console.error("Error fetching attendance:", err);
    res.status(500).send('Error fetching attendance');
  }
});

export default router;
