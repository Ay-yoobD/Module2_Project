import express from 'express';
import { 
  getLeaveRequests, 
  createLeaveRequest, 
  updateLeaveStatus,
  getEmployeeNames
} from '../model/leaveRequests.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const results = await getLeaveRequests();
    res.json(results);
  } catch (err) {
    console.error("Error fetching leave requests:", err);
    res.status(500).send('Error fetching leave requests');
  }
});

router.get('/employee-names', async (req, res) => {
  try {
    const names = await getEmployeeNames();
    res.json(names);
  } catch (err) {
    console.error("Error fetching employee names:", err);
    res.status(500).send('Error fetching employee names');
  }
});

router.post('/', async (req, res) => {
  try {
    const { employeeName, date, reason } = req.body;
    await createLeaveRequest(employeeName, date, reason);
    res.status(201).json({ message: 'Leave request created successfully' });
  } catch (err) {
    console.error("Error creating leave request:", err);
    res.status(500).send(err.message || 'Error creating leave request');
  }
});

router.put('/:id', async (req, res) => {
  try {
    console.log("PUT request body:", req.body);
    const { id } = req.params;
    const { status } = req.body;
    await updateLeaveStatus(id, status);
    res.json({ success: true, message: 'Leave request updated successfully' });
  } catch (err) {
    console.error("Error updating leave request:", err);
    res.status(500).json({ success: false, error: err.message || 'Error updating leave request' });
  }
});

export default router;