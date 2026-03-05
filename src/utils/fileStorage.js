import { promises as fs } from 'fs';
import path from 'path';

const filePath = path.join(__dirname, '../data/tasks.json');

export async function readTasks() {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
}

export async function writeTasks(task) {
    await fs.writeFile(filePath, JSON.stringify(task, null, 2));
}