import * as yup from 'yup';
import { NextFunction, Request, Response } from 'express';
import WeaponCategoryService from './service';
import WeaponCategoryErrors from './errors';
import WeaponCategoryDTO from './model';
class WeaponCategoryController {
  private service: WeaponCategoryService;
  constructor() {
    this.service = new WeaponCategoryService();
  }

  index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const weaponCategories = await this.service.index();
      if (weaponCategories.length == 0) return res.json({ message: 'Não há categoria de armas cadastradas' });

      return res.json({ message: 'Categoria de armas encontradas com sucesso', data: weaponCategories });
    } catch (error) {
      next(error);
    }
  };
  show = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const formattedId = Number(id);
      if (isNaN(formattedId)) throw WeaponCategoryErrors.IdMustBeAnumber();

      const specificWeaponCategory = await this.service.show(formattedId);

      if (!specificWeaponCategory) throw WeaponCategoryErrors.WeaponCategoryNotFound();
      const weaponCategoryDTO = new WeaponCategoryDTO(specificWeaponCategory);
      const normalizedWeaponCategory = weaponCategoryDTO.view();

      return res
        .status(200)
        .send({ message: 'Categoria de arma encontrada com sucesso', data: normalizedWeaponCategory });
    } catch (error) {
      console.log('error: ', error);

      next(error);
    }
  };

  store = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newWeaponCategory = req.body;

      const weaponCategoryDTO = new WeaponCategoryDTO(newWeaponCategory);

      const normalizedWeaponCategory = weaponCategoryDTO.create();

      const createdWeaponCategory = await this.service.create(normalizedWeaponCategory);
      const outputWeaponCategoryDTO = new WeaponCategoryDTO(createdWeaponCategory);
      const outputWeaponCategory = outputWeaponCategoryDTO.view();

      return res.status(201).send({
        message: 'Categoria de arma criada com sucesso',
        data: outputWeaponCategory,
      });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const yupErrors = error.errors;
        return next(WeaponCategoryErrors.ValidationErrors([...yupErrors]));
      }
      next(error);
    }
  };
  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const formattedId = Number(id);
      if (isNaN(formattedId)) throw WeaponCategoryErrors.IdMustBeAnumber();

      const weaponCategoryExists = await this.service.show(formattedId);
      if (!weaponCategoryExists) throw WeaponCategoryErrors.WeaponCategoryNotFound();
      const weaponCategory = req.body;
      if (Object.keys(weaponCategory).length == 0) throw WeaponCategoryErrors.NoFieldsToUpdate();

      const weaponCategoryDTO = new WeaponCategoryDTO(weaponCategory);
      const normalizedWeaponCategory = weaponCategoryDTO.update();

      const updatedWeaponCategory = await this.service.update({
        id: formattedId,
        updateWeaponCategory: normalizedWeaponCategory,
      });

      const outputWeaponCategoryDTO = new WeaponCategoryDTO(updatedWeaponCategory);
      const outputWeaponCategory = outputWeaponCategoryDTO.view();

      return res.status(200).send({ message: 'Categoria de arma foi atualizada', data: outputWeaponCategory });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const yupErrors = error.errors;
        return next(WeaponCategoryErrors.ValidationErrors([...yupErrors]));
      }
      next(error);
    }
  };
  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const formattedId = Number(id);
      if (isNaN(formattedId)) throw WeaponCategoryErrors.IdMustBeAnumber();

      const weaponCategory = await this.service.show(formattedId);
      if (!weaponCategory) throw WeaponCategoryErrors.WeaponCategoryNotFound();

      await this.service.delete(formattedId);

      return res.status(204).send({ message: 'Categoria de arma exluída com sucesso' });
    } catch (error) {
      next(error);
    }
  };
}

export default WeaponCategoryController;
