import * as yup from 'yup';
import { NextFunction, Request, Response } from 'express';
import CombatRoleService from './service';
import CombatRoleDTO from './model';
import CombatRoleErrors from './errors';

class CombatRoleController {
  private service: CombatRoleService;
  constructor() {
    this.service = new CombatRoleService();
  }

  index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const combatRole = await this.service.index();
      if (combatRole.length == 0) return res.json({ message: 'Não há papeis de combate cadastrados' });

      return res.json({ message: 'Papeis de combate encontrados com sucesso', data: combatRole });
    } catch (error) {
      next(error);
    }
  };

  show = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const formattedId = Number(id);
      if (isNaN(formattedId)) throw CombatRoleErrors.IdMustBeAnumber();

      const specificItem = await this.service.show(formattedId);

      if (!specificItem) throw CombatRoleErrors.CombatRoleNotFound();
      const combatRoleDTO = new CombatRoleDTO(specificItem);
      const normalizedCombatRole = combatRoleDTO.view();

      return res.status(200).send({
        message: 'Papel de combate encontrado com sucesso',
        data: normalizedCombatRole,
      });
    } catch (error) {
      next(error);
    }
  };

  store = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newCombatRole = req.body;

      const combatRoleDTO = new CombatRoleDTO(newCombatRole);

      const normalizedNewCombatRole = combatRoleDTO.create();

      const createdCombateRole = await this.service.create(normalizedNewCombatRole);
      const outputCombatRoleDTO = new CombatRoleDTO(createdCombateRole);
      const outputCombatRole = outputCombatRoleDTO.view();

      return res.status(201).send({
        message: 'Papel de combate criado com sucesso',
        data: outputCombatRole,
      });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const yupErrors = error.errors;
        return next(CombatRoleErrors.ValidationErrors([...yupErrors]));
      }
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const formattedId = Number(id);
      if (isNaN(formattedId)) throw CombatRoleErrors.IdMustBeAnumber();

      const combatRoleExists = await this.service.show(formattedId);
      if (!combatRoleExists) throw CombatRoleErrors.CombatRoleNotFound();

      const combatRole = req.body;
      if (Object.keys(combatRole).length == 0) throw CombatRoleErrors.NoFieldsToUpdate();

      const combatRoleDTO = new CombatRoleDTO(combatRole);
      const normalizedCombatRole = combatRoleDTO.update();

      const updatedCombatRole = await this.service.update({
        id: formattedId,
        updateCombatRole: normalizedCombatRole,
      });

      const outputCombatRoleDTO = new CombatRoleDTO(updatedCombatRole);
      const outputCombatRole = outputCombatRoleDTO.view();

      return res.status(200).send({
        message: 'O papel de combate foi atualizado',
        data: outputCombatRole,
      });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const yupErrors = error.errors;
        return next(CombatRoleErrors.ValidationErrors([...yupErrors]));
      }
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const formattedId = Number(id);
      if (isNaN(formattedId)) throw CombatRoleErrors.IdMustBeAnumber();

      const combatRoleExists = await this.service.show(formattedId);
      if (!combatRoleExists) throw CombatRoleErrors.CombatRoleNotFound();

      await this.service.delete(formattedId);

      return res.status(204).send({
        message: 'Papel de combate excluído com sucesso',
      });
    } catch (error) {
      next(error);
    }
  };
}

export default CombatRoleController;
