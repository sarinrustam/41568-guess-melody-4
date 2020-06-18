const path = require(`path`);
const portFinderSync = require(`portfinder-sync`);
const port = portFinderSync.getPort(1337);

module.exports = {
  entry: `./src/index.js`,
  output: {
    filename: `bundle.js`,
    path: path.join(__dirname, `public`)
  },
  devServer: {
    contentBase: path.join(__dirname, `public`),
    watchContentBase: true,
    open: `chrome`,
    hot: true,
    port,
    historyApiFallback: true
  },
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, `src/components/`),
      '@src': path.resolve(__dirname, `src/`),
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: `babel-loader`,
        },
      }
    ],
  },
  devtool: `source-map`,
};
