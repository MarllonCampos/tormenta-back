import { NextFunction, Request, Response } from 'express';
import * as yup from 'yup';
import HoldTypeService from './service';
import HoldTypeErrors from './errors';
import HoldTypeDTO from './model';

class HoldTypeController {
  private service: HoldTypeService;
  constructor() {
    this.service = new HoldTypeService();
  }

  index = async (_: Request, res: Response, next: NextFunction) => {
    try {
      const holdTypes = await this.service.index();
      if (holdTypes.length == 0) return res.json({ message: 'Não há empunhadura de armas cadastrados' });

      return res.json({ message: 'Empunhaduras encontradas com sucesso', data: holdTypes });
    } catch (error) {
      next(error);
    }
  };

  show = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const formattedId = Number(id);
      if (isNaN(formattedId)) throw HoldTypeErrors.IdMustBeAnumber();

      const specificHoldType = await this.service.show(formattedId);
      if (!specificHoldType) throw HoldTypeErrors.HoldTypeNotFound();

      const holdTypeDTO = new HoldTypeDTO(specificHoldType);
      const normalizedHoldType = holdTypeDTO.view();

      return res.status(200).send({ message: 'Empunhadura encontrada com sucesso', data: normalizedHoldType });
    } catch (error) {
      next(error);
    }
  };

  store = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newHoldType = req.body;

      const holdTypeDTO = new HoldTypeDTO(newHoldType);

      const normalizedNewHoldType = holdTypeDTO.create();

      const createdHoldType = await this.service.create(normalizedNewHoldType);
      const outputHoldTypeDTO = new HoldTypeDTO(createdHoldType);
      const outputHoldType = outputHoldTypeDTO.view();

      return res.status(201).send({
        message: 'Empunhadura criada com sucesso',
        data: outputHoldType,
      });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const yupErrors = error.errors;
        return next(HoldTypeErrors.ValidationErrors([...yupErrors]));
      }
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const formattedId = Number(id);
      if (isNaN(formattedId)) throw HoldTypeErrors.IdMustBeAnumber();

      const holdTypeExists = await this.service.show(formattedId);
      if (!holdTypeExists) throw HoldTypeErrors.HoldTypeNotFound();

      const holdType = req.body;

      if (Object.keys(holdType).length == 0) throw HoldTypeErrors.NoFieldsToUpdate();

      const holdTypeDTO = new HoldTypeDTO(holdType);
      const normalizedHoldType = holdTypeDTO.update();

      const updatedHoldType = await this.service.update({ id: formattedId, updateHoldType: normalizedHoldType });

      const outputHoldTypeDTO = new HoldTypeDTO(updatedHoldType);
      const outputHoldType = outputHoldTypeDTO.view();

      return res.status(200).send({ message: 'A empunhadura foi atualizado', data: outputHoldType });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const yupErrors = error.errors;
        return next(HoldTypeErrors.ValidationErrors([...yupErrors]));
      }
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const formattedId = Number(id);
      if (isNaN(formattedId)) throw HoldTypeErrors.IdMustBeAnumber();

      const holdTypeExists = await this.service.show(formattedId);
      if (!holdTypeExists) throw HoldTypeErrors.HoldTypeNotFound();

      await this.service.delete(formattedId);

      return res.status(204).send({ message: 'Empunhadura exluída com sucesso' });
    } catch (error) {
      next(error);
    }
  };
}

export default HoldTypeController;
