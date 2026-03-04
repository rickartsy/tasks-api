export function createTaskTitle(req, res, next) {
    const { title } = req.body;

    if (!title || typeof title !== 'string') {
        const error = new Error('Title is required and must be a string');
        error.status = 400;
        return next(error);
    }

    next();
}

export function taskId(req, res, next) {
    const id = parseInt(req.params.id);

    if (isNaN(id) || id <= 0) {
        const error = new Error('Invalid task ID');
        error.status = 400;
        next(error);
    }

    next();
}

export function updateTaskBody(req, res, next) {
    const { title, completed } = req.body;

    if (title === undefined && completed === undefined) {
        const error = new Error('At least one field must be provided');
        error.status = 400;
        return next(error);
    }

    if (title !== undefined && typeof title !== 'string') {
        const error = new Error('Title must be a string');
        error.status = 400;
        return next(error);
    }

    if (completed !== undefined && typeof completed !== 'boolean') {
        const error = new Error('Completed must be a boolean');
        error.status = 400;
        return next(error);
    }

    next();
}