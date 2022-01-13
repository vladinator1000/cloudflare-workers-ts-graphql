const path = require('path')

module.exports = {
  entry: './src/index.ts',
  target: 'webworker',
  output: {
    filename: 'worker.js',
    path: path.join(__dirname, 'dist'),
  },
  mode: 'production',
  devtool: 'cheap-module-source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  optimization: {
    usedExports: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
    ],
  },
}
