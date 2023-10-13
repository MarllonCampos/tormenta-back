import { NextFunction, Request, Response } from 'express';
import * as yup from 'yup';
import RangeService from './service';
import RangeErrors from './errors';
import RangeDTO from './model';

class RangeController {
  private service: RangeService;
  constructor() {
    this.service = new RangeService();
  }

  index = async (_: Request, res: Response, next: NextFunction) => {
    try {
      const ranges = await this.service.index();
      if (ranges.length == 0) return res.json({ message: 'Não há alcance de armas cadastrados' });

      return res.json({ message: 'Alcances encontrados com sucesso', data: ranges });
    } catch (error) {
      next(error);
    }
  };

  show = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const formattedId = Number(id);
      if (isNaN(formattedId)) throw RangeErrors.IdMustBeAnumber();

      const specificRange = await this.service.show(formattedId);
      if (!specificRange) throw RangeErrors.RangeNotFound();
      const rangeDTO = new RangeDTO(specificRange);
      const normalizedRange = rangeDTO.view();

      return res.status(200).send({ message: 'Alcance encontrado com sucesso', data: normalizedRange });
    } catch (error) {
      next(error);
    }
  };

  store = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newRange = req.body;

      const rangeDTO = new RangeDTO(newRange);

      const normalizedNewRange = rangeDTO.create();

      const createdRange = await this.service.create(normalizedNewRange);
      const outputRangeDTO = new RangeDTO(createdRange);
      const outputRange = outputRangeDTO.view();

      return res.status(201).send({
        message: 'Alcance criado com sucesso',
        data: outputRange,
      });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const yupErrors = error.errors;
        return next(RangeErrors.ValidationErrors([...yupErrors]));
      }
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const formattedId = Number(id);
      if (isNaN(formattedId)) throw RangeErrors.IdMustBeAnumber();

      const rangeExists = await this.service.show(formattedId);
      if (!rangeExists) throw RangeErrors.RangeNotFound();
      const range = req.body;
      if (Object.keys(range).length == 0) throw RangeErrors.NoFieldsToUpdate();

      const rangeDTO = new RangeDTO(range);
      const normalizedRange = rangeDTO.update();

      const updatedRange = await this.service.update({ id: formattedId, updateRange: normalizedRange });

      const outputRangeDTO = new RangeDTO(updatedRange);
      const outputRange = outputRangeDTO.view();

      return res.status(200).send({ message: 'O alcance foi atualizado', data: outputRange });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const yupErrors = error.errors;
        return next(RangeErrors.ValidationErrors([...yupErrors]));
      }
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const formattedId = Number(id);
      if (isNaN(formattedId)) throw RangeErrors.IdMustBeAnumber();

      const rangeExists = await this.service.show(formattedId);
      if (!rangeExists) throw RangeErrors.RangeNotFound();

      await this.service.delete(formattedId);

      return res.status(204).send({ message: 'Alcance exluído com sucesso' });
    } catch (error) {
      next(error);
    }
  };
}

export default RangeController;
