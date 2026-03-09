import * as TaskRepository from '../repositories/taskRepository.js';

export async function getAllTasks() {
    return await TaskRepository.readTasks();
}

export async function getTaskById(id) {
    return await TaskRepository.getTaskById(id);
}

export async function createTask(title) {
    return await TaskRepository.createTask(title);
}

export async function updateTask(id, update) {
    return await TaskRepository.updateTask(id, update);
}

export async function deleteTask(id) {
    return await TaskRepository.deleteTask(id);
}