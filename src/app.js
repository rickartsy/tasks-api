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

    return res.status(201).json(newTask);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});