// @flow

import path from 'path';
import webpack from 'webpack';
import cssnext from 'postcss-cssnext';

import BundleTracker from 'webpack-bundle-tracker';
import WebpackMd5Hash from 'webpack-md5-hash';

import * as ReactManifest from './frontend/dist/dll/react_manifest.json';


export default {
  context: path.resolve(__dirname),

  entry: {
    app: [
      'react-hot-loader/patch',
      './frontend/src/js/index',
    ],
  },

  output: {
    path: path.resolve(__dirname, 'frontend/dist/dev'),
    filename: '[name].js',
    publicPath: 'http://localhost:3002/',
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
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
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
    new webpack.NamedModulesPlugin(),
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
    new BundleTracker({ filename: './webpack-stats.dev.json' }),
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

  devServer: {
    contentBase: path.resolve(__dirname, 'frontend/'),
    port: 3002,
    publicPath: 'http://localhost:3002/',
  },

  performance: {
    hints: false,
  },

  devtool: 'source-map',
};
