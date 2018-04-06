#! /usr/local/bin/node

/*
 * HELPERS
 */

function getAllArgsAndWrite() {
  return new Promise((resolve, reject) => {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'argName',
          message: 'Arg Name? (e.g. firstName)',
        },
      ])
      .then(firstAnswers => {
        if (!firstAnswers.argName) {
          writeToFiles();
          resolve();
        } else {
          inquirer
            .prompt([
              {
                type: 'input',
                name: 'argType',
                message: 'Arg Type? (e.g. string, number, Model.Role)',
                default: 'string',
              },
            ])
            .then(secondAnswers => {
              args.push({
                name: firstAnswers.argName,
                type: secondAnswers.argType,
              });
              return getAllArgsAndWrite();
            });
        }
      });
  });
}

function typeToFunctionName(type) {
  const camelCase = typeToModelName(type);
  return `${camelCase[0].toLowerCase()}${camelCase.slice(1)}`;
}

function typeToModelName(type) {
  return type
    .split('_')
    .map(upper => {
      const lower = upper.toLowerCase();
      return `${lower[0].toUpperCase()}${lower.slice(1)}`;
    })
    .join('');
}

function argsToArgsWithTypes(args) {
  return args.map(arg => `${arg.name}: ${arg.type}`).join(', ');
}

function formattedArgsWithCb(cb) {
  let result = '';
  if (args && args.length) {
    result += ', ';
    result += args.map(arg => cb(arg)).join(', ');
  }
  return result;
}

function argsForModel(args) {
  return formattedArgsWithCb(arg => `${arg.name}: ${arg.type}`);
}

function argsForCreator(args) {
  return formattedArgsWithCb(arg => arg.name);
}

function getNewModelTsxText(path) {
  return new Promise((resolve, reject) => {
    let result = '';
    const lineReader = readline.createInterface({
      input: fs.createReadStream(path),
    });

    lineReader.on('line', line => {
      if (line.indexOf('$$CREATE_REDUX_ACTION_SCRIPT_IDENTIFIER$$') !== -1) {
        result += `  | ${typeToModelName(type)}\n`;
        result += `${line}\n`;
      } else {
        result += `${line}\n`;

        if (line.indexOf(`export interface ${typeToModelName(type)}`) !== -1) {
          resolve(result);
        }
      }
    });
  });
}

function writeToFiles() {
  // Type String
  const typesPath = path.join(__dirname, '../src/actions/types.tsx');
  const typeString = `\nexport const ${type}: string = '${type}';`;
  fs.appendFile(typesPath, typeString);

  // Action Model
  const modelPath = path.join(__dirname, '../src/actions/model.tsx');
  const modelString = `\nexport interface ${typeToModelName(
    type,
  )} extends BaseAction { type: '${type}'${argsForModel(args)} };`;
  fs.appendFile(modelPath, modelString, () => {
    // Add Model To Types
    getNewModelTsxText(modelPath).then(newText => {
      fs.writeFile(modelPath, newText, 'utf8', err => {});
    });
  });

  // Type Guard
  const typeGuardPath = path.join(__dirname, '../src/actions/type-guards.tsx');
  const typeGuardString = `\nexport const ${typeToFunctionName(
    type,
  )} = (action: A.Action): action is A.${typeToModelName(
    type,
  )} => action.type === T.${type};`;
  fs.appendFile(typeGuardPath, typeGuardString);

  // Action Creator
  const actionCreatorPath = path.join(__dirname, '../src/actions/creators.tsx');
  const actionCreatorString = `
export const ${typeToFunctionName(type)} = (${argsToArgsWithTypes(
    args,
  )}): A.${typeToModelName(type)} =>
    ({ type: '${type}'${argsForCreator(args)} });
`;
  fs.appendFile(actionCreatorPath, actionCreatorString);
}

// ========= START ==========

const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

let type,
  args = [];

console.log(` ----------------------------------
| HU Action Creator for src |
 ----------------------------------
`);

inquirer
  .prompt([
    {
      type: 'input',
      name: 'type',
      message: 'Action Type? (e.g. UPDATE_USER_FIRST_NAME)',
    },
  ])
  .then(answers => {
    type = answers.type;

    if (!type) {
      console.log(`ERROR: 'Type' cannot be blank!`);
      process.exit();
    }

    console.log(`
 ------------------------------------------
| Arguments (hit 'enter' when you're done) |
 ------------------------------------------
  `);

    getAllArgsAndWrite();
  });
