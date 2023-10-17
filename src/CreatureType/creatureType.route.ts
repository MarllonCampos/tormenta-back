import { Router, Request, NextFunction } from 'express';
import CreatureTypeController from './controller';

const CreatureTypeRoutes = Router();

const controller = new CreatureTypeController();

CreatureTypeRoutes.get('/', controller.index);

CreatureTypeRoutes.get('/:id',controller.show);

CreatureTypeRoutes.post('/',controller.store);

CreatureTypeRoutes.patch('/:id', controller.update);

CreatureTypeRoutes.delete('/:id', controller.delete);

export { CreatureTypeRoutes };
