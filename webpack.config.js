var path = require('path');

module.exports = {

  entry: [
    './src/main'
  ],

  output: {
    path: path.join(__dirname, 'target'),
    filename: 'main.js'
  },

  module: {
    loaders: [{
      test: function (filename) {
        if (filename.indexOf('node_modules') !== -1) {
          return false;
        } else {
          return /\.js$/.test(filename) !== -1;
        }
      },
      loaders: ['babel-loader']
    }]
  },

  resolve: {
    modulesDirectories: [path.join(__dirname, 'src'), 'node_modules']
  }

};
