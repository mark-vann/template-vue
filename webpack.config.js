/* eslint-disable */
const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');

const DEV_MODE = process.env.NODE_ENV === 'development';
const colorFunc = DEV_MODE ? chalk.green : chalk.blue;
console.log(colorFunc(`webpack.DEV_MODE = ${DEV_MODE}, process.env.NODE_ENV = ${process.env.NODE_ENV}`));

const config = {
  context: path.join(__dirname, '/src'),
  entry: {
    app: ['./app.js'],
    // vendor: ['device'],
  },
  output: {
    filename: 'asset/js/[name].js?[hash]',
    chunkFilename: 'asset/js/[name].js?[hash]',
    path: path.resolve(__dirname, './dist'),
    publicPath: '',
  },
  resolveLoader: {
    moduleExtensions: ['-loader'],
  },
  resolve: {
    alias: {
      // device: path.resolve('./src/lib/device.min'),
    },
    modules: [
      path.resolve('./src'),
      path.resolve('./src/js'),
      path.resolve('./src/vue'),
      path.resolve('./src/css'),
      path.resolve('./src/html'),
      path.resolve('./src/img'),
      path.resolve('./node_modules'),
    ],
    extensions: ['.js', '.styl', '.pug', '.vue']
  },
  devServer: {
    historyApiFallback: false,
    noInfo: true,
    hot: true,
    inline: true,
    contentBase: './',
    // https://webpack.js.org/configuration/stats/
    stats: {
      colors: true,
      hash: false, // add the hash of the compilation
      version: false, // add webpack version information
      timings: true, // add timing information
      assets: true, // add assets information
      chunks: false, // add chunk information
      chunkModules: false, // add built modules information to chunk information
      modules: false, // add built modules information
      cached: false, // add also information about cached (not built) modules
      reasons: false, // add information about the reasons why modules are included
      source: false, // add the source code of modules
      error: true,
      errorDetails: true, // add details to errors (like resolving log)
      chunkOrigins: false // add the origins of chunks and chunk merging info
    },
    host: '0.0.0.0',
    disableHostCheck: true,
  },
};

config.module = {
  // noParse: /device\.min/,
  rules: [{
    test: /\.vue$/,
    use: [{
      loader: 'vue',
      options: {
        postcss: [
          require('autoprefixer')({
            browsers: ['last 3 version', 'ie >= 10', 'iOS >= 8', 'Safari >= 8']
          }),
          require('cssnano')({
            zindex: false,
            calc: false,
            reduceIdents: false,
          }),
        ],
      }
    }],
    include: path.resolve('src/vue'),
    exclude: /node_modules/,
  }, {
    test: /\.js$/,
    use: [{
      loader: 'babel',
    }],
    include: [
      path.resolve('src'),
      path.resolve('src/js'),
    ],
    exclude: /node_modules/,
  }, {
    test: /\.(jpg|png|gif|svg|ico)$/,
    use: [{
      loader: 'url',
      options: {
        limit: 8,
        name: 'asset/[path][name].[ext]?[hash:8]'
      }
    }],
    include: path.resolve('src/img'),
    exclude: /node_modules/,
  }, {
    test: /\.pug$/,
    use: [{
      loader: 'pug',
      options: {
        self: true,
        pretty: DEV_MODE,
      }
    }],
    include: path.resolve('src/html'),
    exclude: /node_modules/,
  }],
};

const moment = require('moment');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
config.plugins = [
  // new webpack.optimize.CommonsChunkPlugin({
  //   name: 'vendor',
  // }),
  new CopyWebpackPlugin([{
    from: 'asset/',
    to: './asset/',
  }], {
    copyUnmodified: true,
  }),
  new HtmlWebpackPlugin({
    minify: false,
    xhtml: true,
    // favicon: 'asset/favicon.ico',
    template: './html/index.pug',
    data: {
      DEV_MODE,
      TIME: moment().format('YYYY/MM/DD-HH:mm:ss'),
      HASH: moment().format('YYYYMMDDHHmmss'),
    }
  }),
  new ScriptExtHtmlWebpackPlugin({
    defaultAttribute: 'defer',
  }),
  new webpack.DefinePlugin({
    __DEV__: DEV_MODE,
    'process.env.NODE_ENV': DEV_MODE ? '"development"' : '"production"',
  }),
  ...DEV_MODE ? [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsWebpackPlugin(),
  ] : [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false,
      },
    })
  ]
];

config.externals = {
  vue: 'Vue',
  vuex: 'Vuex',
};

module.exports = config;