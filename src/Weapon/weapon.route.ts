import { Request, Response, Router } from 'express';
import WeaponController from './controller';

const WeaponRoutes = Router();

const controller = new WeaponController();

/**
 * @swagger
 * /weapons:
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
 *                 range:
 *                   type: Curto
 *                 damagetype:
 *                   type: Perfuração
 *                 spaces: 1
 *                 weaponcategory:
 *                   type: Arma Simples
 *                 holdtype:
 *                   type: Leve
 *                 default: true
 */
WeaponRoutes.get('/', controller.index);

WeaponRoutes.get('/:id', controller.show);

WeaponRoutes.post('/', controller.store);

WeaponRoutes.patch('/', controller.update);

WeaponRoutes.delete('/', controller.delete);

export { WeaponRoutes };
