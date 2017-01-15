// @flow

import path from 'path';
import webpack from 'webpack';
import cssnext from 'postcss-cssnext';

import BundleTracker from 'webpack-bundle-tracker';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';

import * as ReactManifest from './frontend/dist/dll/react_manifest.json';


export default {
  // The base directory, an absolute path, for resolving entry points and loaders from configuration
  context: path.resolve(__dirname),

  // Start entry point(s)
  entry: {
    app: [
      './frontend/src/js/index',
    ],
  },

  // Affecting the output of the compilation
  output: {
    // path: the output directory as an absolute path (required)
    path: path.resolve(__dirname, 'frontend/dist/prod'),
    // filename: specifies the name of output file on disk (required)
    filename: '[name]-[chunkhash:10].js',
    // publicPath: relative to server
    // https://webpack.js.org/configuration/output/#output-publicpath
    publicPath: '/static/prod/',
  },

  // Determine how the different types of modules within a project will be treated
  module: {
    rules: [
      // Use babel-loader for js and jsx files
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, 'frontend/src/js/'),
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      // Use ExtractTextPlugin and list of loaders to load and compile scss files to css files
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
      // Use file-loader and image-loader to load images
      {
        test: /.*\.(png|jpe?g|gif|svg)$/,
        include: path.resolve(__dirname, 'frontend/src/image/'),
        use: [
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

  // A list of used webpack plugins
  plugins: [
    // Minimize javascript files with source map generated
    new webpack.optimize.UglifyJsPlugin({
      output: { comments: false },
      sourceMap: true,
    }),
    // Use cssnext in postcss when loading scss
    new webpack.LoaderOptionsPlugin({
      test: /\.scss$/,
      options: {
        postcss: {
          plugins: [cssnext],
        },
      },
    }),
    // Define production env which shaved off 75% of the build output size
    // http://moduscreate.com/optimizing-react-es6-webpack-production-build
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    // Load pre-build react dll reference files
    new webpack.DllReferencePlugin({
      manifest: ReactManifest,
      context: __dirname,
    }),
    // Output webpack compiled bundle state json file for django backend
    new BundleTracker({ filename: './webpack-stats.prod.json' }),
    // Extract css part from javascript bundle into a file
    new ExtractTextPlugin('[name]-[contenthash:10].css'),
    // Better hash for [hash] and [chunkhash]
    new WebpackMd5Hash(),
  ],

  // Change how modules are resolved
  resolve: {
    // What directories should be searched when resolving modules
    modules: [
      'node_modules',
      'frontend/src',
    ],
    // Automatically resolve certain extensions (Ex. import 'folder/name(.ext)')
    extensions: [
      '.js',
      '.jsx',
      '.json',
      '.scss',
    ],
  },

  // Source map mode
  // https://webpack.js.org/configuration/devtool
  devtool: 'source-map',
};
