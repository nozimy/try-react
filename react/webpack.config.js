var path = require('path');

module.exports = {
  entry: './app/index.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
 
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          presets: ['react', 'es2015']
        }
      }
    ]
  },
  watch: true
};

// webpack.config.js
// if(process.env.NODE_ENV === 'development'){
//   var loaders = ['react-hot','babel']
// } else {
//   var loaders = ['babel']
// }
// module.exports = {
//   devtool: 'eval',
//   entry: './app-client.js',
//   output: {
//     path: __dirname + '/public/dist',
//     filename: 'bundle.js',
//     publicPath: '/dist/'
//   },
//   module: {
//     loaders: [{
//       test: /\.js$/,
//       loaders: loaders,
//       exclude: /node_modules/
//     }]
//   }
// };