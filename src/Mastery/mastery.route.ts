import { Router, Request, NextFunction } from 'express';
import MasteryController from './controller';

const MasteryRoutes = Router();

const controller = new MasteryController();

MasteryRoutes.get('/', controller.index);

MasteryRoutes.get('/:id',controller.show);

MasteryRoutes.post('/',controller.store);

MasteryRoutes.patch('/:id', controller.update);

MasteryRoutes.delete('/:id', controller.delete);

export { MasteryRoutes };
