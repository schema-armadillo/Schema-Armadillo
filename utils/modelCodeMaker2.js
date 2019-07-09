// INPUT: an object with schemaName (str) and an array of rows
// OUTPUT: big-ass string, to be formatted, of the formatted file name
const modelCodeMaker = newSchemaData => {
  // exports and imports needed for any schema file
  const openingText =
    "const mongoose = require('mongoose');\nconst { Schema } = mongoose;\n\n";
  let closingText = 'module.exports = mongoose.model';

  // pull schema data into two vars
  const { schemaName, rows } = newSchemaData;
  const schemaVarName = `${schemaName.toLowerCase()}Schema`;
  // makes the variable name e.g. 'userSchema'
  let schemaBody = `const ${schemaVarName} = new Schema({${'\n'}`;

  // init whitespace tab
  const tab = '  ';
  // iterate through rows array, which has objects. each object has two key value pairs: key, type. if options are checked, there will be an options object
  for (let i = 0; i < rows.length; i += 1) {
    schemaBody += `${tab}${rows[i].key}: `;
    // check boolean if there are options for this given key
    const areThereOptions = !!rows[i].options;

    // if so, it's a branch to create a nested object
    if (areThereOptions) {
      schemaBody += `{${'\n'}${tab.repeat(2)}`;
      // do something else
      // console.log(rows[i].type);
      schemaBody += `type: ${rows[i].type},${'\n'}`;
      for (option in rows[i].options) {
        // console.log(option);
        // console.log(rows[i].options[option]);
        schemaBody += `${tab.repeat(2) + option}: ${
          rows[i].options[option]
          },${'\n'}`;
      }
      // loop
      schemaBody += `${tab.repeat(1)}},${'\n'}`;
    } else {
      // just adds the type after the key value paid, e.g. username: String
      // console.log(rows[i].type);
      schemaBody += `${rows[i].type},`;
      schemaBody += '\n';
    }
  }
  // once done with making model, add closing tags;
  schemaBody += '});\n\n';

  // add proper export names to closing text
  closingText += `('${schemaName.slice(0, 1).toUpperCase()}${schemaName.slice(1).toLowerCase()}', ${schemaVarName});`;

  return openingText + schemaBody + closingText;
};

// const testUser = {
//   schemaName: 'User',
//   rows: [
//     {
//       key: 'username',
//       type: 'String',
//       options: {
//         unique: 'true'
//       }
//     },
//     {
//       key: 'firstName',
//       type: 'String'
//     },
//     {
//       key: 'username',
//       type: 'String',
//       options: {
//         unique: 'true'
//       }
//     },
//     {
//       key: 'username',
//       type: 'String',
//       options: {
//         unique: 'true'
//       }
//     },
//     {
//       key: 'firstName',
//       type: 'String'
//     }
//   ]
// };

// const testUser2 = {
//   schemaName: 'Student',
//   rows: [
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

// console.log(modelCodeMaker(testUser));

module.exports = modelCodeMaker;
// console.log(modelCodeMaker(testUser2));
