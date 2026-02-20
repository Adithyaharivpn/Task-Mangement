require('dotenv').config();
require('node:dns').setServers(['1.1.1.1', '8.8.8.8']);
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const session = require('express-session');
const { MongoStore } = require('connect-mongo');
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
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    collectionName: 'sessions'
  }),
  cookie: { 
    secure: process.env.NODE_ENV === 'production', 
    httpOnly: true, 
    maxAge: 1000 * 60 * 60 
  }
}));

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);




app.listen(PORT, () => console.log(`Server on ${PORT}`));
