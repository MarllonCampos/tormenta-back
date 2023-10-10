import * as yup from 'yup';
import { Request, Response } from 'express';
import WeaponService from './service';
import WeaponDTO from './model';
import RangeService from '../Range/service';
import DamageTypeService from '../DamageType/service';
import HoldTypeService from '../HoldType/service';
import WeaponCategoryService from '../WeaponCategory/service';

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

  index = async (_: Request, res: Response) => {
    try {
      const weapons = await this.service.index();
      return res.json(weapons);
    } catch (error) {
      return res.status(500).send({ error: true });
    }
  };

  show = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const formattedId = Number(id);
      const specificWeapon = await this.service.show(formattedId);
      if (!specificWeapon) return res.status(400).send({ message: 'A arma informada não foi encontrada' });
      const weaponDTO = new WeaponDTO(specificWeapon);
      const normalizedWeapon = weaponDTO.view();

      return res.status(200).send(normalizedWeapon);
    } catch (error) {
      return res.status(500).send('Erro no backend'); // TODO --> Criar um erro padrão de backend
    }
  };

  store = async (req: Request, res: Response) => {
    const errors = [];
    try {
      const newWeapon = req.body;
      const weaponDTO = new WeaponDTO(newWeapon);

      const normalizedNewWeapon = weaponDTO.create();
      const notFoundForeignKeys: Array<string> = await this.generateNotFoundForeignKeys(normalizedNewWeapon);

      if (notFoundForeignKeys.length > 0) errors.push(...notFoundForeignKeys);
      if (errors.length > 0)
        return res.status(400).send({ message: 'Um erro ocorreu, veja para mais detalhes', errors });

      await this.service.create(normalizedNewWeapon);

      return res.status(201).send({ message: 'Arma criada com sucesso' });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        return res.status(400).send({
          message: 'Houve um erro com a validação dos dados',
          errors: [...error.errors, ...errors],
        });
      }
    }
  };
  update = async (req: Request, res: Response) => {
    const errors: string[] = [];
    try {
      const { id } = req.params;

      if (!id) return res.status(400).send('You burro men?!');
      const formattedId = Number(id);
      const weaponExists = await this.service.show(formattedId);
      if (!weaponExists) return res.status(400).send({ message: 'A arma informada não foi encontrada' });
      const weapon = req.body;
      if (Object.keys(weapon).length == 0) return res.status(400).send({ message: 'Não há campos a serem alterados' });

      const weaponDTO = new WeaponDTO(weapon);

      const normalizedWeapon = weaponDTO.update();
      const notFoundForeignKeys: Array<string> = await this.generateNotFoundForeignKeys(normalizedWeapon);

      if (notFoundForeignKeys.length > 0) errors.push(...notFoundForeignKeys);
      if (errors.length > 0)
        return res.status(400).send({ message: 'Um erro ocorreu, veja para mais detalhes', errors });

      const updatedWeapon = await this.service.update({ id: formattedId, updateWeapon: normalizedWeapon });

      const outputWeaponDTO = new WeaponDTO(updatedWeapon);

      const outputWeapon = outputWeaponDTO.view();
      return res.status(200).send({ message: 'A arma foi atualizada', details: outputWeapon });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        return res.status(400).send({
          message: 'Houve um erro com a validação dos dados',
          error: error.errors,
        });
      }
      console.log(error);

      return res.status(500).send({ message: 'Erro no backend', x: error }); // TODO --> Criar um erro padrão de backend
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      if (!id) return res.status(400).send('You burro men?!');
      const formattedId = Number(id);
      const weaponExists = await this.service.show(formattedId);
      if (!weaponExists) return res.status(400).send({ message: 'A arma informada não foi encontrada' });
      await this.service.delete(formattedId);
      return res.status(204).send();
    } catch (error) {
      return res.status(500).send('Erro no backend'); // TODO --> Criar um erro padrão de backend
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
