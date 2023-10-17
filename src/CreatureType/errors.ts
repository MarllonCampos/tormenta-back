import DefaultErrors, { IErrorConstructor } from '../Errors/defaultErrors';

export default class CreatureTypeErrors extends DefaultErrors {
  errors: string[] = [];

  constructor({ message, errors = [], status = 400 }: IErrorConstructor) {
    super({ message, errors, status });
    this.errors = errors;
    this.status = status;

    Object.setPrototypeOf(this, CreatureTypeErrors.prototype);
  }

  static CreatureTypeNotFound(): CreatureTypeErrors {
    return new CreatureTypeErrors({ message: 'O tipo de criatura informado não foi encontrado', status: 404 });
  }
}
