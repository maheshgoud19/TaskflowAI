import Task from '../models/Task.js';

export const createTask = async (req, res, next) => {
  const newTask = new Task({ ...req.body, createdBy: req.user.id });
  try {
    const savedTask = await newTask.save();
    req.app.get('io').emit('task_created', savedTask);
    res.status(200).json({ success: true, task: savedTask });
  } catch (err) {
    next(err);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ success: false, message: 'Task not found!' });
    if (task.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'You can update only your task!' });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    req.app.get('io').emit('task_updated', updatedTask);
    res.status(200).json({ success: true, task: updatedTask });
  } catch (err) {
    next(err);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ success: false, message: 'Task not found!' });
    if (task.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'You can delete only your task!' });
    }

    await Task.findByIdAndDelete(req.params.id);
    req.app.get('io').emit('task_deleted', req.params.id);
    res.status(200).json({ success: true, message: 'Task has been deleted.' });
  } catch (err) {
    next(err);
  }
};

export const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ createdBy: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, tasks });
  } catch (err) {
    next(err);
  }
};

export const getTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ success: false, message: 'Task not found!' });
    if (task.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'You can view only your task!' });
    }
    res.status(200).json({ success: true, task });
  } catch (err) {
    next(err);
  }
};
