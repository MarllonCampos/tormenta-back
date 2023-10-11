import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { rangeInputInterface } from './model';

interface Update {
  id: number;
  updateRange: rangeInputInterface;
}
class RangeService {
  private repository: Prisma.rangeDelegate<DefaultArgs>;
  constructor() {
    const prisma = new PrismaClient();
    this.repository = prisma.range;
  }

  index = async () => {
    const range = await this.repository.findMany({
      select: {
        type: true,
      },
    });
    return range;
  };

  show = async (id: number) => {
    return await this.repository.findUnique({
      where: {
        id,
      },
    });
  };

  async create(newRange: rangeInputInterface) {
    return await this.repository.create({
      data: newRange,
    });
  }

  async update({ id, updateRange }: Update) {
    return await this.repository.update({
      where: {
        id,
      },
      data: {
        ...updateRange,
      },
    });
  }
  async delete(id: number) {
    return await this.repository.delete({
      where: {
        id,
      },
    });
  }
}

export default RangeService;
