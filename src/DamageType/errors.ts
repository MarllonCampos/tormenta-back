export default class DamageTypeErrors extends Error {
  errors: string[] = [];

  constructor(message: string, errors: string[] = []) {
    super(message);
    this.errors = errors;
    Object.setPrototypeOf(this, DamageTypeErrors.prototype);
  }

  static ValidationErrors(errors: string[] = []): DamageTypeErrors {
    return new DamageTypeErrors('Houve um erro com a validação dos dados', errors);
  }

  static DefaultErrorMessage(errors: string[] = []): DamageTypeErrors {
    return new DamageTypeErrors('Existem erros a serem corrigidos, verifique e corrija-os', errors);
  }

  static DamageTypeNotFound(): DamageTypeErrors {
    return new DamageTypeErrors('O tipo de dano informado não foi encontrado');
  }

  static NoFieldsToUpdate(): DamageTypeErrors {
    return new DamageTypeErrors('Não há campos a serem alterados');
  }
}
