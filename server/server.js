var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('../client/webpack.config');

var PORT = process.env.NODE_PORT || 3000;

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  watch: true,
  hot: true,
  historyApiFallback: true
}).listen(PORT, 'localhost', function (err, result) {
  if (err) {
    console.error(err);
  }

  console.log('Listening at localhost:' + PORT);
});
