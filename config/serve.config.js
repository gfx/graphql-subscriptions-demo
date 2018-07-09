const config = require('./webpack.config.js');

module.exports = {
  ...config,
  serve: {
    dev: {
      publicPath: config.output.publicPath,
    },
  }
};
