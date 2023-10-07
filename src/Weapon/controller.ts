import { Request, Response } from 'express';
import WeaponService from './service';

class WeaponController {
  private service: WeaponService;
  constructor() {
    this.service = new WeaponService();
  }

  index = async (_: Request, res: Response) => {
    const weapons = await this.service.index();
    return res.json(weapons);
  };
  show = async (req: Request, res: Response) => {
    const { id } = req.params;
    console.log(id);

    if (!id) return res.status(400).send('You burro men?!');
    const formattedId = Number(id);
    const specificWeapon = await this.service.show(formattedId);
    res.status(200).send(specificWeapon);
  };
  async store(req: Request, res: Response) {}
  async update(req: Request, res: Response) {
    return null;
  }
  async delete(req: Request, res: Response) {
    return null;
  }
}

export default WeaponController;
