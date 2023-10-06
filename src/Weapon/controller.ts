import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import WeaponService from './service';

class WeaponController {
  private service: WeaponService;
  constructor() {
    this.service = new WeaponService();
  }

  index = async (req: Request, res: Response) => {
    const weapons = await this.service.index();
    return res.json(weapons);
  };
  async show(req: Request, res: Response) {
    return null;
  }
  async store(req: Request, res: Response) {
    return null;
  }
  async update(req: Request, res: Response) {
    return null;
  }
  async delete(req: Request, res: Response) {
    return null;
  }
}

export default WeaponController;
