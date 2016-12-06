// for babel-plugin-webpack-loaders
import config from './prod.config';
import ONE from '../app/constants/Constants';

module.exports = { //eslint-disable-line
  output: {
    libraryTarget: 'commonjs2',
  },
  module: {
    loaders: config.module.loaders.slice(ONE),  // remove babel-loader
  },
};
