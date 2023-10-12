export default class HoldTypeErrors extends Error {
  errors: string[] = [];

  constructor(message: string, errors: string[] = []) {
    super(message);
    this.errors = errors;
    Object.setPrototypeOf(this, HoldTypeErrors.prototype);
  }

  static ValidationErrors(errors: string[] = []): HoldTypeErrors {
    return new HoldTypeErrors('Houve um erro com a validação dos dados', errors);
  }

  static DefaultErrorMessage(errors: string[] = []): HoldTypeErrors {
    return new HoldTypeErrors('Existem erros a serem corrigidos, verifique e corrija-os', errors);
  }

  static HoldTypeNotFound(): HoldTypeErrors {
    return new HoldTypeErrors('A empunhadura informada não foi encontrada');
  }

  static NoFieldsToUpdate(): HoldTypeErrors {
    return new HoldTypeErrors('Não há campos a serem alterados');
  }
}
