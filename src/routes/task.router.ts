import { Router } from 'express';
import { Segments, Joi, celebrate } from 'celebrate';

import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from '../controllers/task.controller';

const taskRouter = Router();

taskRouter.get('/', getAllTasks);

taskRouter.get('/:id', getTaskById);

taskRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string(),
    }),
  }),
  createTask
);

taskRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required(),
      describtion: Joi.string(),
      status: Joi.string().valid(' ONGOING', 'COMPLETED'),
    }),
  }),
  updateTask
);

taskRouter.delete('/:id', deleteTask);

export default taskRouter;
