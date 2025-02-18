const path = require('path');

module.exports = {
    mode: 'production',
    entry: './lib/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'slice-management.js',
        library: {
            name: 'SliceManagement', // Имя библиотеки
            type: 'umd', // Универсальный модуль (поддержка CommonJS, AMD и глобальной переменной)
        },
        globalObject: 'this', // Для корректной работы в Node.js и браузере
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },
    optimization: {
        minimize: false, // Отключить минификацию для читаемости
    },
    devtool: 'source-map', // Добавить source maps для отладки
};