const webpack = require("webpack");
const Path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssets = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Pages = require('./src/pages/pages.ts');

const i18n = [
    {name: 'fr', translation: require('./src/i18n/fr-FR.json')}
];

let config = {
    mode: "production",
    entry: {main: "./src/app.ts"},
    output: {
        path: Path.resolve(__dirname, "./public"),
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
                test: /\.hbs$/,
                loader: 'handlebars-loader',
                query: {
                    helperDirs: [
                        Path.join(__dirname, 'src', 'helpers')
                    ],
                    partialDirs: [
                        Path.join(__dirname, 'src', 'layouts'),
                        Path.join(__dirname, 'src', 'components'),
                        Path.join(__dirname, 'src', 'pages')
                    ],
                    precompileOptions: {
                        knownHelpersOnly: false
                    }
                }
            },
            {
                test: /\.scss$/,
                use: ['css-hot-loader', MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader', 'postcss-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
                use: ['file-loader']
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader']
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "style.[contenthash].css"
        }),
        new UglifyJSPlugin(),
        new OptimizeCSSAssets(),
        new CopyWebpackPlugin([
            {from: "./src/assets", to: "/assets/"},
            {from: "./src/manifest.json", to: "manifest.json"}
        ])
    ],
    devServer: {
        contentBase: Path.resolve(__dirname, "./src"),
        watchContentBase: true,
        historyApiFallback: true,
        inline: true,
        open: "Google Chrome",
        host: '0.0.0.0',
        port: 5400,
        hot: true
    },
    devtool: "eval-source-map"
};

// Add handlbars template pages
for (let i = 0; i < Pages.length; i++) {

    let page = Object.assign({}, Pages[i]);

    for (let y = 0; y < i18n.length; y++) {

        config.plugins.push(
            new HtmlWebpackPlugin({
                template: page.template,
                templateParameters: {
                    i18n: i18n[y].translation
                },
                filename: i18n[y].name === 'fr' ? page.output : `${i18n[y].name}/${page.output}`
            })
        );
    }
}

module.exports = config;
