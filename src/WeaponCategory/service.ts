import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { weaponCategoryInputInterface } from './model';

interface Update {
  id: number;
  updateWeaponCategory: weaponCategoryInputInterface;
}

class WeaponCategoryService {
  private repository: Prisma.weaponcategoryDelegate<DefaultArgs>;
  constructor() {
    const prisma = new PrismaClient();
    this.repository = prisma.weaponcategory;
  }

  index = async () => {
    const weaponCategory = await this.repository.findMany({
      select: {
        type: true,
      },
    });
    return weaponCategory;
  };
  async show(id: number) {
    return await this.repository.findUnique({
      where: {
        id,
      },
    });
  }
  async create(newWeaponCategory: weaponCategoryInputInterface) {
    return await this.repository.create({
      data: newWeaponCategory,
    });
  }
  async update({ id, updateWeaponCategory }: Update) {
    return await this.repository.update({
      where: {
        id,
      },
      data: {
        ...updateWeaponCategory,
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

export default WeaponCategoryService;
