import { Request, Response, Router, NextFunction } from 'express';
import HoldTypeController from './controller';
import HoldTypeErrors from './errors';

const HoldTypeRoutes = Router();

const controller = new HoldTypeController();

HoldTypeRoutes.get('/', controller.index);

HoldTypeRoutes.get('/:id', controller.show);

HoldTypeRoutes.post('/', controller.store);

HoldTypeRoutes.patch('/:id', controller.update);

HoldTypeRoutes.delete('/:id', controller.delete);

export { HoldTypeRoutes };
