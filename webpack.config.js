const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconWebpackPlugin = require('favicons-webpack-plugin');
const HtmlWebpackInlineSVGPlugin = require('html-webpack-inline-svg-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
    mode: 'development',
    entry: {
        // Styles
        styles: [
            './src/assets/styles/sass/app.scss'
        ],
        // Scripts
        app: './src/assets/js/app.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    devtool: process.env.MODE === 'production' ? false : 'eval',
    devServer: {
        contentBase: path.join(__dirname, 'src'),
        compress: true,
        port: 9000
    },
    module: {
        rules: [
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: ['img:src'],
                        minimize: true,
                        removeComments: false,
                        collapseWhitespace: false
                    }
                }
            },
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "less-loader"
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
            {
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                    }
                }]
            }
        ]
    },
    plugins: [
        /*new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            'process.env.DEBUG': JSON.stringify(process.env.DEBUG)
        }),*/
        // Limpa o diretório de saída ...
        new CleanWebpackPlugin(),
        // Configuração de template para a página inicial ...
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            meta: {
                // viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
            },
            hash: true,
            minify: {collapseWhitespace: true}
        }),
        // Configuração para geração de favicon ...
        new FaviconWebpackPlugin({
            logo: './src/assets/favicon/csbc.png',
            title: 'CSBC 2020',
            icons: {
                android: true,
                appleIcon: true,
                appleStartup: true,
                coast: false,
                favicons: true,
                firefox: true,
                opengraph: false,
                twitter: false,
                yandex: false,
                windows: false
            }
        }),
        // Permite a inclusão de SVG inline por meio do arquivo
        new HtmlWebpackInlineSVGPlugin({
            runPreEmit: true
        }),
        new Dotenv()
    ]
}