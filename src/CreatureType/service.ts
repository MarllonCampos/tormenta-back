import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { creatureTypeInputInterface } from './model';

interface Update {
  id: number;
  updateCreatureType: creatureTypeInputInterface;
}

class CreatureTypeService {
  private repository: Prisma.creaturetypeDelegate<DefaultArgs>;
  constructor() {
    const prisma = new PrismaClient();
    this.repository = prisma.creaturetype;
  }

  index = async () => {
    const creatureType = await this.repository.findMany({
      select: {
        name: true,
      },
    });
    return creatureType;
  };

  show = async (id: number) => {
    return await this.repository.findUnique({
      where: {
        id,
      },
    });
  };

  create = async (newCreatureType: creatureTypeInputInterface) => {
    return await this.repository.create({
      data: newCreatureType,
    });
  };

  update = async ({ id, updateCreatureType }: Update) => {
    return await this.repository.update({
      where: {
        id,
      },
      data: {
        ...updateCreatureType,
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

export default CreatureTypeService;
