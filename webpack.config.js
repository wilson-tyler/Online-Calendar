const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: '/src/index.js',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'index.bundle.js',
    publicPath: '/dist'
  },
  mode: process.env.NODE_ENV,
  devServer: {
    static: {
      directory: path.resolve(__dirname, '/dist'),
      publicPath: '/dist'
    },
    port: 5050,
    proxy: {
      '/**': {
        target: 'http://localhost:3000/',
        secure: false,
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.png|svg|jpg|gif$/,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
      template: 'index.html',
      inject: false
    })
  ]
}