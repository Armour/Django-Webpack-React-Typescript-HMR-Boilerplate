import path from 'path';
import webpack from 'webpack';
import cssnext from 'postcss-cssnext';

import BundleTracker from 'webpack-bundle-tracker';
import WebpackMd5Hash from 'webpack-md5-hash';

import * as ReactManifest from './frontend/dist/dll/react_manifest.json'; // eslint-disable-line import/no-unresolved


export default {
  // The base directory, an absolute path, for resolving entry points and loaders from configuration
  context: path.resolve(__dirname),

  // Start entry point(s)
  entry: {
    app: [
      // Important! 'react-hot-loader/patch' must goes first
      // https://github.com/gaearon/redux-devtools/commit/64f58b7010a1b2a71ad16716eb37ac1031f93915#diff-efacb933fc2cf0fd7e8dacf55a958839
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:3003/',
      'webpack/hot/only-dev-server',
      './frontend/src/tsx/index',
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
    publicPath: 'http://localhost:3003/',
  },

  // Determine how the different types of modules within a project will be treated
  module: {
    rules: [
      // Use awesome-typescript-loader and babel-loader for ts(x) files
      {
        test: /\.tsx?$/,
        include: path.resolve(__dirname, 'frontend/src/tsx/'),
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'awesome-typescript-loader',
            options: {
              // Use those two flags to speed up babel compilation
              // https://github.com/s-panferov/awesome-typescript-loader#differences-between-ts-loader
              useBabel: true,
              useCache: true,
            },
          },
          // Alternatively, we can use ts-loader instead of awesome-typescript-loader
          // {
          //   loader: 'ts-loader',
          // },
        ],
      },
      // Use a list of loaders to load and compile scss files to css files
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, 'frontend/src/sass/'),
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
      // Use url-loader to load images in development
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        include: path.resolve(__dirname, 'frontend/src/image/'),
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
            },
          },
          {
            loader: 'image-webpack-loader',
          },
        ],
      },
      // Use file-loader to load font related files
      {
        test: /\.(eot|woff2?|ttf)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },

  plugins: [
    // Enable hot module reload, if have --hot parameter in npm script, then this line must be removed!
    new webpack.HotModuleReplacementPlugin(),
    // Not emit assets when there is an error while compiling
    new webpack.NoEmitOnErrorsPlugin(),
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
    // jQuery support
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'root.jQuery': 'jquery',
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
      'frontend/materialize',
    ],
    // Automatically resolve certain extensions (Ex. import 'folder/name(.ext)')
    extensions: [
      '.ts',
      '.tsx',
      '.js',
      '.jsx',
      '.json',
      '.scss',
    ],
  },

  // Webpack-dev-server config goes here
  devServer: {
    // Where the webpack dev server serve the static files, should be the same as output.path
    contentBase: path.resolve(__dirname, 'frontend/dist/dev'),
    // Enable hot reload
    hot: true,
    // Port number for webpack dev server
    port: 3003,
    // Allow CORS
    // https://github.com/gaearon/react-hot-loader/blob/master/docs/Troubleshooting.md#no-access-control-allow-origin-header-is-present-on-the-requested-resource
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    // The public URL of the output resource directory (CDN), should be the same as output.publicPath
    publicPath: 'http://localhost:3003/',
  },

  // Disable webpack asset size limit performance warning
  performance: {
    hints: false,
  },

  // Source map mode
  // https://webpack.js.org/configuration/devtool
  devtool: 'eval-source-map',
};
