require('dotenv').config();
require('node:dns').setServers(['1.1.1.1', '8.8.8.8']);
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const session = require('express-session');
require('./db')

const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173','https://task-mangement-lac-eta.vercel.app'],
  credentials: true 
}));  



app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false, // Must be false for localhost
    httpOnly: true, 
    maxAge: 1000 * 60 * 60 
  }
}));

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);




app.listen(PORT, () => console.log(`Server on ${PORT}`));



