const path = require('path'); //eslint-disable-line
const webpack = require('webpack'); //eslint-disable-line

const host = 'localhost';
const port = 3000;
const customPath = path.join(__dirname, './customPublicPath');
const hotScript = 'webpack-hot-middleware/client?path=__webpack_hmr&dynamicPublicPath=true';
const autoprefixer = require('autoprefixer'); // eslint-disable-line
const StyleLintPlugin = require('stylelint-webpack-plugin'); //eslint-disable-line

const baseDevConfig = () => ({
  devtool: 'eval-cheap-module-source-map',
  entry: {
    app: [customPath, hotScript, path.join(__dirname, '../chrome/extension/app')],
    background: [customPath, hotScript, path.join(__dirname, '../chrome/extension/background')],
    options: [customPath, hotScript, path.join(__dirname, '../chrome/extension/options')],
  },
  devMiddleware: {
    publicPath: `http://${host}:${port}/js`,
    stats: {
      colors: true,
    },
    noInfo: true,
  },
  hotMiddleware: {
    path: '/js/__webpack_hmr',
  },
  output: {
    path: path.join(__dirname, '../dev/js'),
    filename: '[name].bundle.js',
    chunkFilename: '[id].chunk.js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.IgnorePlugin(/[^/]+\/[\S]+.prod$/),
    new webpack.ProvidePlugin({
      React: 'react',
    }),
    new webpack.DefinePlugin({
      __HOST__: `'${host}'`,
      __PORT__: port,
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
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
    new StyleLintPlugin({
      configFile: '.stylelintrc',
      context: './app/',
      files: '**/*.?(less|css)',
      failOnError: false,
    }),
  ],
  resolve: {
    extensions: ['*', '.js'],
  },
  module: {
    loaders: [
      {
        test: /\.png/,
        loader: 'url-loader',
        query: {
          limit: 26000,
          mimetype: 'image/png',
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
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['react-hmre'],
        },
      },
      {
        test: /\.css$/,
        loaders: [
          'style',
          'css?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
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
});

const appConfig = baseDevConfig();

module.exports = [ appConfig ]; //eslint-disable-line
