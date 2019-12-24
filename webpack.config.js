const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
 
module.exports = {
    mode:'development',
    entry: {
        'custom-modal': ['./custom-modal/css/custom-modal.css','./custom-modal/js/custom-modal.js'],
        'mouse-scroll':['./scroll-event/src/javascript/mouse-scroll/mouse-scroll-event.js'],
        'validation-util': ['./validation-util/src/javscript/validatio-config.js', './validation-util/src/javscript/validatio-util.js']
    },
    output: {
      filename: '[name].min.js',
      chunkFilename: '[id].js',
      path: path.resolve(__dirname, 'dist'),
    //   publicPath: 'dist/'
    },
    module: {
        rules: [
            {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader:'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
            },
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                use : [
                    'file-loader?name=img/[name].[ext]?[hash]',
                    'image-webpack-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template:'./custom-modal/index.html',
            filename:'./index.html'
        })
    ],

    devServer: {
        contentBase: './',
        compress: true,
        hot : true,
        historyApiFallback: true,
        port: 3003
    },
};