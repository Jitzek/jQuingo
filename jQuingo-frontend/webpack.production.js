const common = require("./webpack.config.js");
const { merge } = require("webpack-merge");
process.env.NODE_ENV = "production";

module.exports = merge(common, {
});
