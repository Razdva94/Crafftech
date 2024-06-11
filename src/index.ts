import express from 'express';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import YAML from 'yaml';
import errorHandler from './middlewares/error';
import { errors } from 'celebrate';

import taskRouter from './routes/task.router';

const app = express();
const port = process.env.PORT || 3001;

const file = fs.readFileSync('./swagger.yaml', 'utf8');
const swaggerDocument = YAML.parse(file);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());

app.use('/tasks', taskRouter);
app.use(errors());
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server up and running on port: ${port}`);
});
