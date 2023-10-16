import DefaultErrors, { IErrorConstructor } from '../Errors/defaultErrors';

export default class HoldTypeErrors extends DefaultErrors {
  errors: string[] = [];

  constructor({ message, errors = [], status = 400 }: IErrorConstructor) {
    super({ message, errors, status });
    this.errors = errors;
    this.status = status;
    Object.setPrototypeOf(this, HoldTypeErrors.prototype);
  }

  static HoldTypeNotFound(): HoldTypeErrors {
    return new HoldTypeErrors({ message: 'A empunhadura informada não foi encontrada', status: 404 });
  }
}
