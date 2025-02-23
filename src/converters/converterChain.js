/**
 * Цепь конвертеров
 */
export class ConverterChain {
    #chain;

    constructor() {
        this.#chain = [];
    }

    /**
     * Создать конвертер
     * @returns {ConverterChain}
     */
    static create = () => {
        return new ConverterChain();
    }

    /**
     * Добавить конвертер в цепь
     * @param converter конвертер данных типа: (data) => { return newData}
     * @returns {ConverterChain}
     */
    addConverter = (converter) => {
        this.#chain.push(converter);
        return this;
    }

    /**
     * Собрать цепь
     * @returns {(function(*): void)} цепь вызовов конвертеров
     */
    build = () => {
        return (data) => {
            return this.#chain.reduce((acc, cur) => cur(acc), data);
        }
    }
}