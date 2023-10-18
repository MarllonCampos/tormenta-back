import DefaultErrors, { IErrorConstructor } from '../Errors/defaultErrors';

export default class TraitErrors extends DefaultErrors {
  errors: string[] = [];

  constructor({ message, errors = [], status = 400 }: IErrorConstructor) {
    super({ message, errors, status });
    this.errors = errors;
    this.status = status;

    Object.setPrototypeOf(this, TraitErrors.prototype);
  }

  static TraitNotFound(): TraitErrors {
    return new TraitErrors({ message: 'A característica informada não foi encontrada', status: 404 });
  }
}
