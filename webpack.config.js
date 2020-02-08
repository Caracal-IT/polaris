const webpack = require('webpack');
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackMerge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const modeConfig = env => require(`./build-utils/webpack.${env.mode}.js`)(env);
const loadPresets = require('./build-utils/loadPresets');

const webcomponentsjs = './node_modules/@webcomponents/webcomponentsjs';

const polyfills = [
  {
    from: resolve(`${webcomponentsjs}/webcomponents-*.{js,map}`),
    to: 'vendor',
    flatten: true
  },
  {
    from: resolve(`${webcomponentsjs}/bundles/*.{js,map}`),
    to: 'vendor/bundles',
    flatten: true
  },
  {
    from: resolve(`${webcomponentsjs}/custom-elements-es5-adapter.js`),
    to: 'vendor',
    flatten: true
  }
];

const assets = [
  {
    from: 'src/img',
    to: 'img/'
  },
  {
    from: 'src/wf',
    to: 'wf/'
  }
];

const plugins = [
  new CleanWebpackPlugin(),
  new webpack.ProgressPlugin(),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: './src/index.html',
    minify: {
      minifyCSS: true,
      minifyJS: true,

      collapseWhitespace: true,
      removeComments: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      useShortDoctype: true
    }
  }),
  new CopyWebpackPlugin([...polyfills, ...assets], {
    ignore: ['.DS_Store']
  })
];

module.exports = ({ mode, presets }) => {
  return webpackMerge(
    {
      mode,
      output: {
        filename: '[name].[chunkhash:8].js'
      },
      entry: "./src/index.ts",
      resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
      },
      module: {
        rules: [
          {
            test: /\.(js|jsx|tsx|ts)$/,
            exclude: /node_modules/,
            loader: 'ts-loader',
          }
        ]
      },
      plugins,
      devServer: {
          contentBase: resolve(__dirname, 'public'),
          compress: false,
          port: 3000
      }
    },
    modeConfig({ mode, presets }),
    loadPresets({ mode, presets })
  );
};