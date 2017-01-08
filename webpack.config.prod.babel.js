import path from 'path';
import webpack from 'webpack';
import cssnext from 'postcss-cssnext';

import BundleTracker from 'webpack-bundle-tracker';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';

import * as ReactManifest from './frontend/dist/dll/react_manifest.json';


export default {
    context: path.resolve(__dirname),

    entry: {
        app: [
            './frontend/src/js/index',
        ],
    },

    output: {
        path: path.resolve(__dirname, 'frontend/dist/prod'),
        filename: '[name]-[chunkhash:10].js',
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: path.resolve(__dirname, 'frontend/src/js/'),
                use: [
                    {
                        loader: 'babel-loader',
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
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false },
            output: { comments: false },
            sourceMap: true,
        }),
        new webpack.NoErrorsPlugin(),
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
                NODE_ENV: JSON.stringify('production'),
            },
        }),
        new webpack.DllReferencePlugin({
            manifest: ReactManifest,
            context: __dirname,
        }),
        new BundleTracker({ filename: './webpack-stats.prod.json' }),
        new ExtractTextPlugin('[name]-[contenthash:10].css'),
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
