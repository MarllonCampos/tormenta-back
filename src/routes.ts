import { NextFunction, Request, Response, Router } from 'express';
import { WeaponRoutes } from './Weapon/weapon.route';
import { RangeRoutes } from './Range/range.route';
import { HoldTypeRoutes } from './HoldType/holdType.route';
import { DamageTypeRoutes } from './DamageType/damageType.route';
import { WeaponCategoryRoutes } from './WeaponCategory/weaponCategory.route';
import { CombatRoleRoutes } from './CombatRole/combatRole.route';
import { CreatureSizeRoutes } from './CreatureSize/creatureSize.route';

import DefaultErrors from './Errors/defaultErrors';

const routes = Router();

routes.use('/weapon', WeaponRoutes);
routes.use('/range', RangeRoutes);
routes.use('/hold-type', HoldTypeRoutes);
routes.use('/damage-type', DamageTypeRoutes);
routes.use('/weapon-category', WeaponCategoryRoutes);
routes.use('/combat-role', CombatRoleRoutes);
routes.use('/creature-size', CreatureSizeRoutes);

routes.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof DefaultErrors) {
    const sendObject: {
      message: string;
      data?: string[];
    } = {
      message: err.message,
    };
    if (err.errors.length > 0) sendObject.data = err.errors;
    const status = err.status ? err.status : 400;
    console.log(err);

    return res.status(status).send(sendObject);
  }

  console.log('Error Middleware', err, err.constructor.name);
  res.status(500).send({ message: 'Erro interno no servidor' });
});

export { routes };
