import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { creatureSizeInputInterface } from './model';

interface Update {
  id: number;
  updateCreatureSize: creatureSizeInputInterface;
}

class CreatureSizeService {
  private repository: Prisma.creaturesizeDelegate<DefaultArgs>;
  constructor() {
    const prisma = new PrismaClient();
    this.repository = prisma.creaturesize;
  }

  index = async () => {
    const creatureSize = await this.repository.findMany({
      select: {
        name: true,
      },
    });
    return creatureSize;
  };

  show = async (id: number) => {
    return await this.repository.findUnique({
      where: {
        id,
      },
    });
  };

  create = async (newCreatureSize: creatureSizeInputInterface) => {
    return await this.repository.create({
      data: newCreatureSize,
    });
  };

  update = async ({ id, updateCreatureSize }: Update) => {
    return await this.repository.update({
      where: {
        id,
      },
      data: {
        ...updateCreatureSize,
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

export default CreatureSizeService;
