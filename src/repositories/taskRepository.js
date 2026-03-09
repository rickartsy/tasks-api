import fs from 'fs/promises';

const filePath = new URL('../data/tasks.json', import.meta.url);

export async function readTasks() {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
}

export async function writeTasks(task) {
    await fs.writeFile(filePath, JSON.stringify(task, null, 2));
}

export async function createTask(title) {
    const tasks = await readTasks();
    const newTask = {
        id: tasks.length + 1,
        title,
        completed: false
    };

    tasks.push(newTask);
    await writeTasks(tasks);

    return newTask;
}

export async function updateTask(id, update) {
    const tasks = await readTasks();
    const task = tasks.find(t => t.id === id);

    if (!task) {
        const error = new Error('Task not found');
        error.status = 404;
        throw error;
    }
    if (update.title !== undefined) {
        task.title = update.title;
    }
    if (update.completed !== undefined) {
        task.completed = update.completed;
    }

    await writeTasks(tasks);
    
    return task;
}

export async function deleteTask(id) {
    const tasks = await readTasks();

    const index = tasks.findIndex(t => t.id === id);

    if (index === -1) {
        const error = new Error('Task not found');
        error.status = 404;
        throw error;
    }

    tasks.splice(index, 1);

    await writeTasks(tasks);
}