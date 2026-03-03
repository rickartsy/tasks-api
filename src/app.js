import express from 'express';

const app = express();
const port = 3000;

app.use(express.json());

const tasks = [
    { id: 1, title: "Learn Express", completed: false },
    { id: 2, title: "Study REST API", completed: false }
];

// GET /tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// POST /tasks
app.post('/tasks', (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ message: 'Title is required'});
    }

    const newTask = {
        id: tasks.length + 1,
        title,
        completed: false
    };

    tasks.push(newTask);

    res.status(201).json(newTask);
});

app.put('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title, completed } = req.body;

    const task = tasks.find(t => t.id === id);

    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }

    if (title !== undefined) {
        task.title = title;
    }

    if (completed !== undefined) {
        task.completed = completed;
    }

    res.json(task);
});

app.delete('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = tasks.findIndex(t => t.id === id);

    if (index === -1) {
        return res.status(404).json({ message: 'Task not found' });
    }

    tasks.splice(index, 1);

    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});