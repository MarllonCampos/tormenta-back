import { Request, Response, Router } from 'express';
import WeaponController from './controller';

const WeaponRoutes = Router();

const controller = new WeaponController();

WeaponRoutes.get('/', controller.index);

WeaponRoutes.get('/:id', controller.show);

WeaponRoutes.post('/', controller.store);

WeaponRoutes.patch('/', controller.update);

WeaponRoutes.delete('/', controller.delete);

export { WeaponRoutes };
