import fs from 'fs/promises';

// get the current file and directory absolute path
const filePath = new URL('../data/tasks.json', import.meta.url);

export async function readTasks() {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
}

export async function writeTasks(task) {
    await fs.writeFile(filePath, JSON.stringify(task, null, 2));
}