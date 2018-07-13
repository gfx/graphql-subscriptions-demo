"use strict";

const fs = require("fs");
const path = require("path");

const webpack = require("webpack");
const atLoader = require("awesome-typescript-loader");
const WebpackAssetsManifest = require("webpack-assets-manifest");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const production = ["production", "staging"].includes(process.env.NODE_ENV);

const publicDir = "assets";

const config = {
  mode: production ? "production" : "development",
  entry: {
    application: [
      "core-js/shim",
      "./client/application.ts",
    ],
  },

  output: {
    publicPath: `/${publicDir}/`,
    path: `${__dirname}/../public/${publicDir}`,

    filename: production ? "[name]-[chunkhash].js" : "[name].js",
  },

  resolve: {
    modules: [`${__dirname}/../client`, `node_modules`],
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },

  node: {
    __filename: true,
    __dirname: true,
  },

  plugins: [
    new WebpackAssetsManifest({
      writeToDisk: production,
    }),
    new atLoader.CheckerPlugin(),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1, // suppress code splitting
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(?:ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "awesome-typescript-loader",
          options: {
            configFileName: "tsconfig.json",
            useCache: true,
          },
        },
      },
    ],
  },
};

if (production) {
  config.optimization = {
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: true,
        parallel: true,
        uglifyOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
    ],
  };

  config.devtool = "source-map";
} else {
  config.devtool = "cheap-source-map";
}

module.exports = config;
