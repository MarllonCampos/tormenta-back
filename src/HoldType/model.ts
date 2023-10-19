import * as yup from 'yup';

export interface holdTypeInputInterface {
  type: string;
}
export default class HoldTypeDTO {
  private _holdType: any;
  private holdTypeSchema = yup.object().shape({
    type: yup
      .string()
      .min(3, 'O campo de tipo [type]  deve ter no mínimo 3 caracteres')
      .required('O campo de tipo [type] não deve estar vazio'),
  });

  private updateHoldTypeSchema = yup.object().shape({
    type: yup.string().min(3, 'O campo de tipo [type]  deve ter no mínimo 3 caracteres'),
  });

  private _defaultYupOptions = {
    abortEarly: false,
    stripUnknown: true,
  };

  constructor(holdType: any) {
    this._holdType = this.updateHoldTypeSchema.camelCase().cast(holdType);
  }

  create = (): holdTypeInputInterface => {
    const validateNewHoldType = this.holdTypeSchema.validateSync(this._holdType, this._defaultYupOptions);

    return validateNewHoldType as holdTypeInputInterface;
  };

  update = (): holdTypeInputInterface => {
    const validatedUpdateHoldType = this.holdTypeSchema.validateSync(this._holdType, this._defaultYupOptions);
    return validatedUpdateHoldType;
  };

  view = (): yup.InferType<typeof this.holdTypeSchema> => {
    const castedHoldType = this.holdTypeSchema.cast(this._holdType, {
      stripUnknown: true,
    });

    return castedHoldType;
  };
}
