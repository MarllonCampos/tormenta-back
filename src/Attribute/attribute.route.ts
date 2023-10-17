import { Router, Request, NextFunction } from 'express';
import AttributeController from './controller';

const AttributeRoutes = Router();

const controller = new AttributeController();

AttributeRoutes.get('/', controller.index);

AttributeRoutes.get('/:id',controller.show);

AttributeRoutes.post('/',controller.store);

AttributeRoutes.patch('/:id', controller.update);

AttributeRoutes.delete('/:id', controller.delete);

export { AttributeRoutes };
