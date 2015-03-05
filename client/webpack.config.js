var webpack = require('webpack');
var PORT = process.env.NODE_PORT || 3000;

module.exports = {
  devtool: 'eval',

  entry: [
    'webpack-dev-server/client?http://localhost:' + PORT,
    'webpack/hot/only-dev-server',
    './client/app.jsx'
  ],

  output: {
    path: __dirname + '/bundle/',
    filename: 'bundle.js',
    publicPath: '/bundle/'
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],

  resolve: {
    modulesDirectories: ['webmodules', 'node_modules', 'bower_components', 'lib'],
    extensions: ['', '.js', '.jsx', '.json']
  },

  module: {
    loaders: [
      {
        test: /\.jsx$/,
        excludes: ['/node_modules/'],
        loaders: ['react-hot', 'jsx?harmony']
      }
    ]
  }
};
