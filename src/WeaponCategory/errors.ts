export default class WeaponCategoryErrors extends Error {
  errors: string[] = [];

  constructor(message: string, errors: string[] = []) {
    super(message);
    this.errors = errors;
    Object.setPrototypeOf(this, WeaponCategoryErrors.prototype);
  }

  static ValidationErrors(errors: string[] = []): WeaponCategoryErrors {
    return new WeaponCategoryErrors('Houve um erro com a validação dos dados', errors);
  }

  static DefaultErrorMessage(errors: string[] = []): WeaponCategoryErrors {
    return new WeaponCategoryErrors('Existem erros a serem corrigidos, verifique e corrija-os', errors);
  }

  static WeaponCategoryNotFound(): WeaponCategoryErrors {
    return new WeaponCategoryErrors('A categoria de arma informada não foi encontrada');
  }

  static NoFieldsToUpdate(): WeaponCategoryErrors {
    return new WeaponCategoryErrors('Não há campos a serem alterados');
  }

  static IdMustBeAnumber(): WeaponCategoryErrors {
    return new WeaponCategoryErrors('O parametro da rota deve ser um número inteiro');
  }
}
