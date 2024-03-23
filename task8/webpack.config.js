const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');


module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.[contenthash].js', 
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.scss$/i,
                use: [
                    MiniCssExtractPlugin.loader, 
                    'css-loader',
                    'sass-loader',
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Форма оплаты',
            template: './index.html',
        }),
        new MiniCssExtractPlugin({
            filename: './src/styles.[contenthash].css',
        }),
        
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(), 
        ],
    },
    devServer: {
        historyApiFallback: true,
        hot: true,
    },
};
