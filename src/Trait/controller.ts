import * as yup from 'yup';
import { Request, Response, NextFunction } from 'express';
import TraitService from './service';
import TraitErrors from './errors';
import TraitDTO from './model';

class TraitController {
  private service: TraitService;
  constructor() {
    this.service = new TraitService();
  }

  index = async (req: Request, res: Response, next: NextFunction) => {
    const trait = await this.service.index();
    return res.json({ message: 'Características encontradas com sucesso: ', data: trait });
  };

  show = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const formattedId = Number(id);
      if (isNaN(formattedId)) throw TraitErrors.IdMustBeAnumber();

      const specificTrait = await this.service.show(formattedId);

      if (!specificTrait) throw TraitErrors.TraitNotFound();
      const traitDTO = new TraitDTO(specificTrait);
      const normalizedTrait = traitDTO.view();
      return res.status(200).send({
        message: 'Características encontradas com sucesso',
        data: normalizedTrait,
      });
    } catch (error) {
      next(error);
    }
  };

  store = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newTrait = req.body;

      const traitDTO = new TraitDTO(newTrait);

      const normalizedNewTrait = traitDTO.create();

      const createdTrait = await this.service.create(normalizedNewTrait);
      const outputTraitDTO = new TraitDTO(createdTrait);
      const outputTrait = outputTraitDTO.view();

      return res.status(201).send({
        message: 'Característica criada com sucesso',
        data: outputTrait,
      });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const yupErrors = error.errors;
        return next(TraitErrors.ValidationErrors([...yupErrors]));
      }
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const formattedId = Number(id);
      if (isNaN(formattedId)) throw TraitErrors.IdMustBeAnumber();

      const traitExists = await this.service.show(formattedId);
      if (!traitExists) throw TraitErrors.TraitNotFound();
      const trait = req.body;
      if (Object.keys(trait).length == 0) throw TraitErrors.NoFieldsToUpdate();

      const traitDTO = new TraitDTO(trait);
      const normalizedTrait = traitDTO.update();

      const updatedTrait = await this.service.update({ id: formattedId, updateTrait: normalizedTrait });

      const outputTraitDTO = new TraitDTO(updatedTrait);
      const outputTrait = outputTraitDTO.view();

      return res.status(200).send({ message: 'A característica foi atualizada', data: outputTrait });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const yupErrors = error.errors;
        return next(TraitErrors.ValidationErrors([...yupErrors]));
      }
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const formattedId = Number(id);
      if (isNaN(formattedId)) throw TraitErrors.IdMustBeAnumber();

      const traitExists = await this.service.show(formattedId);
      if (!traitExists) throw TraitErrors.TraitNotFound();

      await this.service.delete(formattedId);

      return res.status(204).send({ message: 'Alcance exluído com sucesso' });
    } catch (error) {
      next(error);
    }
  };
}

export default TraitController;
