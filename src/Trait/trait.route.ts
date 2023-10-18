import { Router, Request, NextFunction } from 'express';
import TraitController from './controller';

const TraitRoutes = Router();

const controller = new TraitController();

TraitRoutes.get('/', controller.index);

TraitRoutes.get('/:id',controller.show);

TraitRoutes.post('/',controller.store);

TraitRoutes.patch('/:id', controller.update);

TraitRoutes.delete('/:id', controller.delete);

export { TraitRoutes };
