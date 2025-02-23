import {SliceManager} from "./sliceManager.js";
import storage from "redux-persist/lib/storage";
import {PersistSlice} from "./persistSlice.js";
import {getTtlPersistTransform} from "./getTtlPersistTransform.js";

//Время жизни по умолчанию
const DEFAULT_TTL = 10; //TODO выставить нужное значение перед продом

/** Персистентный менеджер слайсов */
export class PersistSliceManager {
    #sliceManager;
    #config;
    #blackList = [];
    #key;
    #persistStorage;
    #transforms = [];
    #ttl;
    #transformBlackList = [];
    #clearValues = {};

    /**
     * @param name {string} имя слайса
     * @param initialState {{any}} данные инициализации
     * @param config {{any}|null} конфиг персистора
     * @param blackList {[string]} стисок исключений
     * @param customStorage переопределение хранилища (по умолчанию localstorage)
     * @param transforms {[{Transform<null|any, {data: *, updatedAt: number}, any, any>}]} трансформаторы данных хранения
     */
    constructor(name, initialState, config = null, blackList = [],
                customStorage = storage, transforms = []) {
        this.#sliceManager = new SliceManager(name, initialState, true);
        this.#config = config;
        this.#blackList = blackList;
        this.#persistStorage = customStorage;
        this.#transforms = transforms;
    }

    /**
     *
     * @param name {string} имя слайса
     * @param initialState {{any}|null} данные инициализации
     * @param isApiResource {boolean} (Игнорировать данный параметр)
     * @returns {PersistSliceManager}
     */
    static create(name = "", initialState = null, isApiResource = true) {
        return new PersistSliceManager(name, initialState);
    }

    /**
     * Задать конфиг
     * @param config {{any}} конфигурация хранилища
     * @returns {PersistSliceManager}
     */
    setConfig = (config) => {
        this.#config = config;
        return this;
    };

    /**
     * Задать ключ персистентного хранилища
     * @param key {string} ключ персистентного хранилища
     * @returns {PersistSliceManager}
     */
    setPersistKey = (key) => {
        this.#key = key;
        return this;
    };

    /**
     * Задать кастомное персистентное хранилище
     * @param customStorage другой тип хранилища, отличный от localstorage
     * @returns {PersistSliceManager}
     */
    setPersistStorage = (customStorage) => {
        this.#persistStorage = customStorage;
        return this;
    };

    /**
     * Задать список исключения для персистентного хранения
     * @param blackList {[string]} список с ключами переменных из слайса
     * @returns {PersistSliceManager}
     */
    setBlackList = (blackList) => {
        this.#blackList = blackList;
        return this;
    };

    /**
     * Добавить в список исключений персистентного хранения
     * @param key {string} ключ переменной в слайсе
     */
    addToBlackList = (key) => {
        this.#blackList.push(key);
        return this;
    };

    /**
     * Установить массив трансформаторов хранения данных
     * @param transforms {[{Transform<null|any, {data: *, updatedAt: number}, any, any>}]} массив трансформаторов
     * @returns {PersistSliceManager}
     */
    setTransforms = (transforms) => {
        this.#transforms = transforms;
        return this;
    }

    /**
     * Добавить трансформатор данных хранения
     * @param transform трансформатор хранения
     * @returns {PersistSliceManager}
     */
    addToTransforms = (transform) => {
        this.#transforms.push(transform);
        return this;
    };

    /**
     * Задать список исключения из ограничения по хранению
     * @param blackList список бессрочно хранимых переменных
     * @returns {PersistSliceManager}
     */
    setTransformBlackList = (blackList) => {
        this.#transformBlackList = blackList;
        return this;
    };

    /**
     * Добавить переменную в список бессрочно хранимых данных
     * @param value имя переменной в хранилище
     * @returns {PersistSliceManager}
     */
    addToTransformBlackList = (value) => {
        this.#transformBlackList.push(value);
        return this;
    };

