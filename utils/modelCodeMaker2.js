// exports and imports needed for any schema file
const openingText = 'const mongoose = require(\'mongoose\');\nconst { Schema } = mongoose;\n\n';
let closingText = 'module.exports = mongoose.model';

// INPUT: an object with schemaName (str) and an array of Keys
// OUTPUT: big-ass string, to be formatted, of the formatted file name
const modelCodeMaker = (newSchemaData) => {
  // pull schema data into two vars
  const { schemaName, keys } = newSchemaData;
  const schemaVarName = `${schemaName.toLowerCase()}Schema`;
  // makes the variable name e.g. 'userSchema'
  let schemaBody = `const ${schemaVarName} = new Schema({${'\n'}`;

  // init whitespace tab
  const tab = '  ';
  // iterate through keys array, which has objects. each object has two key value pairs: key, type. if options are checked, there will be an options object
  for (let i = 0; i < keys.length; i += 1) {
    schemaBody += `${tab}${keys[i].key}: `;
    // check boolean if there are options for this given key
    const areThereOptions = !!keys[i].options;

    // if so, it's a branch to create a nested object
    if (areThereOptions) {
      schemaBody += `{${'\n'}${tab.repeat(2)}`;
      // do something else
      // console.log(keys[i].type);
      schemaBody += `type: ${keys[i].type},${'\n'}`;
      for (option in keys[i].options) {
        // console.log(option);
        // console.log(keys[i].options[option]);
        schemaBody += `${tab.repeat(2) + option}: ${keys[i].options[option]},${'\n'}`;
      }
      // loop
      schemaBody += `${tab.repeat(1)}},${'\n'}`;
    } else {
      // just adds the type after the key value paid, e.g. username: String
      // console.log(keys[i].type);
      schemaBody += `${keys[i].type},`;
      schemaBody += '\n';
    }
  }
  // once done with making model, add closing tags;
  schemaBody += '});\n\n';

  // add proper export names to closing text
  closingText += `('${schemaName}', ${schemaVarName});`;

  return openingText + schemaBody + closingText;
};


const testUser = {
  schemaName: 'User',
  keys: [
    {
      key: 'username',
      type: 'String',
      options: {
        unique: 'true',
      },
    },
    {
      key: 'firstName',
      type: 'String',
    },
    {
      key: 'username',
      type: 'String',
      options: {
        unique: 'true',
      },
    },
    {
      key: 'username',
      type: 'String',
      options: {
        unique: 'true',
      },
    },
    {
      key: 'firstName',
      type: 'String',
    },
  ],
};

// const testUser2 = {
//   schemaName: 'Student',
//   keys: [
//     {
//       key: 'firstName',
//       type: 'String',
//     },
//     {
//       key: 'firstName',
//       type: 'String',
//     },
//     {
//       key: 'firstName',
//       type: 'String',
//     },
//     {
//       key: 'firstName',
//       type: 'String',
//     },
//     {
//       key: 'firstName',
//       type: 'String',
//     },
//     {
//       key: 'firstName',
//       type: 'String',
//     },
//     {
//       key: 'firstName',
//       type: 'String',
//     },
//     {
//       key: 'firstName',
//       type: 'String',
//     },
//   ],
// };

console.log(modelCodeMaker(testUser));

// console.log(modelCodeMaker(testUser2));
