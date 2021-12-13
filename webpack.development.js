const path = require("path");

module.exports = {
  // https://webpack.js.org/guides/development/#using-source-maps
  // TLDR: Maps compiled code back to the original source code to easily track where an error occured
  devtool: "inline-source-map",
  devServer: {
    static: path.join(__dirname, "dist"),
    port: 8080,
    liveReload: true,
  }
};
