import DefaultErrors, { IErrorConstructor } from '../Errors/defaultErrors';

export default class RangeErrors extends DefaultErrors {
  errors: string[] = [];

  constructor({ message, errors = [], status = 400 }: IErrorConstructor) {
    super({ message, errors, status });
    this.errors = errors;
    this.status = status;
    Object.setPrototypeOf(this, RangeErrors.prototype);
  }

  static RangeNotFound(): RangeErrors {
    return new RangeErrors({ message: 'O alcance informado não foi encontrado', status: 404 });
  }
}
