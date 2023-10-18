import * as yup from 'yup';

export interface traitInputInterface {
  name: string;
}

export default class TraitDTO {
  private _trait: any;

  private traitSchema = yup.object().shape({
    name: yup
      .string()
      .min(3, 'O campo de nome [name]  deve ter no mínimo 3 caracteres')
      .required('O campo de nome [name] não deve estar vazio'),
  });

  private updateTraitSchema = yup.object().shape({
    name: yup.string().min(3, 'O campo de nome [name]  deve ter no mínimo 3 caracteres'),
  });

  private _defaultYupOptions = {
    abortEarly: false,
    stripUnknown: true,
  };

  constructor(trait: any) {
    this._trait = this.updateTraitSchema.camelCase().cast(trait);
  }

  create = (): traitInputInterface => {
    const validateNewTrait = this.traitSchema.validateSync(this._trait, this._defaultYupOptions);

    return validateNewTrait as traitInputInterface;
  };

  update = (): traitInputInterface => {
    const validatedTrait = this.traitSchema.validateSync(this._trait, this._defaultYupOptions);

    return validatedTrait as traitInputInterface;
  };

  view = (): traitInputInterface => {
    const castedTrait = this.traitSchema.cast(this._trait, {
      stripUnknown: true,
    });

    return castedTrait as traitInputInterface;
  };
}
