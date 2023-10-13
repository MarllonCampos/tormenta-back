import * as yup from 'yup';

export interface weaponCategoryInputInterface {
  type: string;
}

export default class WeaponCategoryDTO {
  private _weaponCategory: any;
  private weaponCategorySchema = yup.object().shape({
    type: yup
      .string()
      .min(3, 'O campo de nome [type]  deve ter no mínimo 3 caracteres')
      .required('O campo de nome [type] não deve estar vazio'),
  });

  private updateWeaponCategorySchema = yup.object().shape({
    type: yup.string().min(3, 'O campo de nome [type]  deve ter no mínimo 3 caracteres'),
  });

  private _defaultYupOptions = {
    abortEarly: false,
    stripUnknown: true,
  };

  constructor(weaponCategory: any) {
    this._weaponCategory = this.updateWeaponCategorySchema.camelCase().cast(weaponCategory);
  }

  create = (): weaponCategoryInputInterface => {
    const validateNewWeaponCategory = this.weaponCategorySchema.validateSync(
      this._weaponCategory,
      this._defaultYupOptions
    );

    return validateNewWeaponCategory as weaponCategoryInputInterface;
  };

  update = (): weaponCategoryInputInterface => {
    const validatedUpdateWeaponCategory = this.weaponCategorySchema.validateSync(
      this._weaponCategory,
      this._defaultYupOptions
    );
    return validatedUpdateWeaponCategory;
  };

  view = (): yup.InferType<typeof this.weaponCategorySchema> => {
    const castedWeaponCategory = this.weaponCategorySchema.cast(this._weaponCategory, {
      stripUnknown: true,
    });

    return castedWeaponCategory;
  };
}
