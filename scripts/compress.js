const tasks = require('./tasks'); //eslint-disable-line

tasks.replaceWebpack();
console.log('[Copy assets]');
console.log('-'.repeat(80)); //eslint-disable-line
tasks.copyAssets('build');

console.log('[Webpack Compress]');
console.log('-'.repeat(80)); //eslint-disable-line
exec('webpack --config webpack/compress.config.js --progress --profile --colors');
