import express from 'express';
import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTaskById,
  deleteTaskById,
} from '../controllers/task.controller';

const router = express.Router();

// create task
router.post('/create', createTask);

// get all tasks
router.get('/', getAllTasks);

// get task by id
router.get('/:taskId', getTaskById);

// update task by id
router.put('/:taskId', updateTaskById);

// delete task by id
router.delete('/:taskId', deleteTaskById);

export default router;
