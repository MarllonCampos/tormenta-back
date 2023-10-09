import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

class HoldTypeService {
  private repository: Prisma.holdtypeDelegate<DefaultArgs>;
  constructor() {
    const prisma = new PrismaClient();
    this.repository = prisma.holdtype;
  }

  index = async () => {
    const holdtype = await this.repository.findMany();
    return holdtype;
  };
  show = async (id: number) => {
    return this.repository.findUnique({
      where: {
        id,
      },
    });
  };
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

export default HoldTypeService;
