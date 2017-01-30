const Crx = require("crx-webpack-plugin");  //eslint-disable-line
const path = require('path'); //eslint-disable-line
const customPath = path.join(__dirname, './customPublicPath');

module.exports = {  //eslint-disable-line
  entry: {
    dummy: [customPath, path.join(__dirname, '../chrome/manifest.prod.json')],
  },
  output: {
    path: path.join(__dirname, '../dev'),
    filename: '[name].js',
  },
  plugins: [
    new Crx({
      contentPath: '../build',
      keyFile: '../key.pem',
      name: 'heutagogy',
      outputPath: '../dist',
      updateFilename: 'updates.xml',
      updateUrl: 'http://heutagogy.s3.amazonaws.com/heutagogy-chrome-extension/',
    }),
  ],
};
