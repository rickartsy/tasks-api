import express from 'express';

const app = express();
const port = 3000

app.get('/tasks', (req, res) => {
    res.json([]);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});