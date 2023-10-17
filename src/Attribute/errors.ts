import DefaultErrors, { IErrorConstructor } from '../Errors/defaultErrors';

export default class AttributeErrors extends DefaultErrors {
  errors: string[] = [];

  constructor({ message, errors = [], status = 400 }: IErrorConstructor) {
    super({ message, errors, status });
    this.errors = errors;
    this.status = status;

    Object.setPrototypeOf(this, AttributeErrors.prototype);
  }

  static AttributeNotFound(): AttributeErrors {
    return new AttributeErrors({ message: 'O atributo informado não foi encontrado', status: 404 });
  }
}
