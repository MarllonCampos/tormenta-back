import * as yup from 'yup';

export interface masteryInputInterface {
  type: string;
  trained?: boolean;
  armor_penailty?: boolean;
}

export default class MasteryDTO {
  private _mastery: any;

  private masterySchema = yup.object().shape({
    type: yup
      .string()
      .min(3, 'O campo de tipo [type]  deve ter no mínimo 3 caracteres')
      .required('O campo de tipo [type] não deve estar vazio'),
    trained: yup.boolean().typeError('O campo de treinado [trained] deve ser true ou false, 0 ou 1'),
    armorPenalty: yup
      .boolean()
      .typeError('O campo de penalidade de armadura [armor_penalty] deve ser true ou false, 0 ou 1'),
  });

  private updateMasterySchema = yup.object().shape({
    type: yup.string().min(3, 'O campo de tipo [type]  deve ter no mínimo 3 caracteres'),
    trained: yup.boolean().typeError('O campo de treinado [trained] deve ser true ou false, 0 ou 1'),
    armorPenalty: yup
      .boolean()
      .typeError('O campo de penalidade de armadura [armor_penalty] deve ser true ou false, 0 ou 1'),
  });

  private _defaultYupOptions = {
    abortEarly: false,
    stripUnknown: true,
  };

  constructor(mastery: any) {
    this._mastery = this.updateMasterySchema.camelCase().cast(mastery);
  }

  create = (): masteryInputInterface => {
    const validateNewMastery = this.masterySchema.validateSync(this._mastery, this._defaultYupOptions);

    const castedValidatedNewMastery = yup.object().snakeCase().cast(validateNewMastery) as masteryInputInterface;

    return castedValidatedNewMastery;
  };

  update = (): masteryInputInterface => {
    const validatedMastery = this.masterySchema.validateSync(this._mastery, this._defaultYupOptions);

    const normalizedMastery = yup.object().snakeCase().cast(validatedMastery) as masteryInputInterface;

    return normalizedMastery;
  };

  view = (): masteryInputInterface => {
    const castedMastery = this.masterySchema.cast(this._mastery, {
      stripUnknown: true,
    });

    return castedMastery as masteryInputInterface;
  };
}
