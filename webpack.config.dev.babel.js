import path from 'path';
import webpack from 'webpack';
import cssnext from 'postcss-cssnext';

import AddAssetHtmlPlugin from 'add-asset-html-webpack-plugin';
import BundleTracker from 'webpack-bundle-tracker';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';

import * as ReactManifest from './frontend/dist/dll/react_manifest.json';


export default {
    context: path.resolve(__dirname),

    entry: {
        app: './frontend/src/js/index',
    },

    output: {
        path: path.resolve(__dirname, 'frontend/dist/dev'),
        filename: '[name].js',
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: path.resolve(__dirname, 'frontend/src/js/'),
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                            plugins: ['transform-runtime'],
                        },
                    },
                ],
            },
            {
                test: /\.scss$/,
                include: path.resolve(__dirname, 'frontend/src/css/'),
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: [
                        'css-loader',
                        'postcss-loader',
                        'sass-loader',
                    ],
                }),
            },
            {
                test: /.*\.(png|jpe?g|gif|svg)$/,
                include: path.resolve(__dirname, 'frontend/src/image/'),
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                        },
                    },
                    {
                        loader: 'file-loader',
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            optimizationLevel: 7,
                        },
                    },
                ],
            },
        ],
    },

    plugins: [
        new webpack.NoErrorsPlugin(),
        // new webpack.HotModuleReplacementPlugin(),
        new webpack.LoaderOptionsPlugin({
            test: /\.scss$/,
            options: {
                postcss: {
                    plugins: [cssnext],
                },
            },
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
            },
        }),
        new webpack.DllReferencePlugin({
            manifest: ReactManifest,
            context: __dirname,
        }),
        new AddAssetHtmlPlugin([
            { filepath: 'frontend/dist/dll/react_dll.js', includeSourcemap: false },
        ]),
        new BundleTracker({ filename: './webpack-stats.dev.json' }),
        new ExtractTextPlugin('[name].css'),
        new HtmlWebpackPlugin({
            title: 'My Blog',
            filename: 'index.html',
            inject: false,
            template: path.resolve(__dirname, 'frontend/template/index.ejs'),
        }),
        new WebpackMd5Hash(),
    ],

    resolve: {
        modules: [
            'node_modules',
            'frontend/src',
        ],
        extensions: [
            '.js',
            '.jsx',
            '.json',
            '.css',
            '.scss',
            '.html',
        ],
    },

    devtool: 'source-map',
};
