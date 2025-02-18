import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    // Точка входа — ваш index.js
    entry: './lib/index.js',

    // Режим сборки (development или production)
    mode: 'production',

    // Выходной файл
    output: {
        path: path.resolve(__dirname, 'dist'), // Папка для сборки
        filename: 'slice-management.js', // Имя выходного файла
        library: {
            name: 'SliceManagement', // Имя библиотеки
            type: 'umd', // Универсальный модуль (поддержка CommonJS, AMD и глобальной переменной)
        },
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
        minimize: false, // Минимизировать выходной файл
    },

    // Настройка source maps (опционально)
    devtool: 'source-map',
};