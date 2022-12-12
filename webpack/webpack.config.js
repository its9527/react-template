const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const src = path.resolve(__dirname, '..', 'src')
const dist = path.resolve(__dirname, '..', 'dist')
const public = path.resolve(__dirname, '..', 'public')

module.exports = (env, argv) => {
  const { mode } = argv
  const isProd = mode === 'production'

  return {
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [isProd ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', 'postcss-loader'],
        },
        {
          test: /\.(png|svg|jpg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.ts[x]?$/i,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      alias: {
        '@': src,
      },
    },
    plugins: [new HtmlWebpackPlugin({ template: path.resolve(public, 'template.html') }), new MiniCssExtractPlugin()],
    mode,
    entry: path.resolve(src, 'entry.tsx'),
    devtool: isProd ? 'source-map' : 'eval',
    devServer: {
      static: dist,
      hot: true,
    },
    output: {
      filename: 'bundle.js',
      path: dist,
      clean: true,
    },
  }
}
