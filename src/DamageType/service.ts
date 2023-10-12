import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { damageTypeInputInterface } from './model';

interface Update {
  id: number;
  updateDamageType: damageTypeInputInterface;
}

class DamageTypeService {
  private repository: Prisma.damagetypeDelegate<DefaultArgs>;
  constructor() {
    const prisma = new PrismaClient();
    this.repository = prisma.damagetype;
  }

  index = async () => {
    const damageType = await this.repository.findMany({
      select: {
        type: true,
      },
    });
    return damageType;
  };

  show = async (id: number) => {
    return await this.repository.findUnique({
      where: {
        id,
      },
    });
  };

  async create(damageType: damageTypeInputInterface) {
    return await this.repository.create({
      data: damageType,
    });
  }

  async update({ id, updateDamageType }: Update) {
    return await this.repository.update({
      where: {
        id,
      },
      data: {
        ...updateDamageType,
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

export default DamageTypeService;
