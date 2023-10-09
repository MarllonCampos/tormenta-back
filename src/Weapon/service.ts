import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

class WeaponService {
  private repository: Prisma.weaponDelegate<DefaultArgs>;
  private defaultWeaponObject = {
    // TODO -> Creates a DTO to change the response to user using some ZOD lib
    name: true,
    damage: true,
    critical: true,
    melee: true,
    spaces: true,
    default: true,
    img: true,
  };
  constructor() {
    const prisma = new PrismaClient();
    this.repository = prisma.weapon;
  }

  async index() {
    const weapons = await this.repository.findMany({
      select: {
        ...this.defaultWeaponObject,
      },
    });
    return weapons;
  }

  async show(id: number) {
    return await this.repository.findUnique({
      where: {
        id,
      },
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

export default WeaponService;
