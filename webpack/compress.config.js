var Crx = require("crx-webpack-plugin");  //eslint-disable-line

module.exports = {  //eslint-disable-line
  output: {
    path: __dirname,
    filename: '[name].crx',
  },
  plugins: [
    new Crx({
      contentPath: '../build',
      keyFile: '../key.pem',
      name: 'heutagogy',
      outputPath: '../dist',
      updateFilename: 'updates.xml',
      updateUrl: 'http://localhost:8000/',
    }),
  ],
};
