const tasks = require('./tasks'); //eslint-disable-line
const createWebpackServer = require('webpack-httpolyglot-server'); //eslint-disable-line
const devConfig = require('../webpack/dev.config'); //eslint-disable-line

tasks.replaceWebpack();
console.log('[Copy assets]');
console.log('-'.repeat(80)); //eslint-disable-line
tasks.copyAssets('dev');

console.log('[Webpack Dev]');
console.log('-'.repeat(80)); //eslint-disable-line
console.log('If you\'re developing Inject page,');
console.log('please allow `https://localhost:3000` connections in Google Chrome,');
console.log('and load unpacked extensions with `./dev` folder. (see https://developer.chrome.com/extensions/getstarted#unpacked)\n');
createWebpackServer(devConfig, {
  host: 'localhost',
  port: 3000 //eslint-disable-line
});
