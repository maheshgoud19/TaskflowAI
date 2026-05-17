import express from 'express';
import { createTask, updateTask, deleteTask, getTasks, getTask } from '../controllers/tasks.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/', verifyToken, createTask);
router.put('/:id', verifyToken, updateTask);
router.delete('/:id', verifyToken, deleteTask);
router.get('/', verifyToken, getTasks);
router.get('/:id', verifyToken, getTask);

export default router;
