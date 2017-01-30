const path = require('path'); //eslint-disable-line
const webpack = require('webpack'); //eslint-disable-line

const customPath = path.join(__dirname, './customPublicPath');
const autoprefixer = require('autoprefixer'); // eslint-disable-line

module.exports = { //eslint-disable-line
  entry: {
    app: [customPath, path.join(__dirname, '../chrome/extension/app')],
    background: [customPath, path.join(__dirname, '../chrome/extension/background')],
    options: [customPath, path.join(__dirname, '../chrome/extension/options')],
  },
  output: {
    path: path.join(__dirname, '../build/js'),
    filename: '[name].bundle.js',
    chunkFilename: '[id].chunk.js',
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.IgnorePlugin(/[^/]+\/[\S]+.dev$/),
    new webpack.ProvidePlugin({
      React: 'react',
    }),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compressor: {
        warnings: false,
      },
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.LoaderOptionsPlugin({
      test: /\.less$/,
      options: {
        postcss: [
          autoprefixer({
            browsers: [
              'last 3 version',
              'ie >= 10',
            ],
          }),
        ],
      },
    }),
  ],
  resolve: {
    extensions: ['*', '.js'],
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['react-optimize'],
        },
      },
      {
        test: /\.(woff|woff2|ttf|eot)/,
        loader: 'url-loader',
        query: {
          limit: 1,
        },
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.css$/,
        loaders: [
          'style',
          'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss',
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: '[name]__[hash:base64:5]',
            },
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'less-loader',
          },
        ],
      },
    ],
  },
};
