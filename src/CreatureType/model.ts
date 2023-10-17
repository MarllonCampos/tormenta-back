import * as yup from 'yup';

export interface creatureTypeInputInterface {
  name: string;
}

export default class CreatureTypeDTO {
  private _creatureType: any;

  private creatureTypeSchema = yup.object().shape({
    name: yup
      .string()
      .min(3, 'O campo de nome [name]  deve ter no mínimo 3 caracteres')
      .required('O campo de nome [name] não deve estar vazio'),
  });

  private updateCreatureTypeSchema = yup.object().shape({
    name: yup.string().min(3, 'O campo de nome [name]  deve ter no mínimo 3 caracteres'),
  });

  private _defaultYupOptions = {
    abortEarly: false,
    stripUnknown: true,
  };

  constructor(creatureType: any) {
    this._creatureType = this.updateCreatureTypeSchema.camelCase().cast(creatureType);
  }

  create = (): creatureTypeInputInterface => {
    const validateNewCreatureType = this.creatureTypeSchema.validateSync(this._creatureType, this._defaultYupOptions);

    return validateNewCreatureType as creatureTypeInputInterface;
  };

  update = (): creatureTypeInputInterface => {
    const validatedCreatureType = this.creatureTypeSchema.validateSync(this._creatureType, this._defaultYupOptions);

    return validatedCreatureType as creatureTypeInputInterface;
  };

  view = (): creatureTypeInputInterface => {
    const castedCreatureType = this.creatureTypeSchema.cast(this._creatureType, {
      stripUnknown: true,
    });

    return castedCreatureType as creatureTypeInputInterface;
  };
}
