const VueLoaderPlugin = require('vue-loader-plugin');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: '/src/main.js',
    'module-a': '/src/modules/module-a/index.js',
    'module-b': '/src/modules/module-b/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: (chunkData) => {
      console.log('chuckData.chunk.name => ', chunkData.chunk.name);
      return chunkData.chunk.name === 'app' ? './[name].bundle.js' : './[name]/[name].bundle.js';
    },
  },
  mode: 'development',
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: 'app',
      template: './public/index.html',
      inject: true,
      chunks: ['app'],
      filename: 'index.html',
    }),
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  module: {
    rules: [{
      test: /\.vue$/,
      exclude: /node_modules/,
      loader: 'vue-loader',
    },
    {
      test: /\.scss?$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
    },
    {
      test: /\.(png|svg|jpg|gif)$/,
      loader: 'file-loader',
      options: {
        name: 'assets/[name].[ext]',
        esModule: false,
      },
    },
    {
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: [
        'file-loader',
      ],
    },
    ],
  },
  devServer: {
    hot: true,
    historyApiFallback: true,
    port: 9090,
  },
  devtool: 'eval-source-map',
};
