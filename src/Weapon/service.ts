import { Prisma, PrismaClient, weapon as prismaWeaponInterface } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { weaponInputInterface } from './model';

interface Update {
  id: number;
  updateWeapon: weaponInputInterface;
}
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
    return await this.repository.findUnique({
      where: {
        id,
      },
    });
  };

  create = async (newWeapon: weaponInputInterface) => {
    return await this.repository.create({
      data: newWeapon,
    });
  };

  update = async ({ id, updateWeapon }: Update) => {
    return await this.repository.update({
      where: {
        id,
      },
      data: {
        ...updateWeapon,
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

export default WeaponService;
