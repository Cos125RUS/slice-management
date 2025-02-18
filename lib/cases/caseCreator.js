import {defaultLoader} from "../loaders/defaultLoader.js";

/**
 * Вспомогательный класс для создания кейсов
 */
export class CaseCreator {
    #loader;
    #stateVariable;
    #converter;
    #fulfilled;

    /**
     * @param loader загрузчик
     * @param converter конвертер данных
     * @param stateVariable имя переменной в хранилище для сохранения приходящих данных
     * @param fulfilled функция, выполняющаяся при успешной загрузке
     */
    constructor(loader = defaultLoader, converter = data => data, stateVariable = 'data', fulfilled = null) {
        this.#loader = loader;
        this.#converter = converter;
        this.#stateVariable = stateVariable;
        this.#fulfilled = fulfilled;
    }

    /**
     * Создать создателя кейсов
     * @param loader загрузчик
     * @param converter конвертер данных
     * @param stateVariable имя переменной в хранилище для сохранения приходящих данных
     * @param fulfilled функция, выполняющаяся при успешной загрузке
     * @returns {CaseCreator}
     */
    static create = (loader = defaultLoader, converter = data => data, stateVariable = 'data', fulfilled = null) => {
        return new CaseCreator(loader, converter, stateVariable, fulfilled);
    };

    /**
     * Задать загрузчик данных
     * @param loader загрузчик данных
     * @returns {CaseCreator}
     */
    setLoader = (loader) => {
        this.#loader = loader;
        return this;
    }

    /**
     * Установить конвертер данных
     * @param converter конвертер данных
     * @returns {CaseCreator}
     */
    setConverter = (converter) => {
        this.#converter = converter;
        return this;
    }

    /**
     * Установить имя переменной в хранилище (store) для сохранения данных после загрузки
     * @param stateVariable имя переменной в хранилище (store)
     * @returns {CaseCreator}
     */
    setStateVariable = (stateVariable) => {
        this.#stateVariable = stateVariable;
        return this;
    }

    /**
     * Установить функцию, выполняющуюся при успешной загрузке данных
     * @param fulfilled
     * @returns {CaseCreator}
     */
    setFulfilled = (fulfilled) => {
        this.#fulfilled = fulfilled;
        return this;
    }

    /**
     * Создать кейсы
     * @returns {(function(*): void)|*}
     */
    build = () => {
        return (builder) => {
            builder
                .addCase(this.#loader.pending, (state) => {
                    state.isLoading = true;
                    state.isError = false;
                })
                .addCase(this.#loader.fulfilled, (state, action) => {
                    !this.#fulfilled ?
                        state[this.#stateVariable] = this.#converter(action.payload)
                        :
                        this.#fulfilled(state, action);
                    state.isLoading = false;
                })
                .addCase(this.#loader.rejected, (state) => {
                    state.isLoading = false;
                    state.isError = true;
                });
        }
    };
}