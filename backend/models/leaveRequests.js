import { pool } from '../config/db.js';
export async function getLeaveRequests() {
  const [results] = await pool.query(`
    SELECT lr.leaveRequestID, lr.Date, lr.Reason, lr.Status, u.Name
    FROM leave_requests lr
    JOIN users u ON lr.EmployeeID = u.EmployeeID
    ORDER BY lr.Date DESC
  `);
  return results;
}
export async function createLeaveRequest(employeeName, date, reason, status = 'Pending') {
  const [user] = await pool.query(
    'SELECT EmployeeID FROM users WHERE Name = ? LIMIT 1',
    [employeeName]
  );
  if (!user.length) {
    throw new Error('Employee not found');
  }
  await pool.query(
    `INSERT INTO leave_requests (EmployeeID, Date, Reason, Status)
     VALUES (?, ?, ?, ?)`,
    [user[0].EmployeeID, date, reason, status]
  );
}
export async function updateLeaveStatus(leaveRequestID, status) {
  await pool.query(
    `UPDATE leave_requests SET Status = ? WHERE leaveRequestID = ?`,
    [status, leaveRequestID]
  );
}
export async function getEmployeeNames() {
  const [results] = await pool.query(
    'SELECT Name FROM users ORDER BY Name'
  );
  return results.map(row => row.Name);
}