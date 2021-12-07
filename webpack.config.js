const path = require("path");

const mode = process.env.NODE_ENV || "development";

// Automatically creates the index.html file with all it's bundles
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: mode,
  entry: {
    index: "./src/index.ts",
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Routing",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        include: path.resolve(__dirname, 'src')
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
        include: path.resolve(__dirname, 'static', 'css')
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        include: path.resolve(__dirname, 'static', 'img')
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        include: path.resolve(__dirname, 'static', 'fonts')
      }
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  // https://webpack.js.org/guides/development/#using-source-maps
  // TLDR: Maps compiled code back to the original source code to easily track where an error occured
  devtool: "inline-source-map",
  devServer: {
    static: path.join(__dirname, "dist"),
    port: 8080,
    liveReload: true,
  },
  optimization: {
    // 'deterministic': Short numeric ids which will not change between compilations. (Good for long term caching)
    moduleIds: "deterministic",
    runtimeChunk: "single",
    // Extract third-party libraries to seperate chunk as they are unlikely to change
    // Caching them will allow clients to request less from the server
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        }
      }
    }
  },
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, 'src'),
      '@jquingo': path.resolve(__dirname, 'src', 'jquingo'),
      '@components': path.resolve(__dirname, 'src', 'components'),
      '@routes': path.resolve(__dirname, 'src', 'routes'),
      '@css': path.resolve(__dirname, 'static', 'css'),
      '@fonts': path.resolve(__dirname, 'static', 'fonts'),
      '@img': path.resolve(__dirname, 'static', 'img'),
    },
    extensions: ['.ts', '.js', '.css', 'scss', '.woff', 'woff2', 'eot', 'ttf', 'otf', 'png', 'svg', 'jpg', 'jpeg', 'gif']
  }
};
