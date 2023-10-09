import { Router } from 'express';
import RangeController from './controller';

const RangeRoutes = Router();

const controller = new RangeController();

RangeRoutes.get('/', controller.index);

RangeRoutes.get('/:id',controller.show);

RangeRoutes.post('/',controller.store);

RangeRoutes.patch('/', controller.update);

RangeRoutes.delete('/', controller.delete);

export { RangeRoutes };
