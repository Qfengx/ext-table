const path = require('path')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

let cleanOptions = {
  root: path.resolve(__dirname),
  // exclude
  verbase: true,
  dry: false
}

module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'jsx', '.json', '.css', '.less']
  },
  devtool: 'source-map',
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    filename: '[name].[hash:8].js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    port: 5001,
    contentBase: path.resolve(__dirname, 'dist'), // 内容目录
    compress: true, // 一切服务都启用gzip压缩
    progress: true, // 将运行进度输出到命令行
  },
  module: {
    rules: [
      // tsx 处理
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'tslint-loader',
            options: {
              configFile: path.resolve(__dirname, './tslint.json'),
            }
          },
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(__dirname, './tsconfig.json')
            }
          }
        ],
        exclude: /node_modules/,
      },
      // 样式
      {
        test: /\.(le|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(cleanOptions),
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash:8].css',
      chunkFilename: '[id].css'
    })
  ]
}