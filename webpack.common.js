const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    components: './src/components/index.ts'
  },
  plugins: [    
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({     
      template: './src/index.html'
    }),
    new CopyWebpackPlugin([
    ]),
  ], 
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist_new'),
  },  
  optimization: {
    splitChunks: {
        chunks: 'all',
    },
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  module: {
    rules: [      
        {
          test: /\.tsx?$/,
          loader: "ts-loader",
          exclude: /node_modules/,
          options: {
            configFile: "tsconfig.json"
          }
        },
    ],
  },
};