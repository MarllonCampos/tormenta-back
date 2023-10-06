import { Router } from 'express';
import { WeaponRoutes } from './Weapon/weapon.route';

const routes = Router();

routes.use('/weapon', WeaponRoutes);

export { routes };
