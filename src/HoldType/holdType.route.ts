import { Request, Response, Router, NextFunction } from 'express';
import HoldTypeController from './controller';
import HoldTypeErrors from './errors';

const HoldTypeRoutes = Router();

const controller = new HoldTypeController();

HoldTypeRoutes.get('/', controller.index);

HoldTypeRoutes.get('/:id', controller.show);

HoldTypeRoutes.post('/', controller.store);

HoldTypeRoutes.patch('/:id', controller.update);

HoldTypeRoutes.delete('/:id', controller.delete);

HoldTypeRoutes.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof HoldTypeErrors) {
    const sendObject: {
      message: string;
      data?: string[];
    } = {
      message: err.message,
    };
    if (err.errors.length > 0) sendObject.data = err.errors;
    return res.status(400).send(sendObject);
  }

  console.log('Error Middleware', err, err.constructor.name);
  res.status(500).send({ message: 'Erro interno no servidor' });
});

export { HoldTypeRoutes };
