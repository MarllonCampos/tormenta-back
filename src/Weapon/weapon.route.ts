import { NextFunction, Request, Response, Router } from 'express';
import WeaponController from './controller';
import WeaponErrors from './errors';
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

WeaponRoutes.patch('/:id', controller.update);

WeaponRoutes.delete('/:id', controller.delete);

WeaponRoutes.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof WeaponErrors) {
    const sendObject: {
      message: string;
      details?: string[];
    } = {
      message: err.message,
    };
    if (err.errors.length > 0) sendObject.details = err.errors;
    return res.status(400).send(sendObject);
  }

  console.log('Error Middleware', err, err.constructor.name);
  res.status(500).send({ message: 'Erro interno no servidor' });
});

export { WeaponRoutes };
