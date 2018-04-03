const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const VENDOR_LIBS = ['lodash'];

module.exports = {
  entry: {
    app: './src/index.tsx',
    vendor: VENDOR_LIBS,
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.[name].[chunkhash].js',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.scss', '.d.ts'],
  },
  module: {
    rules: [
      //   {
      //     use: 'babel-loader',
      //     test: /\.jsx?$/,
      //     exclude: /node_modules/,
      //   },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: { limit: 40000 },
          },
          'image-webpack-loader',
        ],
      },
      {
        test: /\.s?css$/,
        // use: ['style-loader', 'css-loader', 'sass-loader'],
        use: [
          'style-loader',
          {
            loader: 'typings-for-css-modules-loader?modules&sass',
            options: {
              sass: true,
              sourceMap: true,
              modules: true,
              importLoaders: 1,
              namedExport: true,
              localIdentName: '[local]___[hash:base64:5]',
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    // new webpack.optimize.splitChunks({
    //   name: ['vendor', 'manifest'],
    // }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    // new webpack.DefinePlugin({
    //   "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    // })
  ],
  optimization: {
    // minimize: false,
    // runtimeChunk: {
    //   name: 'vendor',
    // },
    splitChunks: {
      chunks: 'all',
    },
  },
};
