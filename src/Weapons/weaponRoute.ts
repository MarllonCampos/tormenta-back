import { Request, Response, Router } from 'express';

const WeaponRoutes = Router();

WeaponRoutes.get('/', (_, res: Response) => {
  res.send('All Weapons');
});

WeaponRoutes.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.send(`Find Specific Weapon: ${id}`);
});

WeaponRoutes.post('/', (_, res: Response) => {
  res.send('Create Weapon');
});

WeaponRoutes.patch('/', (_, res: Response) => {
  res.send('Update Weapons');
});

WeaponRoutes.delete('/', (_, res: Response) => {
  res.send('Delete Weapons');
});

export { WeaponRoutes };
