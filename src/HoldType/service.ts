import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { holdTypeInputInterface } from './model';

interface Update {
  id: number;
  updateHoldType: holdTypeInputInterface;
}
class HoldTypeService {
  private repository: Prisma.holdtypeDelegate<DefaultArgs>;
  constructor() {
    const prisma = new PrismaClient();
    this.repository = prisma.holdtype;
  }

  index = async () => {
    const holdType = await this.repository.findMany({
      select: {
        type: true,
      },
    });
    return holdType;
  };

  show = async (id: number) => {
    return await this.repository.findUnique({
      where: {
        id,
      },
    });
  };

  async create(newHoldType: holdTypeInputInterface) {
    return await this.repository.create({
      data: newHoldType,
    });
  }

  async update({ id, updateHoldType }: Update) {
    return await this.repository.update({
      where: {
        id,
      },
      data: {
        ...updateHoldType,
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

export default HoldTypeService;
