import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { traitInputInterface } from './model';

interface Update {
  id: number;
  updateTrait: traitInputInterface;
}

class TraitService {
  private repository: Prisma.traitDelegate<DefaultArgs>;
  constructor() {
    const prisma = new PrismaClient();
    this.repository = prisma.trait;
  }

  index = async () => {
    const trait = await this.repository.findMany({
      select: {
        name: true,
      },
    });
    return trait;
  };

  show = async (id: number) => {
    return await this.repository.findUnique({
      where: {
        id,
      },
    });
  };

  create = async (newTrait: traitInputInterface) => {
    return await this.repository.create({
      data: newTrait,
    });
  };

  update = async ({ id, updateTrait }: Update) => {
    return await this.repository.update({
      where: {
        id,
      },
      data: {
        ...updateTrait,
      },
    });
  };
  delete = async (id: number) => {
    return await this.repository.delete({
      where: {
        id,
      },
    });
  };
}

export default TraitService;
