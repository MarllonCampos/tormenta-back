import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';
const options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'Tormenta Backend',
      version: '0.1.0',
      description: 'Um backend criado com NodeJS e Express que retorna os dados no formato de JSON',
      contact: {
        name: 'Marllon Campos',
        email: 'marllondcsp@gmail.com',
      },
    },
  },
  apis: [path.join('docs', 'shared', '*.yaml'), path.join('docs', '**.yaml')],
};

const swaggerSpecs = swaggerJSDoc(options);

export default swaggerSpecs;
