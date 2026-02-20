const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const isAuth = require('../middleware/auth');

router.post('/', async (req, res) => {
    try {
        const { title, description, dueDate, priority, status, userId } = req.body;
        
        const newTask = new Task({
            title,
            description,
            dueDate,
            priority,
            status,
            userId: userId || req.session.userId // Fallback logic
        });

        await newTask.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


router.get('/', isAuth, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.session.userId }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});