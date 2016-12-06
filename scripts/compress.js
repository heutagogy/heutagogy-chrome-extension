import TWO from '../app/constants/Constants';

const fs = require('fs'); //eslint-disable-line
const ChromeExtension = require('crx'); //eslint-disable-line
/* eslint import/no-unresolved: 0 */
const name = require('../build/manifest.json').name; //eslint-disable-line
const argv = require('minimist')(process.argv.slice(TWO)); //eslint-disable-line

const keyPath = argv.key || 'key.pem';
const existsKey = fs.existsSync(keyPath); //eslint-disable-line
const crx = new ChromeExtension({
  appId: argv['app-id'],
  codebase: argv.codebase,
  privateKey: existsKey ? fs.readFileSync(keyPath) : null, //eslint-disable-line
});

crx.load('build').
  then(() => crx.loadContents()).
  then((archiveBuffer) => {
    fs.writeFile(`${name}.zip`, archiveBuffer);

    if (!argv.codebase || !existsKey) return;
    crx.pack(archiveBuffer).then((crxBuffer) => {
      const updateXML = crx.generateUpdateXML();

      fs.writeFile('update.xml', updateXML);
      fs.writeFile(`${name}.crx`, crxBuffer);
    });
  });
