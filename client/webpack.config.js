module.exports = {
  entry: './app.jsx',
  output: {
    filename: './bundle/bundle.js'
  },
  resolve: {
    modulesDirectories: ['webmodules', 'node_modules', 'bower_components', 'lib'],
    extensions: ['', '.js', '.jsx', '.json']
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        excludes: ['/node_modules/'],
        loaders: ['jsx?harmony']
      }
    ]
  }
};
