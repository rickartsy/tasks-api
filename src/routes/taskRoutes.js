import express from 'express';

const router = express.Router();

import * as TaskController from '../controllers/taskController.js';
import * as Validate from '../middleware/validateTask.js';

router.get('/', TaskController.getAllTasks);
router.get('/:id', Validate.taskId, TaskController.getTaskById);
router.post('/', Validate.createTaskTitle, TaskController.createTask);
router.put('/:id', Validate.taskId, Validate.updateTaskBody, TaskController.updateTask);
router.delete('/:id', Validate.taskId, TaskController.deleteTask);

export default router;