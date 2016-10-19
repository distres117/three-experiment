var webpack = require('webpack'),
    BrowserSync = require('browser-sync-webpack-plugin');

module.exports = {
    entry:[
        './app/app.js'
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
            server: { baseDir:['public']}
        })
    ],
    output:{
        path: __dirname,
        filename: './public/bundle.js'
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