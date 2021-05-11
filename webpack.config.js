// Generated using webpack-cli http://github.com/webpack-cli
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    output: {
        publicPath: '/',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        open: true,
        host: 'localhost',
    },
    plugins: [
        new FaviconsWebpackPlugin({
          logo: "src/assets/favicon.svg",
          prefix: "favicons/",
        }),
        new ImageMinimizerPlugin({
            minimizerOptions: {
                plugins: [
                    'svgo',
                    'gifsicle',
                    'jpegtran',
                    'optipng',
                ],
            },
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.pug',
            minify: false,
        }),
        new HtmlWebpackPlugin({
            filename: '404.html',
            template: 'src/404.pug',
            minify: false,
        }),
        new MiniCssExtractPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: ['/node_modules/'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.pug$/i,
                use: ['html-loader', 'pug-plain-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/,
                type: 'asset',
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
};
