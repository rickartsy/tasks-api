import express from 'express';

const app = express();
const port = 3000;

import taskRoutes from './routes/taskRoutes.js';

app.use(express.json());
app.use('/tasks', taskRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});