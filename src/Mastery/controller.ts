import * as yup from 'yup';
import { Request, Response, NextFunction } from 'express';
import MasteryService from './service';
import MasteryErrors from './errors';
import MasteryDTO from './model';

class MasteryController {
  private service: MasteryService;
  constructor() {
    this.service = new MasteryService();
  }

  index = async (req: Request, res: Response, next: NextFunction) => {
    const mastery = await this.service.index();
    return res.json({ message: 'Perícias criaturas encontradas com sucesso', data: mastery });
  };

  show = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const formattedId = Number(id);
      if (isNaN(formattedId)) throw MasteryErrors.IdMustBeAnumber();

      const specificMastery = await this.service.show(formattedId);
      if (!specificMastery) throw MasteryErrors.MasteryNotFound();

      const masteryDTO = new MasteryDTO(specificMastery);
      const normalizedMastery = masteryDTO.view();

      return res.status(200).send({
        message: 'Perícia encontrada com sucesso',
        data: normalizedMastery,
      });
    } catch (error) {
      next(error);
    }
  };

  store = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newMastery = req.body;

      const masteryDTO = new MasteryDTO(newMastery);

      const normalizedNewMastery = masteryDTO.create();

      const createdMastery = await this.service.create(normalizedNewMastery);

      const outputMasteryDTO = new MasteryDTO(createdMastery);
      const outputMastery = outputMasteryDTO.view();

      return res.status(201).send({
        message: 'Perícia criada com sucesso',
        data: outputMastery,
      });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const yupErrors = error.errors;
        return next(MasteryErrors.ValidationErrors([...yupErrors]));
      }
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const formattedId = Number(id);
      if (isNaN(formattedId)) throw MasteryErrors.IdMustBeAnumber();

      const masteryExists = await this.service.show(formattedId);
      if (!masteryExists) throw MasteryErrors.MasteryNotFound();
      const mastery = req.body;
      if (Object.keys(mastery).length == 0) throw MasteryErrors.NoFieldsToUpdate();

      const masteryDTO = new MasteryDTO(mastery);
      const normalizedMastery = masteryDTO.update();

      const updatedMastery = await this.service.update({ id: formattedId, updateMastery: normalizedMastery });

      const outputMasteryDTO = new MasteryDTO(updatedMastery);
      const outputMastery = outputMasteryDTO.view();

      return res.status(200).send({ message: 'A perícia foi atualizada', data: outputMastery });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const yupErrors = error.errors;
        return next(MasteryErrors.ValidationErrors([...yupErrors]));
      }
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const formattedId = Number(id);
      if (isNaN(formattedId)) throw MasteryErrors.IdMustBeAnumber();

      const masteryExists = await this.service.show(formattedId);
      if (!masteryExists) throw MasteryErrors.MasteryNotFound();

      await this.service.delete(formattedId);

      return res.status(204).send({ message: 'Perícia exluída com sucesso' });
    } catch (error) {
      next(error);
    }
  };
}

export default MasteryController;
