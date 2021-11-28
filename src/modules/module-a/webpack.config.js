const path = require('path');
const VueLoaderPlugin = require('vue-loader-plugin');

module.exports = {
  entry: {
    'module-a': '/src/modules/module-a/index.js',
  },
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: (chunkData) => {
      console.log('chuckData.chunk.name => ', chunkData.chunk.name);
      return './[name]/[name].bundle.js';
    },
    chunkFilename: (chunkData) => {
      console.log('chuckData.chunk.runtime/chuckData.chunk.name => ', `${chunkData.chunk.runtime}/${chunkData.chunk.name}`);
      return `./${chunkData.chunk.runtime}/[name].bundle.js`;
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: 'vue-loader',
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
  ],
};
