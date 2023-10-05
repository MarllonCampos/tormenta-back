import { Router } from 'express';
import { WeaponRoutes } from './Weapons/weaponroute';

const routes = Router();

routes.use('/weapon', WeaponRoutes);

export { routes };
