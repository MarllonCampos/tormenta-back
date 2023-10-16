export interface IErrorConstructor {
  message: string;
  errors?: string[];
  status?: number;
}

export default class DefaultErrors extends Error {
  errors: string[] = [];
  status: number = 400;

  constructor({ message, errors = [], status = 400 }: IErrorConstructor) {
    super(message);
    this.errors = errors;
    this.status = status;
    Object.setPrototypeOf(this, DefaultErrors.prototype);
  }

  static ValidationErrors(errors: string[] = []): DefaultErrors {
    return new DefaultErrors({ message: 'Houve um erro com a validação dos dados', errors });
  }

  static DefaultErrorMessage(errors: string[] = []): DefaultErrors {
    return new DefaultErrors({ message: 'Existem erros a serem corrigidos, verifique e corrija-os', errors });
  }
  static NoFieldsToUpdate(): DefaultErrors {
    return new DefaultErrors({ message: 'Não há campos a serem alterados' });
  }

  static IdMustBeAnumber(): DefaultErrors {
    return new DefaultErrors({ message: 'O parametro da rota deve ser um número inteiro' });
  }
}
