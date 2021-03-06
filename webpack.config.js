const webpack = require('webpack');

module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: 'development',

  // メインのJS
  entry: './src/js/main.js',
  // 出力ファイル
  output: {
    filename: 'main.js',
  },
  plugins: [
    new webpack.ProvidePlugin({
      Promise: 'es6-promise',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};

// {
//   entry: entryObj,
//   output: {
//     filename: '[name]',
//   },
// },
