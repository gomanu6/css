const path = require('path');
const webpack = require('webpack');
const {merge} = require('webpack-merge');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizer = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin')

const common = require('./webpack.common.config');

const config = {
    mode: "development",
    devtool: 'source-map',

    output: {
        
        path: path.resolve(__dirname, 'dev'),
        filename: "assets/js/[name].js"
    },
    
    devServer: {
        port: 3030,
        hot: true,
        static: path.resolve( __dirname, 'dev'),
    },

    module: {
        rules: [
            {
                test: /\.(png|svg|gif|jpe?g)$/i,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: "[name].[ext]",
                        outputPath: 'assets/images',
                        esModule: false,
                    }
                }
            },
        ]
    },

    optimization: {
        splitChunks: {
            chunks: 'all'
        },
        minimizer: [
            new CssMinimizer,
            new TerserPlugin
        ]
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: 'assets/css/[name].css',
            chunkFilename: 'assets/css/[id].css',
        }),

        new HtmlWebpackPlugin({
            title: "Main page [Dev Version]",
            filename: "index.html",
            template: "./src/templates/main.html",
            chunks: ['main'],
            minify: false,
        }),

        

        
    ],


}

module.exports = merge(common, config)