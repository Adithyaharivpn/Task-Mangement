const express = require('express');
const router = express.Router();
const Task = require('../models/Task');


router.post('/', async (req, res) => {
    try {
        const { userId } = req.body;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid or missing User ID" });
        }

        const newTask = new Task(req.body);
        await newTask.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.get('/', async (req, res) => {
  try {
    const { userId } = req.query;
    const tasks = await Task.find({ userId }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const { userId, ...updateData } = req.body;
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId }, 
      updateData,
      { new: true }
    );
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { userId } = req.body;
    await Task.findOneAndDelete({ _id: req.params.id, userId });
    res.json({ message: "Task Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;