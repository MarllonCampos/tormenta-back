import * as yup from 'yup';

export interface combatRoleInputInterface {
  name: string;
}

export default class CombatRoleDTO {
  private _combatRole: any;
  private combatRoleSchema = yup.object().shape({
    name: yup
      .string()
      .min(3, 'O campo de nome [name] deve ter no mínimo 3 caracteres')
      .required('O campo de nome [name] não deve estar vazio'),
  });

  private updateCombatRoleSchema = yup.object().shape({
    name: yup.string().min(3, 'O campo de nome [name] deve ter no mínimo 3 caracteres'),
  });

  private _defaultYupOptions = {
    abortEarly: false,
    stripUnknown: true,
  };

  constructor(combatRole: any) {
    this._combatRole = this.updateCombatRoleSchema.camelCase().cast(combatRole);
  }

  create = (): combatRoleInputInterface => {
    const validateNewCombatRole = this.combatRoleSchema.validateSync(this._combatRole, this._defaultYupOptions);

    return validateNewCombatRole;
  };

  update = (): combatRoleInputInterface => {
    const validatedCombatRole = this.combatRoleSchema.validateSync(this._combatRole, this._defaultYupOptions);

    return validatedCombatRole;
  };

  view = (): combatRoleInputInterface => {
    const castedCombatRole = this.combatRoleSchema.cast(this._combatRole, {
      stripUnknown: true,
    });

    return castedCombatRole;
  };
}
1;
