import { Request, Response, Router } from 'express';
import WeaponController from './controller';

const WeaponRoutes = Router();

const controller = new WeaponController();

/**
 * @swagger
 * /weapon:
 *   get:
 *     summary: Todas as Armas
 *     description: Retorna um array de armas cadastradas
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               - name: Adaga
 *                 damage: 1d4
 *                 critical: 19
 *                 melee: true
 *                 spaces: 1
 *                 default: true
 *                 img: null
 */
WeaponRoutes.get('/', controller.index);

WeaponRoutes.get('/:id', controller.show);

WeaponRoutes.post('/', controller.store);

WeaponRoutes.patch('/', controller.update);

WeaponRoutes.delete('/:id', controller.delete);

export { WeaponRoutes };
