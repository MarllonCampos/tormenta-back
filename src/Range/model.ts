import * as yup from 'yup';

export interface rangeInputInterface {
  type: string;
}
export default class RangeDTO {
  private _range: any;
  private rangeSchema = yup.object().shape({
    type: yup
      .string()
      .min(3, 'O campo de tipo [type]  deve ter no mínimo 3 caracteres')
      .required('O campo de tipo [type] não deve estar vazio'),
  });

  private updateRangeSchema = yup.object().shape({
    type: yup.string().min(3, 'O campo de tipo [type]  deve ter no mínimo 3 caracteres'),
  });

  private _defaultYupOptions = {
    abortEarly: false,
    stripUnknown: true,
  };

  constructor(range: any) {
    this._range = this.updateRangeSchema.camelCase().cast(range);
  }

  create = (): rangeInputInterface => {
    const validateNewRange = this.rangeSchema.validateSync(this._range, this._defaultYupOptions);

    return validateNewRange as rangeInputInterface;
  };

  update = (): rangeInputInterface => {
    const validatedUpdateRange = this.rangeSchema.validateSync(this._range, this._defaultYupOptions);
    return validatedUpdateRange;
  };

  view = (): yup.InferType<typeof this.rangeSchema> => {
    const castedRange = this.rangeSchema.cast(this._range, {
      stripUnknown: true,
    });

    return castedRange;
  };
}
