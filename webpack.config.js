const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssets = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


let config = {
    mode: "production",
    entry: {main: "./src/index.ts"},
    output: {
        path: path.resolve(__dirname, "./public"),
        filename: 'bundle.[hash].js'
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: ['css-hot-loader', MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader', 'postcss-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "style.[contenthash].css"
        }),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: './src/index.html',
            filename: 'index.html'
        }),
        new UglifyJSPlugin(),
        new OptimizeCSSAssets(),
        new CopyWebpackPlugin([
            {from: "./src/assets", to: "assets/"},
            {from: "./src/manifest.json", to: "manifest.json"}
        ])
    ],
    devServer: {
        contentBase: path.resolve(__dirname, "./src"),
        watchContentBase: true,
        historyApiFallback: true,
        inline: true,
        open: "Google Chrome",
        hot: true
    },
    devtool: "eval-source-map"
}
  
module.exports = config;