import express from 'express';

const app = express();
const port = 3000;

import taskRoutes from './routes/taskRoutes.js';
import { logger } from './middleware/logger.js';
import { errorHandler } from './middleware/errorHandler.js';

app.use(logger);
app.use(express.json());
app.use('/tasks', taskRoutes);
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});