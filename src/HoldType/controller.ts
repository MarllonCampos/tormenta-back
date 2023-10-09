import { Request, Response } from 'express';
import HoldTypeService from './service'
class HoldTypeController {
  private service: HoldTypeService;
  constructor() {
    this.service = new HoldTypeService();
  }

  index = async (req: Request, res: Response) => {
    const holdType = await this.service.index();
    return res.json(holdType);
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

export default HoldTypeController;
