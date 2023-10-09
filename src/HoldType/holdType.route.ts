import { Router } from 'express';
import HoldTypeController from './controller';

const HoldTypeRoutes = Router();

const controller = new HoldTypeController();

HoldTypeRoutes.get('/', controller.index);

HoldTypeRoutes.get('/:id',controller.show);

HoldTypeRoutes.post('/',controller.store);

HoldTypeRoutes.patch('/', controller.update);

HoldTypeRoutes.delete('/', controller.delete);

export { HoldTypeRoutes };
