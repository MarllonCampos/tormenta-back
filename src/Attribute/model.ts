import * as yup from 'yup';

export interface attributeInputInterface {
  name: string;
}

export default class AttributeDTO {
  private _attribute: any;

  private attributeSchema = yup.object().shape({
    name: yup
      .string()
      .min(3, 'O campo de nome [name] deve ter no mínimo 3 caracteres')
      .required('O campo de nome [name] não deve estar vazio'),
  });

  private updateAttributeSchema = yup.object().shape({
    name: yup.string().min(3, 'O campo de nome [name] deve ter no mínimo 3 caracteres'),
  });

  private _defaultYupOptions = {
    abortEarly: false,
    stripUnknown: true,
  };

  constructor(attribute: any) {
    this._attribute = this.updateAttributeSchema.camelCase().cast(attribute);
  }

  create = (): attributeInputInterface => {
    const validateNewAttribute = this.attributeSchema.validateSync(this._attribute, this._defaultYupOptions);

    return validateNewAttribute as attributeInputInterface;
  };

  update = (): attributeInputInterface => {
    const validatedAttribute = this.attributeSchema.validateSync(this._attribute, this._defaultYupOptions);

    return validatedAttribute as attributeInputInterface;
  };

  view = (): attributeInputInterface => {
    const castedAttribute = this.attributeSchema.cast(this._attribute, {
      stripUnknown: true,
    });

    return castedAttribute as attributeInputInterface;
  };
}
