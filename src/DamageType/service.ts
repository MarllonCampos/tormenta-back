import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
class DamageTypeService {
  private repository: Prisma.damagetypeDelegate<DefaultArgs>;
  constructor() {
    const prisma = new PrismaClient();
    this.repository = prisma.damagetype;
  }

  index = async () => {
    const damagetype = await this.repository.findMany();
    return damagetype;
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

export default DamageTypeService;
