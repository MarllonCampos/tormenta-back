import { Request, Response } from 'express';
import WeaponCategoryService from './service'
class WeaponCategoryController {
  private service: WeaponCategoryService;
  constructor() {
    this.service = new WeaponCategoryService();
  }

  index = async (req: Request, res: Response) => {
    const weaponCategory = await this.service.index();
    return res.json(weaponCategory);
  };
  async show(req: Request, res: Response) {
    res.send(null);
  }
  async store(req: Request, res: Response) {
    res.send(null);
  }
  async update(req: Request, res: Response) {
    res.send(null);
  }
  async delete(req: Request, res: Response) {
    res.send(null);
  }
}

export default WeaponCategoryController;
