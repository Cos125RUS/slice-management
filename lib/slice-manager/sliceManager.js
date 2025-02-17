import {createSlice} from "@reduxjs/toolkit";
import {getNewLoader} from "../loaders/getNewLoader.js";
import CaseCreator from "../cases/caseCreator.js";
import CustomSlice from "../slice-manager/customSlice.js";

/** Менеджер для создания слайсов */
class SliceManager {
    #name;
    #initialState;
    #actionCollection;
    #caseCollection;
    #isApiResource;
    #slice;
    #loader;

    /**
     * @param name имя слайса
     * @param initialState данные инициализации
     * @param isApiResource индикатор необходимости загрузки данных из api
     */
    constructor(name, initialState, isApiResource) {
        this.#name = name && name;
        this.#initialState = initialState ? initialState : {
            data: null,
            isLoading: false,
            isError: false,
        };
        this.#isApiResource = isApiResource;
        this.#actionCollection = {};
        this.#caseCollection = [];

        if (isApiResource && !this.#initialState['url']) {
            this.#initialState['url'] = '';
        }
    }

    /**
     * Создать менеджера слайсов
     * @param name имя слайса
     * @param initialState инициализационные данные
     * @param isApiResource индикатор необходимости загрузки данных из api
     * @returns {SliceManager}
     */
    static create(name = "", initialState = null, isApiResource = true) {
        return new SliceManager(name, initialState, isApiResource);
    }

    /**
     * Установить имя слайса
     * @param name новое имя слайса
     * @returns {SliceManager}
     */
    setName = (name) => {
        this.#name = name;
        return this;
    };

    /**
     * Получить имя слайса
     * @returns {string}
     */
    getName = () => {
        return this.#name;
    }

    /**
     * Установить данные при инициализации
     * @param newState новые данные инициализации
     * @returns {SliceManager}
     */
    setInitialState = (newState) => {
        this.#initialState = newState;
        return this;
    };

    /**
     * Добавить данные инициализации
     * @param key ключ для получения данных (имя переменной в слайсе)
     * @param value передаваемое значение
     * @returns {SliceManager}
     */
    addState = (key, value) => {
        this.#initialState[key] = value;
        return this;
    };

    /**
     * Установить url
     * @param url api ресурса
     * @returns {SliceManager}
     */
    setUrl = (url) => {
        this.#initialState['url'] = url;
        return this;
    };

    /**
     * Добавить экшен редюсера
     * @param name имя экшена в редюсере (нужно для устранения конфликта имён при экспорте из редюсера)
     * @param action {function} новый экшен редюсера
     * @returns {SliceManager}
     */
    addAction = (name, action) => {
        this.#actionCollection[name] = action;
        return this;
    };

    /**
     * Назначить загрузчик
     * @param loader загрузчик данных
     * @returns {SliceManager}
     */
    setLoader = (loader) => {
        this.#loader = loader;
        return this;
    };

    /**
     * Добавить кейс экстраредюсера
     * @param cases кейсы экстра редюсера
     * @returns {SliceManager}
     */
    addCases = (cases) => {
        this.#caseCollection.push(cases);
        return this;
    };

    /**
     * Создать слайс
     * @returns {CustomSlice}
     */
    build = () => {
        //Проверка имени слайса
        if (!this.#name) throw new Error("Не задано имя слайса");

        //Проверка url-а
        if (this.#isApiResource && !this.#initialState.url) throw new Error("Не задан путь ресурса api");

        //Проверка существования лоудера. Если его нет, создать новый дефолтный
        if (!this.#loader) {
            this.#loader = getNewLoader();
        }

        //Проверка наличия кейсов. Если их нет, создать дефолтные
        if (!this.#caseCollection.length) {
            this.#caseCollection.push(CaseCreator.create(this.#loader).build());
        }

        //Создание слайса
        this.#slice = createSlice({
            name: this.#name,
            initialState: this.#initialState,
            reducers: this.#actionCollection,
            extraReducers: (builder) => {
                this.#caseCollection.forEach(cases => cases(builder));
            },
        });

        return new CustomSlice(this.#slice, this.#loader, this.#actionCollection);
    };
}

export default SliceManager;