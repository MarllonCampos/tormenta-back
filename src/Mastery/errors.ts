import DefaultErrors, { IErrorConstructor } from '../Errors/defaultErrors';

export default class MasteryErrors extends DefaultErrors {
  errors: string[] = [];

  constructor({ message, errors = [], status = 400 }: IErrorConstructor) {
    super({ message, errors, status });
    this.errors = errors;
    this.status = status;

    Object.setPrototypeOf(this, MasteryErrors.prototype);
  }

  static MasteryNotFound(): MasteryErrors {
    return new MasteryErrors({ message: 'O [alterar isso] informado não foi encontrado', status: 404 });
  }
}
