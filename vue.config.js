module.exports = {
  filenameHashing: false,
  pages: {
    index: {
      entry: [
        'src/main.js',
        'src/modules/module-a/index.js',
        'src/modules/module-b/index.js',
      ],
      template: 'public/index.html',
      filename: 'index.html',
      title: 'Index Page',
    },
  },
};
