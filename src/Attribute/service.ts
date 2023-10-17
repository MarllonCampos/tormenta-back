import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { attributeInputInterface } from './model';

interface Update {
  id: number;
  updateAttribute: attributeInputInterface;
}

class AttributeService {
  private repository: Prisma.attributeDelegate<DefaultArgs>;
  constructor() {
    const prisma = new PrismaClient();
    this.repository = prisma.attribute;
  }

  index = async () => {
    const attribute = await this.repository.findMany({
      select: {
        name: true,
      },
    });
    return attribute;
  };

  show = async (id: number) => {
    return await this.repository.findUnique({
      where: {
        id,
      },
    });
  };

  create = async (newAttribute: attributeInputInterface) => {
    return await this.repository.create({
      data: newAttribute,
    });
  };

  update = async ({ id, updateAttribute }: Update) => {
    return await this.repository.update({
      where: {
        id,
      },
      data: {
        ...updateAttribute,
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

export default AttributeService;
