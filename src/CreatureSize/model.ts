import * as yup from 'yup';

export interface creatureSizeInputInterface {
  name: string;
}

export default class CreatureSizeDTO {
  private _creatureSize: any;

  private creatureSizeSchema = yup.object().shape({
    name: yup
      .string()
      .min(3, 'O campo de nome [name] deve ter no mínimo 3 caracteres')
      .required('O campo de nome [name] não deve estar vazio'),
  });

  private updateCreatureSizeSchema = yup.object().shape({
    name: yup.string().min(3, 'O campo de nome [name] deve ter no mínimo 3 caracteres'),
  });

  private _defaultYupOptions = {
    abortEarly: false,
    stripUnknown: true,
  };

  constructor(creatureSize: any) {
    this._creatureSize = this.updateCreatureSizeSchema.camelCase().cast(creatureSize);
  }

  create = (): creatureSizeInputInterface => {
    const validateNewCreatureSize = this.creatureSizeSchema.validateSync(this._creatureSize, this._defaultYupOptions);

    return validateNewCreatureSize as creatureSizeInputInterface;
  };

  update = (): creatureSizeInputInterface => {
    const validatedCreatureSize = this.creatureSizeSchema.validateSync(this._creatureSize, this._defaultYupOptions);

    return validatedCreatureSize as creatureSizeInputInterface;
  };

  view = (): creatureSizeInputInterface => {
    const castedCreatureSize = this.creatureSizeSchema.cast(this._creatureSize, {
      stripUnknown: true,
    });

    return castedCreatureSize as creatureSizeInputInterface;
  };
}
