import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

class WeaponCategoryService {
  private repository: Prisma.weaponcategoryDelegate<DefaultArgs>;
  constructor() {
    const prisma = new PrismaClient();
    this.repository = prisma.weaponcategory;
  }

  index = async () => {
    const weaponcategory = await this.repository.findMany();
    return weaponcategory;
  };
  async show(id: number) {
    return await this.repository.findUnique({
      where: { id },
    });
  }
  async create() {
    return null;
  }
  async update() {
    return null;
  }
  async delete() {
    return null;
  }
}

export default WeaponCategoryService;
