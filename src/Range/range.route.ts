import { Router, Request, Response, NextFunction } from 'express';
import RangeController from './controller';

const RangeRoutes = Router();

const controller = new RangeController();

RangeRoutes.get('/', controller.index);

RangeRoutes.get('/:id', controller.show);

RangeRoutes.post('/', controller.store);

RangeRoutes.patch('/:id', controller.update);

RangeRoutes.delete('/:id', controller.delete);

export { RangeRoutes };
