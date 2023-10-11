import * as yup from 'yup';
import { NextFunction, Request, Response } from 'express';
import WeaponService from './service';
import WeaponDTO from './model';
import RangeService from '../Range/service';
import DamageTypeService from '../DamageType/service';
import HoldTypeService from '../HoldType/service';
import WeaponCategoryService from '../WeaponCategory/service';
import WeaponErrors from './errors';

interface NormalizedWeapon {
  name: string;
  price: number;
  damage: string;
  critical: string;
  melee: boolean;
  attack_range?: number;
  damage_type?: number;
  spaces: number;
  category?: number;
  hold_type?: number;
  default: boolean;
  img?: string | null;
}

interface ForeignKeysServiceReturnType {
  id: number;
  type: string;
}

interface ForeignKeys extends Pick<NormalizedWeapon, 'attack_range' | 'damage_type' | 'category' | 'hold_type'> {}

class WeaponController {
  private service: WeaponService;
  private rangeService: RangeService;
  private damageTypeService: DamageTypeService;
  private holdTypeService: HoldTypeService;
  private weaponCategoryService: WeaponCategoryService;

  private foreignKeys: Record<keyof ForeignKeys, (value: number) => Promise<ForeignKeysServiceReturnType | any>> = {
    attack_range: (value) => this.rangeService.show(value),
    category: (value) => this.weaponCategoryService.show(value),
    hold_type: (value) => this.holdTypeService.show(value),
    damage_type: (value) => this.damageTypeService.show(value),
  };

  private translateForeignKeys: Record<keyof ForeignKeys, string> = {
    attack_range: 'alcance',
    category: 'categoria',
    hold_type: 'empunhadura',
    damage_type: 'dano',
  };

  constructor() {
    this.service = new WeaponService();
    this.rangeService = new RangeService();
    this.damageTypeService = new DamageTypeService();
    this.holdTypeService = new HoldTypeService();
    this.weaponCategoryService = new WeaponCategoryService();
  }

  index = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const weapons = await this.service.index();
      if (weapons.length == 0) return res.json({ message: 'Não há armas cadastradas' });
      return res.json({ message: 'Armas encontradas com sucesso', data: weapons });
    } catch (error) {
      next(error);
    }
  };

  show = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const formattedId = Number(id);
      const specificWeapon = await this.service.show(formattedId);

      if (!specificWeapon) throw WeaponErrors.WeaponNotFound();
      const weaponDTO = new WeaponDTO(specificWeapon);
      const normalizedWeapon = weaponDTO.view();

      return res.status(200).send({ message: 'Arma encontrada com sucesso', data: normalizedWeapon });
    } catch (error) {
      return next(error);
    }
  };

  store = async (req: Request, res: Response, next: NextFunction) => {
    const errors = [];
    try {
      const newWeapon = req.body;
      const weaponDTO = new WeaponDTO(newWeapon);
      const normalizedNewWeapon = weaponDTO.create();
      const notFoundForeignKeys: Array<string> = await this.generateNotFoundForeignKeys(normalizedNewWeapon);

      if (notFoundForeignKeys.length > 0) errors.push(...notFoundForeignKeys);
      if (errors.length > 0) throw WeaponErrors.DefaultErrorMessage(errors);

      const createdWeapon = await this.service.create(normalizedNewWeapon);

      const outputWeaponDTO = new WeaponDTO(createdWeapon);
      const outputWeapon = outputWeaponDTO.view();

      return res.status(201).send({ message: 'Arma criada com sucesso', data: outputWeapon });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const yupErrors = error.errors;
        return next(WeaponErrors.ValidationErrors([...yupErrors, ...errors]));
      }
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    const errors: string[] = [];
    try {
      const { id } = req.params;
      const formattedId = Number(id);
      const weaponExists = await this.service.show(formattedId);
      if (!weaponExists) throw WeaponErrors.WeaponNotFound();
      const weapon = req.body;

      if (Object.keys(weapon).length == 0) throw WeaponErrors.NoFieldsToUpdate();

      const weaponDTO = new WeaponDTO(weapon);
      const normalizedWeapon = weaponDTO.update();

      const notFoundForeignKeys = await this.generateNotFoundForeignKeys(normalizedWeapon);

      if (notFoundForeignKeys.length > 0) errors.push(...notFoundForeignKeys);
      if (errors.length > 0) throw WeaponErrors.DefaultErrorMessage(errors);

      const updatedWeapon = await this.service.update({ id: formattedId, updateWeapon: normalizedWeapon });

      const outputWeaponDTO = new WeaponDTO(updatedWeapon);
      const outputWeapon = outputWeaponDTO.view();

      return res.status(200).send({ message: 'A arma foi atualizada', data: outputWeapon });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const yupErrors = error.errors;
        return next(WeaponErrors.ValidationErrors([...yupErrors, ...errors]));
      }

      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      if (!id) throw WeaponErrors.WeaponNotFound();

      const formattedId = Number(id);

      const weaponExists = await this.service.show(formattedId);
      if (!weaponExists) throw WeaponErrors.WeaponNotFound();

      await this.service.delete(formattedId);

      return res.status(204).send({ message: 'Arma exluída com sucesso' });
    } catch (error) {
      next(error);
    }
  };

  private async generateNotFoundForeignKeys(normalizedWeapon: NormalizedWeapon): Promise<Array<string>> {
    const arrayOfNotFound: Array<string> = [];
    const promiseInfoArray = this.generatePromiseInfoArray(normalizedWeapon);
    const promiseArray = promiseInfoArray.map(({ service }) => service);
    const results = await Promise.all(promiseArray);

    promiseInfoArray.forEach(({ key }, index) => {
      const result = results[index];
      if (result == null)
        arrayOfNotFound.push(`Não encontramos este tipo de ${Object(this.translateForeignKeys)[key]} cadastrado`);
    });

    return arrayOfNotFound;
  }

  private generatePromiseInfoArray(normalizedWeapon: NormalizedWeapon): Array<{ key: string; service: Promise<any> }> {
    const array: Array<{ key: string; service: Promise<any> }> = [];
    for (const key in this.foreignKeys) {
      if (key in normalizedWeapon) {
        const foreignKeyServiceMethod = Object(this.foreignKeys)[key];
        const service = foreignKeyServiceMethod(Object(normalizedWeapon)[key]);
        array.push({ key, service });
      }
    }
    return array;
  }
}

export default WeaponController;
