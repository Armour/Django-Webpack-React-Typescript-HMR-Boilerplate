// @flow

import path from 'path';
import webpack from 'webpack';
import cssnext from 'postcss-cssnext';

import BundleTracker from 'webpack-bundle-tracker';
import WebpackMd5Hash from 'webpack-md5-hash';

import * as ReactManifest from './frontend/dist/dll/react_manifest.json';


export default {
  // The base directory, an absolute path, for resolving entry points and loaders from configuration
  context: path.resolve(__dirname),

  // Start entry point(s)
  entry: {
    app: [
      // Important! 'react-hot-loader/patch' must goes first
      // https://github.com/gaearon/redux-devtools/commit/64f58b7010a1b2a71ad16716eb37ac1031f93915#diff-efacb933fc2cf0fd7e8dacf55a958839
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:3002/',
      'webpack/hot/only-dev-server',
      './frontend/src/js/index',
    ],
  },

  // Affecting the output of the compilation
  output: {
    // path: the output directory as an absolute path (required)
    path: path.resolve(__dirname, 'frontend/dist/dev'),
    // filename: specifies the name of output file on disk (required)
    filename: '[name].js',
    // publicPath: specifies the public URL of the output resource directory (CDN)
    // https://webpack.js.org/configuration/output/#output-publicpath
    publicPath: 'http://localhost:3002/',
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
      // Use a list of loaders to load and compile scss files to css files
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, 'frontend/src/css/'),
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
          // {
          //   loader: 'style-loader',
          // },
          // {
          //   loader: 'css-loader',
          // },
          // {
          //   loader: 'postcss-loader',
          // },
          // {
          //   loader: 'sass-loader',
          // },
        ],
      },
      // Use url-loader to load images in development
      {
        test: /.*\.(png|jpe?g|gif|svg)$/,
        include: path.resolve(__dirname, 'frontend/src/image/'),
        use: [
          {
            loader: 'url-loader',
          },
        ],
      },
    ],
  },

  plugins: [
    // Enable hot module reload, if have --hot parameter in npm script, then this line must be removed!
    new webpack.HotModuleReplacementPlugin(),
    // Not emit assets when there is an error while compiling
    new webpack.NoErrorsPlugin(),
    // Better webpack module name display
    new webpack.NamedModulesPlugin(),
    // Use cssnext in postcss when loading scss
    new webpack.LoaderOptionsPlugin({
      test: /\.scss$/,
      options: {
        postcss: {
          plugins: [cssnext],
        },
      },
    }),
    // Load pre-build react dll reference files
    new webpack.DllReferencePlugin({
      manifest: ReactManifest,
      context: __dirname,
    }),
    // Output webpack compiled bundle state json file for django backend
    new BundleTracker({ filename: './webpack-stats.dev.json' }),
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

  // Webpack-dev-server config goes here
  devServer: {
    // Where the webpack dev server serve the static files, should be the same with output.path
    contentBase: path.resolve(__dirname, 'frontend/dist/dev'),
    // Enable hot reload
    hot: true,
    // Enable inline mode
    inline: true,
    // Port number for webpack dev server
    port: 3002,
    // The public URL of the output resource directory (CDN), should be the same with output.publicPath
    publicPath: 'http://localhost:3002/',
  },

  // Disable webpack asset size limit performance warning
  performance: {
    hints: false,
  },

  // Source map mode
  // https://webpack.js.org/configuration/devtool
  devtool: 'eval-source-map',
};
