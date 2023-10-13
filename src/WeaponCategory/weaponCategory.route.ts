import { NextFunction, Request, Response, Router } from 'express';
import WeaponCategoryController from './controller';
import WeaponCategoryErrors from './errors';

const WeaponCategoryRoutes = Router();

const controller = new WeaponCategoryController();

WeaponCategoryRoutes.get('/', controller.index);

WeaponCategoryRoutes.get('/:id', controller.show);

WeaponCategoryRoutes.post('/', controller.store);

WeaponCategoryRoutes.patch('/:id', controller.update);

WeaponCategoryRoutes.delete('/:id', controller.delete);

WeaponCategoryRoutes.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof WeaponCategoryErrors) {
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

export { WeaponCategoryRoutes };
