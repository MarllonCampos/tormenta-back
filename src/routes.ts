import { Router } from 'express';
import { WeaponRoutes } from './Weapon/weapon.route';
import { RangeRoutes } from './Range/range.route';
import { HoldTypeRoutes } from './HoldType/holdType.route';
import { DamageTypeRoutes } from './DamageType/damageType.route';
import { WeaponCategoryRoutes } from './WeaponCategory/weaponCategory.route';

const routes = Router();

routes.use('/weapon', WeaponRoutes);
routes.use('/range', RangeRoutes);
routes.use('/hold-type', HoldTypeRoutes);
routes.use('/damage-type', DamageTypeRoutes);
routes.use('/weapon-category', WeaponCategoryRoutes);

export { routes };
