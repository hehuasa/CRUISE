const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'eval-source-map',
  entry: `${__dirname}/src/index.js`,
  output: {
    path: `${__dirname}/dist/`,
    filename: 'index.js',
  },
  devServer: {
    contentBase: './src',
    port: 7000,
    historyApiFallback: true,
    inline: true,
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        use: {
          loader: 'babel-loader',
        },
        exclude: /node_modules/,
      },
      {
        test: /(\.css)$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
        ],
      },
      {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]_[local]--[hash:base64:5]',
            },
          },
          { loader: 'less-loader' },
          { loader: 'postcss-loader' },
        ],
      },
    ],
  },
  plugins: [
    new webpack.BannerPlugin('版权所有，翻版必究'),
    new HtmlWebpackPlugin({
      template: `${__dirname}/src/index.html`, //
    }),
  ],
};