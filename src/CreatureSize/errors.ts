import DefaultErrors, { IErrorConstructor } from '../Errors/defaultErrors';

export default class CreatureSizeErrors extends DefaultErrors {
  errors: string[] = [];

  constructor({ message, errors = [], status = 400 }: IErrorConstructor) {
    super({ message, errors, status });
    this.errors = errors;
    this.status = status;

    Object.setPrototypeOf(this, CreatureSizeErrors.prototype);
  }

  static CreatureSizeNotFound(): CreatureSizeErrors {
    return new CreatureSizeErrors({ message: 'O [alterar isso] informado não foi encontrado', status: 404 });
  }
}
