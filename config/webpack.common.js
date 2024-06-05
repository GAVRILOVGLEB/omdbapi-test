/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const miniSVGDataURI = require("mini-svg-data-uri");
const ESLintPlugin = require("eslint-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const path = require("path");
// const BundleAnalyzerPlugin =
// 	require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const paths = require("./paths");

module.exports = {
    entry: `${paths.ui}/index.tsx`,
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        alias: {
            "~": paths.root,
            DOMAIN: paths.domain,
            APP: paths.application,
            SERVICES: paths.services,
            UI: paths.ui,
            COMPONENTS: paths.components,
        },
        fallback: { path: require.resolve("path-browserify") },
    },
    output: {
        filename: `${paths.static}/js/[name].[fullhash].js`,
        path: paths.build,
        publicPath: "/",
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "swc-loader",
                    },
                ],
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: "asset/resource",
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf)$/,
                type: "asset/inline",
            },
            {
                test: /\.svg$/,
                type: "asset/inline",
                generator: {
                    dataUrl(content) {
                        content = content.toString();
                        return miniSVGDataURI(content);
                    },
                },
                use: "svgo-loader",
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: `${paths.public}/index.html`,
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: `${paths.ui}/${paths.assets}`,
                    to: `${paths.static}/${paths.media}`,
                    globOptions: {
                        ignore: ["*.DS_Store"],
                    },
                },
                {
                    from: `${paths.public}/favicon.ico`,
                },
                {
                    from: `${paths.public}/logo192.png`,
                },
                {
                    from: `${paths.public}/logo512.png`,
                },
                {
                    from: `${paths.public}/manifest.json`,
                },
                {
                    from: `${paths.public}/robots.txt`,
                },
            ],
        }),
        new Dotenv(),
        new webpack.IgnorePlugin({
            resourceRegExp: /^\.\/locale$/,
            contextRegExp: /moment$/,
        }),
        new ESLintPlugin({
            extensions: ["js", "mjs", "jsx", "ts", "tsx"],
            eslintPath: require.resolve("eslint"),
            failOnError: true,
            context: paths.client,
            cache: true,
            cacheLocation: path.resolve(
                paths.nodeModules,
                ".cache/.eslintcache",
            ),
            cwd: paths.root,
            resolvePluginsRelativeTo: __dirname,
        }),
        /** Use only for analize */
        // new BundleAnalyzerPlugin(),
    ],
    stats: {
        errorDetails: true,
    },
};
