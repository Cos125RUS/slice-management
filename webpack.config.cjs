// webpack.config.cjs
const path = require('path');

module.exports = {
    // Точка входа — ваш index.js
    entry: './lib/index.js',

    // Режим сборки (development или production)
    mode: 'production',

    // Выходной файл
    output: {
        path: path.resolve(__dirname, 'dist'), // Папка для сборки
        filename: 'slice-management.js', // Имя выходного файла
        library: 'SliceManagement', // Имя библиотеки (будет доступно в глобальной области видимости)
        libraryTarget: 'umd', // Универсальный модуль (поддержка CommonJS, AMD и глобальной переменной)
        globalObject: 'this', // Для корректной работы в Node.js и браузере
    },

    // Настройка модулей
    module: {
        rules: [
            {
                test: /\.js$/, // Применять правило ко всем .js файлам
                exclude: /node_modules/, // Исключить папку node_modules
                use: {
                    loader: 'babel-loader', // Использовать babel-loader для транспиляции
                },
            },
        ],
    },

    // Оптимизация (опционально)
    optimization: {
        minimize: true, // Минимизировать выходной файл
    },

    // Настройка source maps (опционально)
    devtool: 'source-map',
};