import pool from '../db/pool.js';

export async function getAllTasks(filters = {}) {
    let query = 'SELECT * FROM tasks';
    const values = [];

    if (filters.completed !== undefined) {
        values.push(filters.completed === 'true');
        query += ` WHERE completed = $${values.length}`;
    }

    const result = await pool.query(query, values);

    return result.rows;
}

export async function getTaskById(id) {
    const result = await pool.query(
        'SELECT * FROM tasks WHERE id = $1',
        [id]
    );

    if (result.rowCount === 0) {
        const error = new Error('Task not found');
        error.status = 404;
        throw error;
    }

    return result.rows[0];
}

export async function createTask(title) {
    const result = await pool.query(
        `INSERT INTO tasks (title)
        VALUES ($1)
        RETURNING *`,
        [title]
    );

    return result.rows[0];
}

export async function updateTask(id, updates) {
    const existing = await getTaskById(id)

    const updated = {
        ...existing,
        ...updates
    };

    const result = await pool.query(
        `UPDATE tasks
        SET title = $1,
            completed = $2
        WHERE id = $3
        RETURNING *`,
        [updated.title, updated.completed, id]
    );
    
    return result.rows[0];
}

export async function deleteTask(id) {
    const result = await pool.query(
        `DELETE FROM tasks
        WHERE id = $1`,
        [id]
    );
    
    return result.rowCount > 0;
}