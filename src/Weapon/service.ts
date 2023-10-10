import { Prisma, PrismaClient, weapon as prismaWeaponInterface } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { weaponInterface } from './model';

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

  index = async () => {
    const weapons = await this.repository.findMany({
      select: {
        ...this.defaultWeaponObject,
      },
    });
    return weapons;
  };

  show = async (id: number) => {
    console.log('show ', id);

    return await this.repository.findUnique({
      where: {
        id,
      },
    });
  };
  create = async (newWeapon: weaponInterface) => {
    await this.repository.create({
      data: newWeapon,
    });
  };
  update = async (id: number) => {
    await this.repository.update({
      where: {
        id,
      },
      data: {},
    });
  };
  delete = async (id: number) => {
    await this.repository.delete({
      where: {
        id,
      },
    });
  };
}

export default WeaponService;
