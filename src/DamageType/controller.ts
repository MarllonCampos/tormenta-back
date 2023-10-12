import { NextFunction, Request, Response } from 'express';
import * as yup from 'yup';
import DamageTypeService from './service';
import DamageTypeDTO from './model';
import DamageTypeErrors from './errors';

class DamageTypeController {
  private service: DamageTypeService;
  constructor() {
    this.service = new DamageTypeService();
  }

  index = async (_: Request, res: Response, next: NextFunction) => {
    try {
      const damageTypes = await this.service.index();
      if (damageTypes.length == 0) return res.json({ message: 'Não há tipos de dano cadastrados' });

      return res.json({ message: 'Tipos de dano encontrados com sucesso', data: damageTypes });
    } catch (error) {
      next(error);
    }
  };

  show = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const formattedId = Number(id);
      const specificDamageType = await this.service.show(formattedId);

      if (!specificDamageType) throw DamageTypeErrors.DamageTypeNotFound();
      const damageTypeDTO = new DamageTypeDTO(specificDamageType);
      const normalizedDamageType = damageTypeDTO.view();

      return res.status(200).send({ message: 'Tipo de dano encontrado com sucesso', data: normalizedDamageType });
    } catch (error) {
      next(error);
    }
  };

  store = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newDamageType = req.body;

      const damageTypeDTO = new DamageTypeDTO(newDamageType);

      const normalizedNewDamageType = damageTypeDTO.create();

      const createdDamageType = await this.service.create(normalizedNewDamageType);
      const outputDamageTypeDTO = new DamageTypeDTO(createdDamageType);
      const outputDamageType = outputDamageTypeDTO.view();

      return res.status(201).send({
        message: 'Tipo de dano criado com sucesso',
        data: outputDamageType,
      });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const yupErrors = error.errors;
        return next(DamageTypeErrors.ValidationErrors([...yupErrors]));
      }
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const formattedId = Number(id);
      const damageTypeExists = await this.service.show(formattedId);
      if (!damageTypeExists) throw DamageTypeErrors.DamageTypeNotFound();
      const damageType = req.body;
      if (Object.keys(damageType).length == 0) throw DamageTypeErrors.NoFieldsToUpdate();

      const damageTypeDTO = new DamageTypeDTO(damageType);
      const normalizedDamageType = damageTypeDTO.update();

      const updatedDamageType = await this.service.update({ id: formattedId, updateDamageType: normalizedDamageType });

      const outputDamageTypeDTO = new DamageTypeDTO(updatedDamageType);
      const outputDamageType = outputDamageTypeDTO.view();

      return res.status(200).send({ message: 'O tipo de dano foi atualizado', data: outputDamageType });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const yupErrors = error.errors;
        return next(DamageTypeErrors.ValidationErrors([...yupErrors]));
      }
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      if (!id) throw DamageTypeErrors.DamageTypeNotFound();

      const formattedId = Number(id);

      const damageTypeExists = await this.service.show(formattedId);
      if (!damageTypeExists) throw DamageTypeErrors.DamageTypeNotFound();

      await this.service.delete(formattedId);

      return res.status(204).send({ message: 'Tipo de dano exluído com sucesso' });
    } catch (error) {
      next(error);
    }
  };
}

export default DamageTypeController;
