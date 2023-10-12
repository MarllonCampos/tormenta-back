import { Router } from 'express';
import { WeaponRoutes } from './Weapon/weapon.route';
import { RangeRoutes } from './Range/range.route';
import { HoldTypeRoutes } from './HoldType/holdType.route';
import { DamageTypeRoutes } from './DamageType/damageType.route';

const routes = Router();

routes.use('/weapon', WeaponRoutes);
routes.use('/range', RangeRoutes);
routes.use('/holdtype', HoldTypeRoutes);
routes.use('/damagetype', DamageTypeRoutes);

export { routes };
