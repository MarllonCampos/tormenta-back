import * as yup from 'yup';
import { Request, Response } from 'express';
import WeaponService from './service';
import WeaponDTO from './model';
import RangeService from '../Range/service';
import DamageTypeService from '../DamageType/service';
import HoldTypeService from '../HoldType/service';
import WeaponCategoryService from '../WeaponCategory/service';

class WeaponController {
  private service: WeaponService;
  private rangeService: RangeService;
  private damageTypeService: DamageTypeService;
  private holdTypeService: HoldTypeService;
  private weaponCategoryService: WeaponCategoryService;

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
      if (!id) return res.status(400).send('You burro men?!');
      const formattedId = Number(id);
      const specificWeapon = await this.service.show(formattedId);

      const weaponDTO: WeaponDTO = new WeaponDTO(specificWeapon);
      weaponDTO.view();

      return res.status(200).send(weaponDTO.weapon);
    } catch (error) {
      return res.status(500).send('Erro no backend'); // TODO --> Criar um erro padrão de backend
    }
  };

  store = async (req: Request, res: Response) => {
    const errors = [];
    try {
      const newWeapon = req.body;
      const weaponDTO: WeaponDTO = new WeaponDTO(newWeapon);
      weaponDTO.create();
      const { attack_range, category, hold_type, damage_type } = weaponDTO.weapon;

      const arrayOfPromises = [
        this.rangeService.show(attack_range),
        this.weaponCategoryService.show(category),
        this.holdTypeService.show(hold_type),
        this.damageTypeService.show(damage_type),
      ];

      const [rangeExists, categoryExists, holdTypeExists, damageTypeExists] = await Promise.all(arrayOfPromises);

      const notFoundEntries = [];
      if (rangeExists == null) notFoundEntries.push('Não encontramos este tipo de alcance cadastrado');
      if (categoryExists == null) notFoundEntries.push('Não encontramos este tipo de categoria cadastrado');
      if (holdTypeExists == null) notFoundEntries.push('Não encontramos este tipo de empunhadura cadastrado');
      if (damageTypeExists == null) notFoundEntries.push('Não encontramos este tipo de dano cadastrado');
      if (notFoundEntries.length > 0) errors.push(...notFoundEntries);
      if (errors.length > 0) res.status(400).send({ message: 'Um erro ocorreu, veja para mais detalhes', errors });

      await this.service.create(weaponDTO.weapon);

      return res.status(201).send({ message: 'Arma criada com sucesso' });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        return res.status(400).send({
          message: 'Houve um erro com a validação dos dados',
          details: { errors: [...error.errors, ...errors] },
        });
      }
    }
  };
  update = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      if (!id) return res.status(400).send('You burro men?!');
      const formattedId = Number(id);
      const weaponExists = await this.service.show(formattedId);
      if (!weaponExists) return res.status(400).send({ message: 'A arma informada não foi encontrada' });
      return res.status(204).send();
    } catch (error) {
      return res.status(500).send('Erro no backend'); // TODO --> Criar um erro padrão de backend
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
}

export default WeaponController;
