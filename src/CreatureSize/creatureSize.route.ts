import { Router, Request, NextFunction } from 'express';
import CreatureSizeController from './controller';

const CreatureSizeRoutes = Router();

const controller = new CreatureSizeController();

CreatureSizeRoutes.get('/', controller.index);

CreatureSizeRoutes.get('/:id',controller.show);

CreatureSizeRoutes.post('/',controller.store);

CreatureSizeRoutes.patch('/:id', controller.update);

CreatureSizeRoutes.delete('/:id', controller.delete);

export { CreatureSizeRoutes };
