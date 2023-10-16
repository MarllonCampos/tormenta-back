import DefaultErrors, { IErrorConstructor } from '../Errors/defaultErrors';

export default class WeaponErrors extends DefaultErrors {
  errors: string[] = [];

  constructor({ message, errors = [], status = 400 }: IErrorConstructor) {
    super({ message, errors, status });
    this.errors = errors;
    this.status = status;
    Object.setPrototypeOf(this, WeaponErrors.prototype);
  }

  static WeaponNotFound(): WeaponErrors {
    return new WeaponErrors({ message: 'A arma informada não foi encontrada', status: 404 });
  }
}
