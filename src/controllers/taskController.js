import * as Service from '../services/taskService.js';

export async function getTasks(req, res, next) {
    try {
        const tasks = await Service.readTasks();
        res.json(tasks);
    } catch (error) {
        next(error);
    }
}

export async function createTask(req, res, next) {
    try {
        const { title } = req.body;

        const newTask = await Service.createTask(title);

        res.status(201).json(newTask);

    } catch (error) {
        next(error);
    }
}

export async function updateTask(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        const update = req.body;

        const updatedTask = await Service.updateTask(id, update);

        res.json(updatedTask);

    } catch (error) {
        next(error);
    }
}

export async function deleteTask(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        
        await Service.deleteTask(id);

        res.status(204).send();

    } catch (error) {
        next(error);
    }
}