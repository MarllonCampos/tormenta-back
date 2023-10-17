import * as yup from 'yup';
import { Request, Response, NextFunction } from 'express';
import AttributeService from './service';
import AttributeErrors from './errors';
import AttributeDTO from './model';

class AttributeController {
  private service: AttributeService;
  constructor() {
    this.service = new AttributeService();
  }

  index = async (req: Request, res: Response, next: NextFunction) => {
    const attribute = await this.service.index();
    return res.json(attribute);
  };

  show = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const formattedId = Number(id);
      if (isNaN(formattedId)) throw AttributeErrors.IdMustBeAnumber();

      const specificAttribute = await this.service.show(formattedId);

      if (!specificAttribute) throw AttributeErrors.AttributeNotFound();
      const attributeDTO = new AttributeDTO(specificAttribute);
      const normalizedAttribute = attributeDTO.view();
      return res.status(200).send({
        message: 'Atributo encontrado com sucesso',
        data: normalizedAttribute,
      });
    } catch (error) {
      next(error);
    }
  };
  store = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newAttribute = req.body;

      const attributeDTO = new AttributeDTO(newAttribute);

      const normalizedNewAttribute = attributeDTO.create();

      const createdAttribute = await this.service.create(normalizedNewAttribute);
      const outputAttributeDTO = new AttributeDTO(createdAttribute);
      const outputAttribute = outputAttributeDTO.view();

      return res.status(201).send({
        message: 'Atributo criado com sucesso',
        data: outputAttribute,
      });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const yupErrors = error.errors;
        return next(AttributeErrors.ValidationErrors([...yupErrors]));
      }
      next(error);
    }
  };
  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const formattedId = Number(id);
      if (isNaN(formattedId)) throw AttributeErrors.IdMustBeAnumber();

      const attributeExists = await this.service.show(formattedId);
      if (!attributeExists) throw AttributeErrors.AttributeNotFound();
      const attribute = req.body;
      if (Object.keys(attribute).length == 0) throw AttributeErrors.NoFieldsToUpdate();

      const attributeDTO = new AttributeDTO(attribute);
      const normalizedAttribute = attributeDTO.update();

      const updatedAttribute = await this.service.update({ id: formattedId, updateAttribute: normalizedAttribute });

      const outputAttributeDTO = new AttributeDTO(updatedAttribute);
      const outputAttribute = outputAttributeDTO.view();

      return res.status(200).send({ message: 'O atributo foi atualizado', data: outputAttribute });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const yupErrors = error.errors;
        return next(AttributeErrors.ValidationErrors([...yupErrors]));
      }
      next(error);
    }
  };
  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const formattedId = Number(id);
      if (isNaN(formattedId)) throw AttributeErrors.IdMustBeAnumber();

      const attributeExists = await this.service.show(formattedId);
      if (!attributeExists) throw AttributeErrors.AttributeNotFound();

      await this.service.delete(formattedId);

      return res.status(204).send({ message: 'Atributo exluído com sucesso' });
    } catch (error) {
      next(error);
    }
  };
}

export default AttributeController;
