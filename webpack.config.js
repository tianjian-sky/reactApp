var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var rootPath = path.resolve(__dirname, './')
var _env = process.env.NODE_ENV
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var webpackDevServer = require('webpack-dev-server')

module.exports = {
    // devtool: 'source-map',
    entry: {
        main: [/*'babel-polyfill', */'console-polyfill', './src/main.js']
    },
    output: {
        path: rootPath + '/dist/',
        filename: '[name].js?[chunkhash]'
    },
    resolve: {
        alias: {

        }
    },
    plugins: [
        // new ExtractTextPlugin('style.[contenthash].css'),
        new HtmlWebpackPlugin({
            filename: 'main.html',
            template: './src/template/main.html',
            inject: 'body',
            hash: false,
            minify: {
                removeComments: true,
                collapseWhitespace: false
            },
            chunksSortMode: 'dependency'
        }),
        new webpack.DefinePlugin({
            envMode: JSON.stringify(_env.split('@')[1])
        }),
        //  new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendor',
        //     minChunks: (res) => {
        //         res && res.indexOf('node_modules') >=0 && res.match(/\.js$/)
        //     }
        // }),
        new webpack.NamedModulesPlugin()
    ],
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        },
        {
            test: /\.ejs$/,
            use: 'ejs-loader'
        },
        {
            test: /\.json$/,
            use: 'json-loader'
        },
        {
            test: /\.css$/,
            use: ['css-loader', 'postcss-loader']
            // use: ExtractTextPlugin.extract({
            //     fallback: 'style-loader',
            //     use: ['css-loader', 'postcss-loader']
            //   })
        },
        {
            test: /\.less$/,
            use: ['css-loader', 'postcss-loader', 'less-loader']
            // use: ExtractTextPlugin.extract({
            //     fallback: 'style-loader',
            //     use: ['css-loader', 'postcss-loader', 'less-loader']
            //   })
        },
        {
            test: /\.(png|jpg|gif)$/,
            use: 'url-loader?limit=500000'
        },
        {
            test: /\.(ttf|svg|eot|woff)$/,
            use: ['file-loader']
        }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        port:7000,
        inline: true

    },
    mode: _env.split('@')[0] === 'dev' ? 'development' : 'production'
}
