import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

class DamageTypeController {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  index = async (req: Request, res: Response) => {
    const damageType = await this.prisma.damagetype.findMany();
    return res.json(damageType);
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

export default DamageTypeController;
