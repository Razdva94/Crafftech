import { PrismaClient, Prisma } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import WrongIdError from '../middlewares/WrongIdError';
import WrongDataError from '../middlewares/WrongDataError';

const prisma = new PrismaClient();

export const getAllTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allTasks = await prisma.task.findMany({});
    res.status(200).json({ data: allTasks });
  } catch (e) {
    next(e);
  }
};

export const getTaskById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const taskId = parseInt(req.params.id);
    const task = await prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });

    if (!task) {
      next(new WrongIdError('Задача с таким id не существует'));
    }

    res.status(200).json({ data: task });
  } catch (e) {
    next(e);
  }
};

export const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, description } = req.body;
    console.log(typeof title);

    if (!title || title.length < 3) {
      next(new WrongDataError('Имя задачи должно содержать более 3 символов'));
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        status: 'ONGOING',
      },
    });

    res.status(201).json({ data: task });
  } catch (e) {
    next(e);
  }
};

export const updateTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const taskId = parseInt(req.params.id);
    const { title, description, status } = req.body;

    const task = await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        title,
        description,
        status,
        updatedAt: new Date(),
      },
    });

    res.status(200).json({ data: task });
  } catch (e) {
    next(e);
  }
};

export const deleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const taskId = parseInt(req.params.id);
    const task = await prisma.task.delete({
      where: {
        id: taskId,
      },
    });
    if (!task) {
      next(new WrongIdError('Задача с таким id не существует'));
    }
    res.status(200).json({ data: task });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Ошибка при удалении задачи' });
  }
};
