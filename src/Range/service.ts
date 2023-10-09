import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

class RangeService {
  private repository: Prisma.rangeDelegate<DefaultArgs>;
  constructor() {
    const prisma = new PrismaClient();
    this.repository = prisma.range;
  }

  index = async () => {
    const range = await this.repository.findMany();
    return range;
  };
  show = async (id: number) => {
    return await this.repository.findUnique({
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

export default RangeService;
