import { NextFunction, Request, Response, Router } from 'express';
import WeaponCategoryController from './controller';

const WeaponCategoryRoutes = Router();

const controller = new WeaponCategoryController();

WeaponCategoryRoutes.get('/', controller.index);

WeaponCategoryRoutes.get('/:id', controller.show);

WeaponCategoryRoutes.post('/', controller.store);

WeaponCategoryRoutes.patch('/:id', controller.update);

WeaponCategoryRoutes.delete('/:id', controller.delete);

export { WeaponCategoryRoutes };
