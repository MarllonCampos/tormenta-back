// import { NodePlopAPI } from 'plop';
module.exports = (plop) => {
  plop.setHelper('lowerCaseNoSpaces', function (text) {
    return text.toLowerCase().replace(/\s/gi, '');
  });

  plop.setGenerator('object', {
    description: 'Create everything for a new Route',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Enter new Route Name',
      },
    ],
    actions: (data) => {
      let defaultPath = '../src/{{pascalCase name}}';
      return [
        // Route
        {
          type: 'add',
          path: `${defaultPath}/{{camelCase name}}.route.ts`,
          templateFile: '../plop-templates/routes.ts.hbs',
        },
        // Model
        {
          type: 'add',
          path: `${defaultPath}/model.ts`,
          templateFile: '../plop-templates/model.ts.hbs',
        },
        // Service
        {
          type: 'add',
          path: `${defaultPath}/service.ts`,
          templateFile: '../plop-templates/service.ts.hbs',
        },
        // Controller
        {
          type: 'add',
          path: `${defaultPath}/controller.ts`,
          templateFile: '../plop-templates/controller.ts.hbs',
        },
        // Error
        {
          type: 'add',
          path: `${defaultPath}/errors.ts`,
          templateFile: '../plop-templates/errors.ts.hbs',
        },
      ];
    },
  });
};
