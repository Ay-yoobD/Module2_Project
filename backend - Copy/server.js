// import express from 'express';
// import cors from 'cors';
// import { verifyUserPassword } from './verifyPassword.js';
// import { pool } from './config/config.js';
// import leaveRequestsRouter from './routes/leaveRequests.js';

// const app = express();
// const PORT = 3000;

// app.use(cors());
// app.use(express.json());

// const activeSessions = {};

// app.post('/verify-password', async (req, res) => {
//   const { username, password } = req.body;
//   if (!username || !password) {
//     return res.status(400).json({ message: 'Username and password are required.' });
//   }

//   try {
//     const result = await verifyUserPassword(username, password);
//     if (result.success) {
      
//       const sessionId = Math.random().toString(36).substring(2);
//       activeSessions[sessionId] = username;
      
//       const [user] = await pool.query(
//         'SELECT * FROM users WHERE Username = ?', 
//         [username]
//       );
      
//       res.status(200).json({ 
//         message: result.message,
//         sessionId,
//         user: user[0] 
//       });
//     } else {
//       res.status(401).json({ message: result.message });
//     }
//   } catch (err) {
//     console.error('Error verifying password:', err);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// app.get('/current-user', async (req, res) => {
//   try {
//     const sessionId = req.headers.authorization;
    
//     if (!sessionId || !activeSessions[sessionId]) {
//       return res.status(401).json({ error: 'Unauthorized' });
//     }

//     const [user] = await pool.query(
//       'SELECT * FROM users WHERE Username = ?',
//       [activeSessions[sessionId]]
//     );

//     if (!user.length) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     const { Password, ...userData } = user[0];
//     res.json(userData);
    
//   } catch (err) {
//     console.error('Error fetching current user:', err);
//     res.status(500).json({ error: 'Error fetching current user' });
//   }
// });

// app.use('/leave-requests', leaveRequestsRouter);

// app.get('/reviews', async (req, res) => {
//   try {
//     const [results] = await pool.query('SELECT * FROM reviews');
//     res.json(results);
//   } catch (err) {
//     console.error('Error fetching reviews:', err);
//     res.status(500).send('Error fetching reviews');
//   }
// });

// app.get('/health', async (req, res) => {
//   try {
//     await pool.query('SELECT 1');
//     res.status(200).json({ status: 'healthy', database: 'connected' });
//   } catch (err) {
//     res.status(500).json({ status: 'unhealthy', database: 'disconnected', error: err.message });
//   }
// });

// app.get('/', (req, res) => {
//   res.send('Welcome to the MySQL API! Try /health or /leave-requests');
// });

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

// process.on('SIGTERM', () => {
//   pool.end();
//   process.exit(0);
// });

import express from 'express';
import cors from 'cors';
import { verifyUserPassword } from './verifyPassword.js';
import { pool } from './config/config.js';
import leaveRequestsRouter from './routes/leaveRequests.js';
import { HashingPass } from './hashing.js';
import { 
  deductSalaryCon, 
  LoadUserCon,
  rateCon, 
  PAYECon, 
  UIFCon, 
  HealthInsureCon, 
  TakeHomeCon, 
  LoadSalariesCon,
  LoadReviewsCon 
} from './controller/usersCon.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ---------------- Session Handling ----------------
const activeSessions = {};

// ---------------- Authentication ------------------
app.post('/verify-password', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  try {
    const result = await verifyUserPassword(username, password);
    if (result.success) {
      const sessionId = Math.random().toString(36).substring(2);
      activeSessions[sessionId] = username;

      const [user] = await pool.query(
        'SELECT * FROM users WHERE Username = ?', 
        [username]
      );

      res.status(200).json({ 
        message: result.message,
        sessionId,
        user: user[0] 
      });
    } else {
      res.status(401).json({ message: result.message });
    }
  } catch (err) {
    console.error('Error verifying password:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/current-user', async (req, res) => {
  try {
    const sessionId = req.headers.authorization;
    if (!sessionId || !activeSessions[sessionId]) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const [user] = await pool.query(
      'SELECT * FROM users WHERE Username = ?',
      [activeSessions[sessionId]]
    );

    if (!user.length) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { Password, ...userData } = user[0];
    res.json(userData);
  } catch (err) {
    console.error('Error fetching current user:', err);
    res.status(500).json({ error: 'Error fetching current user' });
  }
});

// ---------------- User CRUD -----------------------
app.get('/users', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

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

// ---------------- Extra Controllers ----------------
app.get('/users/load', LoadUserCon );
app.get('/salaries', LoadSalariesCon );
app.get('/reviews', LoadReviewsCon ); // keep both, no conflict
app.get('/users/deduct/:id', deductSalaryCon );     
app.get('/users/hrrate/:ID', rateCon );
app.get('/users/PAYE/:ID', PAYECon );     
app.get('/users/UIF/:ID', UIFCon );     
app.get('/users/HealthInsure/:ID', HealthInsureCon );     
app.get('/users/TakeHome/:ID', TakeHomeCon );     

// ---------------- Leave Requests -------------------
app.use('/leave-requests', leaveRequestsRouter);

// ---------------- Health & Root --------------------
app.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.status(200).json({ status: 'healthy', database: 'connected' });
  } catch (err) {
    res.status(500).json({ status: 'unhealthy', database: 'disconnected', error: err.message });
  }
});

app.get('/', (req, res) => {
  res.send('Welcome to the MySQL API! Try /health or /leave-requests');
});

// ---------------- Start Server ---------------------
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// ---------------- Shutdown ----------------
process.on('SIGTERM', () => {
  pool.end();
  process.exit(0);
});
