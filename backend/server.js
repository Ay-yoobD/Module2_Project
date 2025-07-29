import express from 'express';
import cors from 'cors';
import { verifyUserPassword } from './verifyPassword.js';
import { pool } from './config/config.js';
import leaveRequestsRouter from './routes/leaveRequests.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Store logged-in users (temporary solution)
const activeSessions = {};

// Login endpoint - Updated version
app.post('/verify-password', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  try {
    const result = await verifyUserPassword(username, password);
    if (result.success) {
      // Create a simple session
      const sessionId = Math.random().toString(36).substring(2);
      activeSessions[sessionId] = username;
      
      // Get full user details
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

// Protected current-user endpoint
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

    // Don't return password hash
    const { Password, ...userData } = user[0];
    res.json(userData);
    
  } catch (err) {
    console.error('Error fetching current user:', err);
    res.status(500).json({ error: 'Error fetching current user' });
  }
});

app.use('/leave-requests', leaveRequestsRouter);

app.get('/reviews', async (req, res) => {
  try {
    const [results] = await pool.query('SELECT * FROM reviews');
    res.json(results);
  } catch (err) {
    console.error('Error fetching reviews:', err);
    res.status(500).send('Error fetching reviews');
  }
});

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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

process.on('SIGTERM', () => {
  pool.end();
  process.exit(0);
});