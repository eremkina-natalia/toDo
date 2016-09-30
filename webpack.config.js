var path = require('path')
var webpack = require('webpack')
//добавьте новую зависимость в начале конфига

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    'babel-polyfill',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),

  ],
  module: {
    preLoaders: [ //добавили ESlint в preloaders
     {
       test: /\.js$/,
       loaders: ['eslint'],
       include: [
         path.resolve(__dirname, "src"),
       ],
     }
   ],
    loaders: [
      {
        loaders: [ 'babel-loader'], //добавили loader 'react-hot'
        include: [
          path.resolve(__dirname, "src"),
        ],
        test: /\.js$/,
        plugins: ['transform-runtime'],
      }
    ]
  }
}