require('shelljs/global'); //eslint-disable-line

console.log('[Webpack Compress]');
console.log('-'.repeat(80)); //eslint-disable-line
exec('webpack --config webpack/compress.config.js --progress --profile --colors');
