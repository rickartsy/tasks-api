import express from 'express';

const app = express();
const port = 3000;

import taskRoutes from './routes/taskRoutes.js';
import { logger } from './middleware/logger.js';

app.use(logger);
app.use(express.json());
app.use('/tasks', taskRoutes);
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});