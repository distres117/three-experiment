var webpack = require('webpack'),
    BrowserSync = require('browser-sync-webpack-plugin');

module.exports = {
    entry:[
        'babel-polyfill',
        './app/main.js'
    ],
    plugins:[
        new webpack.optimize.UglifyJsPlugin({
            compressor:{
                warnings: false
            }
        }),
        new BrowserSync({
            host:'localhost',
            port: 3000,
            server: { baseDir:[__dirname]},
            browser: 'chrome'
        })
    ],
    output:{
        path: __dirname,
        filename: './bundle.js'
    },
    resolve: {
        root: __dirname,
        modulesDirectories:[
            'node_modules',
            './app'
        ],
        extensions:['','.js']
    },
    module:{
        loaders: [
            {
                loader: 'babel-loader',
                query:{
                    presets: ['es2015']
                },
                test: /\.js?$/,
                exclude: /(node_modules|bower_components)/
            }
        ]
    }
}