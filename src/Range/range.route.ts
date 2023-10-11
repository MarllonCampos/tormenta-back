import { Router, Request, Response, NextFunction } from 'express';
import RangeController from './controller';
import RangeErrors from './errors';

const RangeRoutes = Router();

const controller = new RangeController();

RangeRoutes.get('/', controller.index);

RangeRoutes.get('/:id', controller.show);

RangeRoutes.post('/', controller.store);

RangeRoutes.patch('/', controller.update);

RangeRoutes.delete('/:id', controller.delete);

RangeRoutes.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof RangeErrors) {
    const sendObject: {
      message: string;
      details?: string[];
    } = {
      message: err.message,
    };
    if (err.errors.length > 0) sendObject.details = err.errors;
    return res.status(400).send(sendObject);
  }

  console.log('Error Middleware', err, err.constructor.name);
  res.status(500).send({ message: 'Erro interno no servidor' });
});

export { RangeRoutes };
