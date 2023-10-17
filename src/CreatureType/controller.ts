import * as yup from 'yup';
import { Request, Response, NextFunction } from 'express';
import CreatureTypeService from './service';
import CreatureTypeErrors from './errors';
import CreatureTypeDTO from './model';

class CreatureTypeController {
  private service: CreatureTypeService;
  constructor() {
    this.service = new CreatureTypeService();
  }

  index = async (req: Request, res: Response, next: NextFunction) => {
    const creatureType = await this.service.index();
    return res.json(creatureType);
  };

  show = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const formattedId = Number(id);
      if (isNaN(formattedId)) throw CreatureTypeErrors.IdMustBeAnumber();

      const specificCreatureType = await this.service.show(formattedId);

      if (!specificCreatureType) throw CreatureTypeErrors.CreatureTypeNotFound();
      const creatureTypeDTO = new CreatureTypeDTO(specificCreatureType);
      const normalizedCreatureType = creatureTypeDTO.view();
      return res.status(200).send({
        message: 'Tipo de criatura encontrada com sucesso',
        data: normalizedCreatureType,
      });
    } catch (error) {
      next(error);
    }
  };

  store = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newCreatureType = req.body;

      const creatureTypeDTO = new CreatureTypeDTO(newCreatureType);

      const normalizedNewCreatureType = creatureTypeDTO.create();

      const createdCreatureType = await this.service.create(normalizedNewCreatureType);
      const outputCreatureTypeDTO = new CreatureTypeDTO(createdCreatureType);
      const outputCreatureType = outputCreatureTypeDTO.view();

      return res.status(201).send({
        message: 'Tipo de criatura criado com sucesso',
        data: outputCreatureType,
      });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const yupErrors = error.errors;
        return next(CreatureTypeErrors.ValidationErrors([...yupErrors]));
      }
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const formattedId = Number(id);
      if (isNaN(formattedId)) throw CreatureTypeErrors.IdMustBeAnumber();

      const creatureTypeExists = await this.service.show(formattedId);
      if (!creatureTypeExists) throw CreatureTypeErrors.CreatureTypeNotFound();
      const creatureType = req.body;
      if (Object.keys(creatureType).length == 0) throw CreatureTypeErrors.NoFieldsToUpdate();

      const creatureTypeDTO = new CreatureTypeDTO(creatureType);
      const normalizedCreatureType = creatureTypeDTO.update();

      const updatedCreatureType = await this.service.update({
        id: formattedId,
        updateCreatureType: normalizedCreatureType,
      });

      const outputCreatureTypeDTO = new CreatureTypeDTO(updatedCreatureType);
      const outputCreatureType = outputCreatureTypeDTO.view();

      return res.status(200).send({ message: 'O tipo de criatura foi atualizado', data: outputCreatureType });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const yupErrors = error.errors;
        return next(CreatureTypeErrors.ValidationErrors([...yupErrors]));
      }
      next(error);
    }
  };
  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const formattedId = Number(id);
      if (isNaN(formattedId)) throw CreatureTypeErrors.IdMustBeAnumber();

      const creatureTypeExists = await this.service.show(formattedId);
      if (!creatureTypeExists) throw CreatureTypeErrors.CreatureTypeNotFound();

      await this.service.delete(formattedId);

      return res.status(204).send({ message: 'Tipo de criatura exluído com sucesso' });
    } catch (error) {
      next(error);
    }
  };
}

export default CreatureTypeController;