    /**
     * Установить максимальное время хранения временных данных
     * @param ttl {bigint} время хранения (в миллисекундах)
     * @returns {PersistSliceManager}
     */
    setTtl = (ttl) => {
        this.#ttl = ttl;
        return this;
    };

    /**
     * Сделать хранение данных временным с настройками по умолчанию
     * @returns {PersistSliceManager}
     */
    setDefaultTemporary = () => {
        this.#ttl = DEFAULT_TTL;
        return this;
    };

    /**
     * Установить значение переменной в хранилище после удаления данных в виду устаревания
     * @param value {{key: value}} пустое значение
     * @returns {PersistSliceManager}
     */
    setClearValues = (value) => {
        this.#clearValues = value;
        return this;
    }

    /**
     * Добавить пустое значение для переменной
     * @param key {string} имя переменной в слайсе
     * @param value {*} пустое значение
     * @returns {PersistSliceManager}
     */
    addClearValue = (key, value) => {
        this.#clearValues[key] = value;
        return this;
    }

    /**
     * Установить имя слайса
     * @param name {string} новое имя слайса
     * @returns {PersistSliceManager}
     */
    setName = (name) => {
        this.#sliceManager.setName(name);
        return this;
    }

    /**
     * Установить данные при инициализации
     * @param newState новые данные инициализации
     * @returns {PersistSliceManager}
     */
    setInitialState = (newState) => {
        this.#sliceManager.setInitialState(newState);
        return this;
    };

    /**
     * Добавить данные инициализации
     * @param key ключ для получения данных (имя переменной в слайсе)
     * @param value передаваемое значение
     * @returns {PersistSliceManager}
     */
    addState = (key, value) => {
        this.#sliceManager.addState(key, value);
        return this;
    };

    /**
     * Установить url
     * @param url api ресурса
     * @returns {PersistSliceManager}
     */
    setUrl = (url) => {
        this.#sliceManager.setUrl(url)
        return this;
    };

    /**
     * Добавить экшен редюсера
     * @param name имя экшена в редюсере (нужно для устранения конфликта имён при экспорте из редюсера)
     * @param action {function} новый экшен редюсера
     * @returns {PersistSliceManager}
     */
    addAction = (name, action) => {
        this.#sliceManager.addAction(name, action);
        return this;
    };

    /**
     * Назначить загрузчик
     * @param loader загрузчик данных
     * @returns {PersistSliceManager}
     */
    setLoader = (loader) => {
        this.#sliceManager.setLoader(loader);
        return this;
    };

    /**
     * Добавить кейс экстраредюсера
     * @param cases кейсы экстра редюсера
     * @returns {PersistSliceManager}
     */
    addCases = (cases) => {
        this.#sliceManager.addCases(cases);
        return this;
    };

    /**
     * Создать персистентный слайс
     * @returns {PersistSlice}
     */
    build = () => {
        const customSlice = this.#sliceManager.build();

        if (!this.#config) {
            //Проверка на ограничение по времени хранения
            if (!this.#transforms.length) {
                //Если задано пустое значение или список исключения трансформатора хранимых данных, добавляем ttl
                if (this.#transformBlackList.length || Object.keys(this.#clearValues).length) {
                    this.#ttl = DEFAULT_TTL;
                }
                //Если есть ttl, создаём трансформатор хранимых данных
                if (this.#ttl) {
                    this.#transforms = [getTtlPersistTransform(
                        this.#ttl, this.#transformBlackList, this.#clearValues)];
                }
            }

            // Список всегда игнорируемых для хранения значений
            const blackList = ['url', 'isLoading', 'isError'];

            // Создание конфига
            this.#config = {
                key: this.#key ? this.#key : this.#sliceManager.getName(), //ключ в хранилище
                storage: this.#persistStorage ? this.#persistStorage : storage, //вид хранилища данных
                blacklist: this.#blackList.length ? [...this.#blackList, ...blackList] : blackList, //данные, которые не нужно сохранять в хранилище
                transforms: this.#transforms,
            }
        }

        return new PersistSlice(customSlice, this.#config);
    }
}