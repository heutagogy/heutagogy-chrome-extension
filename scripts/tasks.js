/* eslint-disable */

require('shelljs/global');

var fs = require('fs');

exports.replaceWebpack = () => {
  const replaceTasks = [{
    from: 'webpack/replace/JsonpMainTemplate.runtime.js',
    to: 'node_modules/webpack/lib/JsonpMainTemplate.runtime.js',
  }, {
    from: 'webpack/replace/process-update.js',
    to: 'node_modules/webpack-hot-middleware/process-update.js',
  }];

  replaceTasks.forEach((task) => cp(task.from, task.to));
};

const updateVersionAndCopyManifest = (env, type) => {
  if (!process.env.TRAVIS_BUILD_NUMBER) {
    cp(`chrome/manifest.${env}.json`, `${type}/manifest.json`);
  } else {
    const manifest = require(`../chrome/manifest.${env}.json`);

    manifest.version += `.${process.env.TRAVIS_BUILD_NUMBER}`;

    fs.writeFile(`${type}/manifest.json`, JSON.stringify(manifest, null, 2));
  }
};

exports.copyAssets = (type) => {
  const env = type === 'build' ? 'prod' : type;

  rm('-rf', type);
  mkdir(type);
  updateVersionAndCopyManifest(env, type);
  cp('-R', 'chrome/assets/*', type);
  exec(`pug -O "{ env: '${env}' }" -o ${type} chrome/views/`);
};
