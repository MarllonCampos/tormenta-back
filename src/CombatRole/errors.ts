import DefaultErrors, { IErrorConstructor } from '../Errors/defaultErrors';

export default class CombatRoleErrors extends DefaultErrors {
  errors: string[] = [];

  constructor({ message, errors = [], status = 400 }: IErrorConstructor) {
    super({ message, errors, status });
    this.errors = errors;
    this.status = status;

    Object.setPrototypeOf(this, CombatRoleErrors.prototype);
  }

  static CombatRoleNotFound(): CombatRoleErrors {
    return new CombatRoleErrors({ message: 'O papel de combate informado não foi encontrado', status: 404 });
  }
}
