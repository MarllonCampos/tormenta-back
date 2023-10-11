import { Router } from 'express';
import { WeaponRoutes } from './Weapon/weapon.route';
import { RangeRoutes } from './Range/range.route';

const routes = Router();

routes.use('/weapon', WeaponRoutes);
routes.use('/range', RangeRoutes);

export { routes };
