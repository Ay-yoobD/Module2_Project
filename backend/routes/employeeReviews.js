import express from 'express';
import { getAllEmployeeReviews } from '../model/employeeReviews.js';

const router = express.Router();

router.get('/reviews', async (req, res) => {
  try {
    const results = await getAllEmployeeReviews();
    res.json(results);
  } catch (err) {
    console.error("Error fetching reviews:", err);
    res.status(500).send('Error fetching reviews');
  }
});

export default router;