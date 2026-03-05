import * as FS from '../utils/fileStorage.js';

export async function getTasks(req, res, next) {
    try {
        const tasks = await FS.readTasks();
        res.json(tasks);
    } catch (error) {
        next(error);
    }
}

export async function createTask(req, res, next) {
    try {
        const { title } = req.body;
        const tasks = await FS.readTasks();
        const newTask = {
            id: tasks.length + 1,
            title,
            completed: false
        };

        tasks.push(newTask);
        await FS.writeTasks(tasks);

        res.status(201).json(newTask);

    } catch (error) {
        next(error);
    }
}

export async function updateTask(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        const { title, completed } = req.body;

        const tasks = await FS.readTasks();
        const task = tasks.find(t => t.id === id);

        if (!task) {
            const error = new Error('Task not found');
            error.status = 404;
            return next(error);
        }
        if (title !== undefined) {
            task.title = title;
        }
        if (completed !== undefined) {
            task.completed = completed;
        }

        await FS.writeTasks(tasks);

        res.json(task);

    } catch (error) {
        next(error);
    }
}

export async function deleteTask(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        
        const tasks = await FS.readTasks();
        const index = tasks.findIndex(t => t.id === id);

        if (index === -1) {
            const error = new Error('Task not found');
            error.status = 404;
            return next(error);
        }

        tasks.splice(index, 1);
        await FS.writeTasks(tasks);

        res.status(204).send();
        
    } catch (error) {
        next(error);
    }
}