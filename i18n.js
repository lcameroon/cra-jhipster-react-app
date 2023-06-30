const fs = require('fs');
const fromPath = './src/i18n';
const toPath = './public/i18n';

//
// loading /i18n/{lang}/*.json files
//
fs.readdirSync(`${fromPath}`).forEach(lang => {
  let src = {};
  fs.readdirSync(`${fromPath}/${lang}`).forEach(file => {
    if (file.match(/\.json$/) !== null) {
      const rawJson = require(`${fromPath}/${lang}/${file}`);
      src = {
        ...src,
        ...rawJson,
      };
    }
  });
  //
  // saving `/i18n/{lang}.json` file
  //
  const i18nFile = `${toPath}/${lang}.json`;
  fs.writeFile(i18nFile, JSON.stringify(src), { flat: 'w' }, err => {
    if (err) {
      return console.log(err);
    }
    console.log(`\nWriting i18n file to '${i18nFile}'`);
  });
});
