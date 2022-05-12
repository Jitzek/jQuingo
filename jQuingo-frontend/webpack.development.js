const path = require("path");
const common = require("./webpack.config.js");
const { merge } = require("webpack-merge");

process.env.NODE_ENV = "development";

module.exports = merge(common, {
  // https://webpack.js.org/guides/development/#using-source-maps
  // TLDR: Maps compiled code back to the original source code to easily track where an error occured
  devtool: "source-map",
  devServer: {
    static: path.join(__dirname, "dist"),
    port: 8080,
    liveReload: true,
  }
});
