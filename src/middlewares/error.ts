/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Prisma } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';

interface customError extends ErrorConstructor {
  message: string;
  statusCode: number;
}
const errorHandler = (
  err: customError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!err.statusCode) {
    res.status(500).send({ message: 'Произошла ошибка на сервере' });
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    return res.status(400).json({ error: err.message });
  } else {
    res.status(err.statusCode).send({ message: err.message });
  }
};

export default errorHandler;
