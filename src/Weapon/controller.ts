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
  async store(req: Request, res: Response) {
    try {
      const newWeapon = req.body;
      const weaponDTO: WeaponDTO = new WeaponDTO(newWeapon);
      weaponDTO.create();
      res.send({ message: 'works?', details: weaponDTO.weapon });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        return res.status(400).send({
          message: 'Houve um erro com a validação dos dados',
          details: [...error.errors],
        });
      }
    }
  }
  async update(req: Request, res: Response) {
    return null;
  }
  async delete(req: Request, res: Response) {
    return null;
  }
}

export default WeaponController;
