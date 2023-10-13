export default class WeaponErrors extends Error {
  errors: string[] = [];

  constructor(message: string, errors: string[] = []) {
    super(message);
    this.errors = errors;
    Object.setPrototypeOf(this, WeaponErrors.prototype);
  }

  static ValidationErrors(errors: string[] = []): WeaponErrors {
    return new WeaponErrors('Houve um erro com a validação dos dados', errors);
  }

  static DefaultErrorMessage(errors: string[] = []): WeaponErrors {
    return new WeaponErrors('Existem erros a serem corrigidos, verifique e corrija-os', errors);
  }

  static WeaponNotFound(): WeaponErrors {
    return new WeaponErrors('A arma informada não foi encontrada não foi encontrada');
  }

  static NoFieldsToUpdate(): WeaponErrors {
    return new WeaponErrors('Não há campos a serem alterados');
  }
  static IdMustBeAnumber(): WeaponErrors {
    return new WeaponErrors('O parametro da rota deve ser um número inteiro');
  }
}
