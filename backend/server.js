import express from 'express';
import { verifyUserPassword } from './verifyPassword.js';

const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/verify-password', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  const result = await verifyUserPassword(username, password);

  if (result.success) {
    res.status(200).json({ message: result.message });
  } else {
    res.status(401).json({ message: result.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
