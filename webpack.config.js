const webpack = require('webpack');
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
              loader: 'babel-loader',
              options: {
                  presets: [['@babel/preset-env',{ targets: "defaults" }], ['@babel/preset-react',{runtime:"automatic"}]]
                  }
          }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(glb|gltf)$/,
        type: 'asset/resource', //https://webpack.js.org/guides/asset-modules/
        }
    ],
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  devServer: {
    port: 3000,
    open:true,
  },
  plugins: [
      new HTMLWebpackPlugin({
          template: './public/index.html'
      })
  ]
};