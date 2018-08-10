/* eslint-disable */

const async = require('async');
const fs = require('fs');
const path = require('path');
const colors = require('colors');

const parentDir = path.join(__dirname, './json');
const re = /(?![0-9])(?!_)([a-z-]*)/g;
const i18nObj = {};
let i18nIso;

async.waterfall(
  [
    function(cb) {
      fs.readdir(parentDir, cb);
    },
    function(files, cb) {
      async.eachLimit(
        files,
        10, // Consume 10 max files in parallel.
        (filename, done) => {
          const fileName = filename.match(re)[0];
          const filePath = path.join(parentDir, filename);
          const JsonObj = getJsonObj(filePath);

          // Construct i18n object key and set iso schema
          if (fileName === 'setting') {
            i18nIso = JsonObj.iso;

            for (const val in JsonObj.iso) {
              i18nObj[JsonObj.iso[val]] = { iso: JsonObj.iso[val] };
            }
            return;
          }

          // Set i18n into object by key
          for (const code in i18nIso) {
            let codeCache = code;
            i18nObj[i18nIso[code]][fileName] = {};

            for (const key in JsonObj) {
              for (const trad in JsonObj[key]) {
                // If ie is not specified => return en
                if (codeCache === 'ie' && typeof JsonObj[key][codeCache]) {
                  codeCache = 'en';
                } else if (codeCache === 'be' && typeof JsonObj[key][codeCache]) {
                  // If be is not specified => return nl
                  codeCache = 'nl';
                }

                i18nObj[i18nIso[code]][fileName][key] = JsonObj[key][codeCache];
              }
            }
          }

          done();
        },
        cb,
      );

      //  Write i18n files for the api
      writeI118nFile(i18nObj);
    },
  ],
  err => {
    err && console.trace('err', err);
  },
);

function getJsonObj(_file) {
  try {
    const obj = fs.readFileSync(_file, 'utf8');
    return JSON.parse(obj);
  } catch (err) {
    throw new Error(err);
  }
}

function writeI118nFile(jsonFile) {
  for (const iso in jsonFile) {
    const fileOptions = { flags: 'w', encoding: 'utf8' };
    fs.writeFile(
      path.join(__dirname, `/../../server/lang/${iso}.json`),
      JSON.stringify(jsonFile[iso]),
      fileOptions,
      err => {
        if (err) throw new Error(err);

        console.log('🌍 ', iso.underline.green, 'i18n file created.'.green);
      },
    );
  }
}
