export default class RangeErrors extends Error {
  errors: string[] = [];

  constructor(message: string, errors: string[] = []) {
    super(message);
    this.errors = errors;
    Object.setPrototypeOf(this, RangeErrors.prototype);
  }

  static ValidationErrors(errors: string[] = []): RangeErrors {
    return new RangeErrors('Houve um erro com a validação dos dados', errors);
  }

  static DefaultErrorMessage(errors: string[] = []): RangeErrors {
    return new RangeErrors('Existem erros a serem corrigidos, verifique e corrija-os', errors);
  }

  static RangeNotFound(): RangeErrors {
    return new RangeErrors('O alcance informado não foi encontrado');
  }

  static NoFieldsToUpdate(): RangeErrors {
    return new RangeErrors('Não há campos a serem alterados');
  }
}
