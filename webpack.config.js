module.exports = {
  entry: ['babel-polyfill', './client/index'],
  mode: 'development',
  output: {
    // bundle.js output file will go in the root folder
    path: __dirname,
    filename: './public/bundle.js',
  },
  // map between huge bundle file and actial location in my // code for more helpful error logs
  devtool: 'source-maps',
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
