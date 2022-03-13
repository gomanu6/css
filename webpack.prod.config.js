const path = require('path');
const webpack = require('webpack');
const {merge} = require('webpack-merge');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizer = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const common = require('./webpack.common.config');

const config = {

    module: {
        rules: [
            {
                test: /\.(png|svg|gif|jpe?g)$/i,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: "[name].[hash].[ext]",
                        outputPath: 'assets/images',
                        esModule: false,
                    }
                }
            },
        ],

        plugins: [
            new MiniCssExtractPlugin({
                filename: 'assets/css/[name].css',
                chunkFilename: 'assets/css/[id].[contenthash].css',
            }),
    
            new HtmlWebpackPlugin({
                title: "Main page",
                filename: "index.html",
                template: "./src/templates/main.html",
                chunks: ['main'],
                minify: true,
            }),
    
            
    
            
        ],

        optimization: {
            splitChunks: {
                chunks: 'all'
            },
            minimizer: [
                new CssMinimizer,
                new TerserPlugin
            ]
        },
    }


}

module.exports = merge(common, config);