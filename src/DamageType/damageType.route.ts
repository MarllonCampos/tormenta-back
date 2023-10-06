import { Router } from 'express';
import DamageTypeController from './controller';

const DamageTypeRoutes = Router();

const controller = new DamageTypeController();

DamageTypeRoutes.get('/', controller.index);

DamageTypeRoutes.get('/:id',controller.show);

DamageTypeRoutes.post('/',controller.store);

DamageTypeRoutes.patch('/', controller.update);

DamageTypeRoutes.delete('/', controller.delete);

export { DamageTypeRoutes };
