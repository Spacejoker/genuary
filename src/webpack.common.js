const path = require('path')

module.exports = {
    entry: './src/client.ts',
    module: {
        rules: [
            {
              test: /\.tsx?$/,
              use: 'ts-loader',
              exclude: /node_modules/,
            },
            {
              test: /\.(png|jpe?g|gif|jp2|webp)$/,
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
              },
            },
            {
              test: /\.css$/,
              use: [
                'style-loader',
                'css-loader'
              ],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../dist/client'),
    },
}
