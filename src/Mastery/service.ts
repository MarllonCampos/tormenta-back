import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { masteryInputInterface } from './model';

interface Update {
  id: number;
  updateMastery: masteryInputInterface;
}

class MasteryService {
  private repository: Prisma.masteryDelegate<DefaultArgs>;
  constructor() {
    const prisma = new PrismaClient();
    this.repository = prisma.mastery;
  }

  index = async () => {
    const mastery = await this.repository.findMany({
      select: {
        type: true,
        armor_penalty: true,
        trained: true,
      },
    });
    return mastery;
  };

  show = async (id: number) => {
    return await this.repository.findUnique({
      where: {
        id,
      },
      select: {
        type: true,
        armor_penalty: true,
        trained: true,
      },
    });
  };

  create = async (newMastery: masteryInputInterface) => {
    return await this.repository.create({
      data: newMastery,
    });
  };

  update = async ({ id, updateMastery }: Update) => {
    return await this.repository.update({
      where: {
        id,
      },
      data: {
        ...updateMastery,
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

export default MasteryService;
