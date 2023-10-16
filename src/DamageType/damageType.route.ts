import { Request, Response, Router, NextFunction } from 'express';
import DamageTypeController from './controller';

const DamageTypeRoutes = Router();

const controller = new DamageTypeController();

DamageTypeRoutes.get('/', controller.index);

DamageTypeRoutes.get('/:id', controller.show);

DamageTypeRoutes.post('/', controller.store);

DamageTypeRoutes.patch('/:id', controller.update);

DamageTypeRoutes.delete('/:id', controller.delete);

export { DamageTypeRoutes };
