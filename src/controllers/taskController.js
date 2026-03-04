const tasks = [
    { id: 1, title: "Learn Express", completed: false },
    { id: 2, title: "Study REST API", completed: false }
];


export function getTasks(req, res) {
    res.json(tasks);
}

export function createTask(req, res, next) {
    const { title } = req.body;

    if (!title) {
        const error = new Error('Title is required');
        error.status = 400;
        return next(error);
    }

    const newTask = {
        id: tasks.length + 1,
        title,
        completed: false
    };

    tasks.push(newTask);

    res.status(201).json(newTask);
}

export function updateTask(req, res, next) {
    const id = parseInt(req.params.id);
    const { title, completed } = req.body;

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

    res.json(task);
}

export function deleteTask(req, res, next) {
    const id = parseInt(req.params.id);
    const index = tasks.findIndex(t => t.id === id);

    if (index === -1) {
        const error = new Error('Task not found');
        error.status = 404;
        return next(error);
    }

    tasks.splice(index, 1);

    res.status(204).send();
}