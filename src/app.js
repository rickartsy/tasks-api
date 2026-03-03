import express from 'express';

const app = express();
const port = 3000;

const tasks = [
    { id: 1, title: "Learn Express", completed: false },
    { id: 2, title: "Study REST API", completed: false }
];

// GET /tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});