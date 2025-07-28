import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mysql2 from 'mysql2/promise';
import { HashingPass } from './hashing.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9090;

app.use(cors());
app.use(express.json());

// Create MySQL connection pool
const pool = mysql2.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

// GET all users
app.get('/users', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// POST new user

app.post('/users', async (req, res) => {
  const {
    Name,
    Position,
    Department,
    Salary,
    EmploymentHistory,
    Contact,
    Username,
    Password 
  } = req.body;

  try {
    if (!Username || !Password) {
      return res.status(400).json({ error: 'Username and Password are required' });
    }

    const HashingPassword = await HashingPass(Password);

    const [result] = await pool.query(
      `INSERT INTO users 
        (Name, Position, Department, Salary, EmploymentHistory, Contact, Username, Password) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        Name,
        Position,
        Department,
        Salary,
        EmploymentHistory,
        Contact,
        Username,
        HashingPassword 
      ]
    );

 
    const newUser = {
      EmployeeID: result.insertId,
      Name,
      Position,
      Department,
      Salary,
      EmploymentHistory,
      Contact,
      Username
    };

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ error: 'Failed to add user' });
  }
});

// PUT update user by id
app.put('/users/:id', async (req, res) => {
  const id = req.params.id;
  const { Name, Position, Department, Salary, EmploymentHistory, Contact } = req.body;
  try {
    const [result] = await pool.query(
      `UPDATE users SET 
         Name = ?, Position = ?, Department = ?, Salary = ?, EmploymentHistory = ?, Contact = ?
       WHERE EmployeeID = ?`,
      [Name, Position, Department, Salary, EmploymentHistory, Contact, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User updated' });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// DELETE user by id
app.delete('/users/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const [result] = await pool.query('DELETE FROM users WHERE EmployeeID = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
