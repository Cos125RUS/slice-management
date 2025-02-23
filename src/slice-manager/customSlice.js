import {getNewLoader} from "../loaders/getNewLoader.js";

/** Настроенный слайс, снабжённый загрузчиком данных */
export class CustomSlice {
    #slice;
    #loader;
    #actionCollection;
    reducer;
    actions;

    constructor(slice, loader, actionCollection) {
        this.#slice = slice;
        this.#loader = loader;
        this.#actionCollection = actionCollection;
        this.reducer = this.#slice.reducer;
        this.actions = this.#slice.actions;
    }

    /**
     * Извлечь базовый слайс
     * @returns {*}
     */
    getSlice = () => {
        return this.#slice;
    }

    /**
     * Получить загрузчик данных
     * @returns {*}
     */
    getLoader = () => {
        if (!this.#loader) {
            this.#loader = getNewLoader();
        }

        return this.#loader;
    };

    /**
     * Получить экшены слайса
     * @returns {*}
     */
    getActions = () => {
        return {...this.#actionCollection};
    };
}