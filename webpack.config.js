const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, './src/index.js'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(glb|gltf)$/,
            use:
            [
                {
                    loader: 'file-loader',
                    options:
                    {
                      name: '[name].[ext]',
                      outputPath: 'assets/'
                    }
                }
            ]
        }
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
    static: path.resolve(__dirname, './dist'),
  },
};