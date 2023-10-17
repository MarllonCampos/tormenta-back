import * as yup from 'yup';
import { Request, Response, NextFunction } from 'express';
import CreatureSizeService from './service';
import CreatureSizeErrors from './errors';
import CreatureSizeDTO from './model';

class CreatureSizeController {
  private service: CreatureSizeService;
  constructor() {
    this.service = new CreatureSizeService();
  }

  index = async (req: Request, res: Response, next: NextFunction) => {
    const creatureSize = await this.service.index();
    return res.json({ message: 'Tamanhos das criaturas encontradas com sucesso', data: creatureSize });
  };

  show = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const formattedId = Number(id);
      if (isNaN(formattedId)) throw CreatureSizeErrors.IdMustBeAnumber();

      const creatureSize = await this.service.show(formattedId);

      if (!creatureSize) throw CreatureSizeErrors.CreatureSizeNotFound();
      const creatureSizeDTO = new CreatureSizeDTO(creatureSize);
      const normalizedCreatureSize = creatureSizeDTO.view();

      return res.status(200).send({
        message: 'Tamanho de criatura encontrado com sucesso',
        data: normalizedCreatureSize,
      });
    } catch (error) {
      next(error);
    }
  };

  store = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newCreatureSize = req.body;
      const creatureSizeDTO = new CreatureSizeDTO(newCreatureSize);
      const normalizedNewCreatureSize = creatureSizeDTO.create();

      const createdCreatureSize = await this.service.create(normalizedNewCreatureSize);

      const outputCreatureSizeDTO = new CreatureSizeDTO(createdCreatureSize);
      const outputCreatureSize = outputCreatureSizeDTO.view();

      return res.status(201).send({
        message: 'Tamanho de criatura criado com sucesso',
        data: outputCreatureSize,
      });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const yupErrors = error.errors;
        return next(CreatureSizeErrors.ValidationErrors([...yupErrors]));
      }
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const formattedId = Number(id);
      if (isNaN(formattedId)) throw CreatureSizeErrors.IdMustBeAnumber();

      const creatureSizeExists = await this.service.show(formattedId);
      if (!creatureSizeExists) throw CreatureSizeErrors.CreatureSizeNotFound();
      const creatureSize = req.body;
      if (Object.keys(creatureSize).length == 0) throw CreatureSizeErrors.NoFieldsToUpdate();

      const creatureSizeDTO = new CreatureSizeDTO(creatureSize);
      const normalizedCreatureSize = creatureSizeDTO.update();

      const updatedCreatureSize = await this.service.update({
        id: formattedId,
        updateCreatureSize: normalizedCreatureSize,
      });
      const outputCreatureSizeDTO = new CreatureSizeDTO(updatedCreatureSize);

      const outputCreatureSize = outputCreatureSizeDTO.view();

      return res.status(200).send({
        message: 'O tamanho de criatura foi atualizado',
        data: outputCreatureSize,
      });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const yupErrors = error.errors;
        return next(CreatureSizeErrors.ValidationErrors([...yupErrors]));
      }
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const formattedId = Number(id);
      if (isNaN(formattedId)) throw CreatureSizeErrors.IdMustBeAnumber();

      const creatureSizeExists = await this.service.show(formattedId);
      if (!creatureSizeExists) throw CreatureSizeErrors.CreatureSizeNotFound();

      await this.service.delete(formattedId);

      return res.status(204).send({ message: 'Tamanho de criatura exluído com sucesso' });
    } catch (error) {
      next(error);
    }
  };
}

export default CreatureSizeController;
