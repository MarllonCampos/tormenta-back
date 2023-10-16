import { Router, Request, NextFunction } from 'express';
import CombatRoleController from './controller';

const CombatRoleRoutes = Router();

const controller = new CombatRoleController();

CombatRoleRoutes.get('/', controller.index);

CombatRoleRoutes.get('/:id', controller.show);

CombatRoleRoutes.post('/', controller.store);

CombatRoleRoutes.patch('/:id', controller.update);

CombatRoleRoutes.delete('/:id', controller.delete);

export { CombatRoleRoutes };
