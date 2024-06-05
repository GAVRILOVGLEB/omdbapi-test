/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const paths = require("./paths");
const common = require("./webpack.common");

module.exports = merge(common, {
    mode: "production",
    devtool: "source-map",
    output: {
        path: paths.build,
        publicPath: "/",
        filename: `${paths.static}/js/[name].[fullhash].js`,
    },
    module: {
        rules: [
            {
                test: /\.(scss|sass|css)$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 2,
                            sourceMap: true,
                            modules: false,
                        },
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [["autoprefixer"]],
                                sourceMap: true,
                            },
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "static/css/[name].[contenthash:8].css",
            chunkFilename: "static/css/[name].[contenthash:8].chunk.css",
        }),
    ],
    optimization: {
        runtimeChunk: { name: "runtime" },
        splitChunks: {
            chunks: "all",
        },
        minimize: true,
        minimizer: [new CssMinimizerPlugin(), "..."],
    },
    performance: {
        hints: false,
    },
    recordsPath: `${paths.build}/records.json`,
});
