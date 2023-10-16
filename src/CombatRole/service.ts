import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { combatRoleInputInterface } from './model';

interface Update {
  id: number;
  updateCombatRole: combatRoleInputInterface;
}
class CombatRoleService {
  private repository: Prisma.combatroleDelegate<DefaultArgs>;
  constructor() {
    const prisma = new PrismaClient();
    this.repository = prisma.combatrole;
  }

  index = async () => {
    const combatrole = await this.repository.findMany({
      select: {
        name: true,
      },
    });
    return combatrole;
  };

  show = async (id: number) => {
    return await this.repository.findUnique({
      where: {
        id,
      },
    });
  };

  create = async (combatRole: combatRoleInputInterface) => {
    return await this.repository.create({
      data: combatRole,
    });
  };

  update = async ({ id, updateCombatRole }: Update) => {
    return await this.repository.update({
      where: {
        id,
      },
      data: {
        ...updateCombatRole,
      },
    });
  };
  delete = async (id: number) => {
    return await this.repository.delete({
      where: { id },
    });
  };
}

export default CombatRoleService;
