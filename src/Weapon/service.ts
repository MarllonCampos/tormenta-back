import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

class WeaponService {
  private repository: Prisma.weaponDelegate<DefaultArgs>;
  constructor() {
    const prisma = new PrismaClient();
    this.repository = prisma.weapon;
  }

  index = async () => {
    const weapons = await this.repository.findMany();
    return weapons;
  };
  async show(req: Request, res: Response) {
    return null;
  }
  async create(req: Request, res: Response) {
    return null;
  }
  async update(req: Request, res: Response) {
    return null;
  }
  async delete(req: Request, res: Response) {
    return null;
  }
}

export default WeaponService;
