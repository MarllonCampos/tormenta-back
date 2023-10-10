import * as yup from 'yup';

export interface weaponInterface {
  name: string;
  price: number;
  damage: string;
  critical: string;
  melee: boolean;
  attack_range: number;
  damage_type: number;
  spaces: number;
  category: number;
  hold_type: number;
  default: boolean;
  img: string | null;
}

export default class WeaponDTO {
  private _weapon: any;
  private weaponSchema = yup.object().shape({
    name: yup
      .string()
      .min(3, 'O campo de nome [name] deve ter no mínimo 3 caracteres')
      .required('O campo de nome [name] não deve estar vazio'),
    price: yup
      .number()
      .min(0)
      .integer('O campo de preço [price] deve ser um inteiro')
      .required('O campo de preço [price] não deve estar vazio'),
    damage: yup.string().required('O campo de dano [damage] não deve estar vazio'),
    critical: yup.string().required('O campo de crítico [critical] não deve estar vazio'),
    melee: yup.boolean().required('O campo de ataque corpo a corpo [melee] não deve estar vazio'),
    attackRange: yup.number().positive().required('O campo de alcance [attackRange] não deve estar vazio'),
    damageType: yup.number().positive().required('O campo de tipo de dano [damageType] não deve estar vazio'),
    spaces: yup.number().positive().required('O campo de quantidade de espaços [spaces] não deve estar vazio'),
    category: yup.number().positive().required('O campo de categoria da arma [category] não deve estar vazio'),
    holdType: yup.number().positive().required('O campo de empunhadura [holdType] não deve estar vazio'),
    default: yup.boolean().required('O campo de arma padrão [default] não deve estar vazio'),
    img: yup.string().nullable(),
  });

  constructor(weapon: any) {
    this._weapon = yup.object().camelCase().cast(weapon);
  }

  public get weapon(): weaponInterface {
    return this._weapon;
  }

  create = () => {
    const validatedNewWeapon = this.weaponSchema.snakeCase().validateSync(this._weapon, {
      abortEarly: false,
      strict: true,
      stripUnknown: true,
    });

    this._weapon = yup.object().snakeCase().cast(validatedNewWeapon);
  };

  update = () => {
    const updateSchema = yup.object().shape({
      name: yup.string().min(3, 'O campo de nome [name] deve ter no mínimo 3 caracteres'),
      price: yup.number().min(0).integer('O campo de preço [price] deve ser um inteiro'),
      damage: yup.string(),
      critical: yup.string(),
      melee: yup.boolean(),
      attackRange: yup.number().positive(),
      damageType: yup.number().positive(),
      spaces: yup.number().positive(),
      category: yup.number().positive(),
      holdType: yup.number().positive(),
      default: yup.boolean(),
      img: yup.string().nullable(),
    });
    const validatedUpdateWeapon = updateSchema.validateSync(this._weapon, {
      abortEarly: false,
      stripUnknown: true,
      strict: true,
    });
    this._weapon = yup.object().snakeCase().cast(validatedUpdateWeapon);
  };

  view = () => {
    const castedWeapon = this.weaponSchema.cast(this._weapon, {
      stripUnknown: true,
    });
    this._weapon = castedWeapon;
  };
}
