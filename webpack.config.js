const path = require("path");

// Automatically creates the index.html file with all it's bundles
const HtmlWebpackPlugin = require("html-webpack-plugin");

// Extract CSS into seperate files. Create a CSS file per JS file (CSS modules)
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: process.env.NODE_ENV,
    entry: {
        index: "./src/index.ts",
    },
    output: {
        // By using [contenthash] (which based on the content in the file itself)
        // We can prevent the browser from caching the file if something changed
        // Since the name of the file will change if the content of the file changes
        filename: "[name].[contenthash].js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "jQuingo",
        }),
        new MiniCssExtractPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                include: path.resolve(__dirname, "src"),
            },
            {
                test: /\.css$/i,
                // css-loader collects CSS from all the css files referenced in the application, and puts it into a (javascript) string
                // style-loader adds the CSS collected by css-loader and adds it to the DOM by injecting a <style> tag
                // "use" loads in reverse order so to first load css-loader and then style-loader we have to do the following:
                use: ["style-loader", "css-loader"],
                include: path.resolve(__dirname, "static", "css"),
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource",
                include: path.resolve(__dirname, "static", "img"),
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: "asset/resource",
                include: path.resolve(__dirname, "static", "fonts"),
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
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
                },
            },
        },
    },
    resolve: {
        alias: {
            "@src": path.resolve(__dirname, "src"),
            "@jquingo": path.resolve(__dirname, "src", "jquingo"),
            "@components": path.resolve(__dirname, "src", "components"),
            "@routes": path.resolve(__dirname, "src", "routes"),
            "@css": path.resolve(__dirname, "static", "css"),
            "@fonts": path.resolve(__dirname, "static", "fonts"),
            "@img": path.resolve(__dirname, "static", "img"),
        },
        extensions: [
            ".ts",
            ".js",
            ".css",
            "scss",
            ".woff",
            "woff2",
            "eot",
            "ttf",
            "otf",
            "png",
            "svg",
            "jpg",
            "jpeg",
            "gif",
        ],
    },
};
// const devConfig = require("./webpack.development");
// const prodConfig = require("./webpack.production");

// module.exports = merge(
//     defaultConfig,
//     mode === "development" ? devConfig : prodConfig
// );