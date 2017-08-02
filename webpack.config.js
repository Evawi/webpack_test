'use strict';

const NODE_ENV = process.env.NODE_ENV || 'develop';
const webpack = require('webpack');

module.exports = {
    entry:"./src/home",
    output:{
        filename:"bundle.js",
        library:"home" //после сборки модуль home будет помещен в переменную home
    },
    /*watch:NODE_ENV == 'develop',  //автоматическая пересборка
    watchOptions:{
        aggregateTimeout:100 //ожидание после изменения
    },*/
    devtool: NODE_ENV == 'develop' ? 'source-map' : null ,  //используется для дебага чтоб показывал как бы все исходники
    plugins:[
        new webpack.DefinePlugin({
            NODE_ENV:JSON.stringify(NODE_ENV) //чтоб добавилось именно значение
        }) //передает переменные в код из консоли то есть NODE_ENV=release webpack так передастся переменная NODE_ENV и собираться все будет под девелоп (пиши через conEmu)
    ],
    resolve:{ //настройка расположения модулей если не найдет по пути entry полезет сюда
        modules:['node_modules'],
        extensions:['.js']
    },
    resolveLoader:{ //настройка расположения loaders
        modules:['node_modules'],
        moduleExtensions:['-loader','*'],
        extensions:['.js']
    },
    module: {
        loaders: [
            {
                test: /\.js$/, //формат
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
};
//if(NODE_ENV == 'prod'){}
module.exports.plugins.push(    ///Минификация
    new webpack.optimize.UglifyJsPlugin({
        compress:{
            warnings:false,
            drop_console:true, // убить консоль логи
            unsafe:true
        }
    })
)