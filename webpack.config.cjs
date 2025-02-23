const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        library: {
            name: 'SliceManagement', // Имя библиотеки
            type: 'umd', // Универсальный модуль (поддержка CommonJS, AMD и глобальной переменной)
        },
        globalObject: 'this', // Для корректной работы в Node.js и браузере
    },
    module: {
        rules: [
            {
                test: /\.(js|flow)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },
    // optimization: {
    //     minimize: false, // Отключить минификацию для читаемости
    // },
    // devtool: 'source-map', // Добавить source maps для отладки
};