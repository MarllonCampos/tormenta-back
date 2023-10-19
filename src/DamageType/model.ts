import * as yup from 'yup';

export interface damageTypeInputInterface {
  type: string;
}

export default class DamageTypeDTO {
  private _damageType: any;
  private damageTypeSchema = yup.object().shape({
    type: yup
      .string()
      .min(3, 'O campo de tipo [type]  deve ter no mínimo 3 caracteres')
      .required('O campo de tipo [type] não deve estar vazio'),
  });

  private updateDamageTypeSchema = yup.object().shape({
    type: yup.string().min(3, 'O campo de tipo [type]  deve ter no mínimo 3 caracteres'),
  });

  private _defaultYupOptions = {
    abortEarly: false,
    stripUnknown: true,
  };

  constructor(damageType: any) {
    this._damageType = this.updateDamageTypeSchema.camelCase().cast(damageType);
  }

  create = (): damageTypeInputInterface => {
    const validateDamageType = this.damageTypeSchema.validateSync(this._damageType, this._defaultYupOptions);

    return validateDamageType as damageTypeInputInterface;
  };

  update = (): damageTypeInputInterface => {
    const validatedDamageType = this.damageTypeSchema.validateSync(this._damageType, this._defaultYupOptions);
    return validatedDamageType;
  };

  view = (): yup.InferType<typeof this.damageTypeSchema> => {
    const castedDamageType = this.damageTypeSchema.cast(this._damageType, {
      stripUnknown: true,
    });

    return castedDamageType;
  };
}
