import DefaultErrors, { IErrorConstructor } from './../Errors/defaultErrors';
export default class WeaponCategoryErrors extends DefaultErrors {
  errors: string[] = [];

  constructor({ message, errors = [], status = 400 }: IErrorConstructor) {
    super({ message, errors, status });
    this.errors = errors;
    this.status = status;
    Object.setPrototypeOf(this, WeaponCategoryErrors.prototype);
  }
  static WeaponCategoryNotFound(): WeaponCategoryErrors {
    return new WeaponCategoryErrors({ message: 'A categoria de arma informada não foi encontrada', status: 404 });
  }
}
