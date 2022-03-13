const path = require('path');
const webpack = require('webpack');

require('dotenv').config({path: './.env'});

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizer = require('css-minimizer-webpack-plugin');
const loader = require('sass-loader');

const config = {
    
    entry: {
        main: './src/assets/js/main.js'
    },

    output: {
        clean: true,
        
    },

    module: {
        rules: [
            {
                test: /\.(s[ac]|c)ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },

            {
                test: /\.js$/i,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },

            

        ]
    }

}

module.exports = config