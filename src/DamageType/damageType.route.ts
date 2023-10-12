import { Request, Response, Router, NextFunction } from 'express';
import DamageTypeController from './controller';
import DamageTypeErrors from './errors';

const DamageTypeRoutes = Router();

const controller = new DamageTypeController();

DamageTypeRoutes.get('/', controller.index);

DamageTypeRoutes.get('/:id', controller.show);

DamageTypeRoutes.post('/', controller.store);

DamageTypeRoutes.patch('/:id', controller.update);

DamageTypeRoutes.delete('/:id', controller.delete);

DamageTypeRoutes.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof DamageTypeErrors) {
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

export { DamageTypeRoutes };
