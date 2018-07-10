const config = require('./webpack.config.js');

module.exports = {
  ...config,
  serve: {
    port: 3808,
    dev: {
      publicPath: config.output.publicPath,
    },
  }
};
