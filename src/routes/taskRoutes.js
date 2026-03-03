import express from 'express';

const router = express.Router();

import * as TaskController from '../controllers/taskController.js';

router.get('/', TaskController.getTasks);
router.post('/', TaskController.createTask);
router.put('/:id', TaskController.updateTask);
router.delete('/:id', TaskController.deleteTask);

export default router;