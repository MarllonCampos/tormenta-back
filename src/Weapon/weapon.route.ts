import { NextFunction, Request, Response, Router } from 'express';
import WeaponController from './controller';
import WeaponErrors from './errors';
const WeaponRoutes = Router();

const controller = new WeaponController();

WeaponRoutes.get('/', controller.index);

WeaponRoutes.get('/:id', controller.show);

WeaponRoutes.post('/', controller.store);

WeaponRoutes.patch('/:id', controller.update);

WeaponRoutes.delete('/:id', controller.delete);

export { WeaponRoutes };
