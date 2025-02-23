import {CustomSlice} from "./customSlice.js";
import {persistReducer} from "redux-persist";

/** Настроенный персистентный слайс, снабжённый загрузчиком данных и конфигом хранилища */
export class PersistSlice extends CustomSlice {
    #config;
    reducer;

    constructor(customSlice, persistConfig) {
        super(customSlice.getSlice(), customSlice.getLoader(), customSlice.getActions());
        this.#config = persistConfig;
        this.reducer = persistReducer(persistConfig, customSlice.reducer);
    }

    /**
     * Получить конфиг хранилища
     * @returns {*}
     */
    getConfig = () => {
        return this.#config;
    };
}