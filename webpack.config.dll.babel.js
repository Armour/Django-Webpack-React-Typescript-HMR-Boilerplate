import path from 'path';
import webpack from 'webpack';

import BundleTracker from 'webpack-bundle-tracker';


const reactVendors = [
    'react',
    'react-dom',
    // 'react-router',
    // 'redux',
    // 'react-redux',
];

export default {
    context: path.resolve(__dirname),

    entry: {
        react: reactVendors,
    },

    output: {
        path: path.resolve(__dirname, 'frontend/dist/dll/'),
        filename: '[name]_dll.js',
        library: '[name]_dll',
    },

    plugins: [
        new BundleTracker({ filename: './webpack-stats.dll.json' }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            },
        }),
        new webpack.DllPlugin({
            path: path.resolve(__dirname, 'frontend/dist/dll/[name]_manifest.json'),
            name: '[name]_dll',
            context: __dirname,
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false },
            output: { comments: false },
        }),
    ],
};
