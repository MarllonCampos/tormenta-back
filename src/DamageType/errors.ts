import DefaultErrors, { IErrorConstructor } from '../Errors/defaultErrors';

export default class DamageTypeErrors extends DefaultErrors {
  errors: string[] = [];

  constructor({ message, errors = [], status = 400 }: IErrorConstructor) {
    super({ message, errors, status });
    this.errors = errors;
    this.status = status;

    Object.setPrototypeOf(this, DamageTypeErrors.prototype);
  }

  static DamageTypeNotFound(): DamageTypeErrors {
    return new DamageTypeErrors({ message: 'O tipo de dano informado não foi encontrado', status: 404 });
  }
}
