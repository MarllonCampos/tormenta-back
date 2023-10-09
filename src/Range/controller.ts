import { Request, Response } from 'express';
import RangeService from './service'
class RangeController {
  private service: RangeService;
  constructor() {
    this.service = new RangeService();
  }

  index = async (req: Request, res: Response) => {
    const range = await this.service.index();
    return res.json(range);
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

export default RangeController;
