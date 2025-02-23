import {stubLoader} from "./stubLoader.js";
import {getNewLoader} from "./getNewLoader.js";
import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

/** Выдача инструментов для отправки запросов на сервер */


/**
 * Загрузчик данных из заглушки
 *
 * При вызове в качестве аргумента необходимо передать массив [url, converter].
 * Второй параметр необязательный.
 * @returns {[string,Function]}
 */
export const getStubLoader = () => stubLoader;

/**
 * Простой загрузчик данных
 *
 * При вызове в качестве аргумента необходимо передать массив [url, converter].
 * Второй параметр необязательный.
 * @returns {AsyncThunk<Promise<Promise<*> | *>, [*,function(*): *], AsyncThunkConfig>}
 */
export const getSimpleLoader = () => getNewLoader();

/**
 * Загрузчик данных с предустановленным url-ом
 *
 * При вызове загрузчика необходимо передать ключ запроса
 * @param name имя для префикса загрузчика
 * @param url адрес ручки
 * @returns {AsyncThunk<axios.AxiosResponse<any> | RejectWithValue<AsyncThunkConfig extends {rejectValue: infer RejectValue} ? RejectValue : unknown, AsyncThunkConfig extends {rejectedMeta: infer RejectedMeta} ? RejectedMeta : unknown>, [*,*], AsyncThunkConfig>}
 */
export const getOptionalLoader = (name, url) => getResourceInteraction(name, url, 'get');

/**
 * Обновитель данных
 *
 * При вызове необходимо передать объект типа {searchKey: ${id}, data: any},
 * где data - это любые данные отправляемые на сервер для обновления
 * @param name имя для префикса загрузчика
 * @param url адрес ручки
 * @returns {AsyncThunk<axios.AxiosResponse<any> | RejectWithValue<AsyncThunkConfig extends {rejectValue: infer RejectValue} ? RejectValue : unknown, AsyncThunkConfig extends {rejectedMeta: infer RejectedMeta} ? RejectedMeta : unknown>, [*,*], AsyncThunkConfig>}
 */
export const getUpdater = (name, url) => getResourceInteraction(name, url, 'update');

/**
 * Загрузчик данных на сервер
 *
 * При вызове необходимо передать объект типа {searchKey: ${id}, data: any},
 * где data - это любые данные отправляемые на сервер для обновления
 * @param name имя для префикса загрузчика
 * @param url адрес ручки
 * @returns {AsyncThunk<axios.AxiosResponse<any> | RejectWithValue<AsyncThunkConfig extends {rejectValue: infer RejectValue} ? RejectValue : unknown, AsyncThunkConfig extends {rejectedMeta: infer RejectedMeta} ? RejectedMeta : unknown>, [*,*], AsyncThunkConfig>}
 */
export const getPublisher = (name, url) => getResourceInteraction(name, url, 'post');

/**
 * Удалитель данных с сервера
 *
 * При вызове необходимо передать ключ запроса
 * @param name имя для префикса загрузчика
 * @param url адрес ручки
 * @returns {AsyncThunk<axios.AxiosResponse<any> | RejectWithValue<AsyncThunkConfig extends {rejectValue: infer RejectValue} ? RejectValue : unknown, AsyncThunkConfig extends {rejectedMeta: infer RejectedMeta} ? RejectedMeta : unknown>, [*,*], AsyncThunkConfig>}
 */
export const getDeleter = (name, url) => getResourceInteraction(name, url, 'delete');

/**
 * Получить объект взаимодействия с api
 * @param name имя для префикса загрузчика
 * @param url адрес ручки
 * @param method метод запроса
 * @returns {AsyncThunk<axios.AxiosResponse<any> | RejectWithValue<AsyncThunkConfig extends {rejectValue: infer RejectValue} ? RejectValue : unknown, AsyncThunkConfig extends {rejectedMeta: infer RejectedMeta} ? RejectedMeta : unknown>, [*,*], AsyncThunkConfig>}
 */
export const getResourceInteraction = (name, url, method) => {
    const methods = ['get', 'post', 'put', 'delete'];

    //Неизвестный метод запроса
    if (!methods.includes(method)) {
        throw new Error('Указанный метод не поддерживается');
    }

    //Обновлённое название манипулятора ресурсами
    name = 'site/' + name;

    //Шаблоны управления ресурсами
    const requests = {
        get: (params = null) => {
            //Проверка параметризированного get-запроса
            if (params) {
                url += '/' + params;
            }
            return axios.get(url);
        },
        post: (params) => {
            checkIncludeParams(params);
            checkDataParams(params);
            url += '/' + params.searchKey;
            return axios.post(url, params.data);
        },
        put: (params) => {
            checkIncludeParams(params);
            checkDataParams(params);
            url += '/' + params.searchKey;
            return axios.put(url, params.data);
        },
        delete: (params) => {
            checkIncludeParams(params);
            url += '/' + params;
            return axios.delete(url);
        },
    }

    /**
     * Проверка параметров запроса
     * @param params параметры запроса
     */
    const checkIncludeParams = (params) => {
        if (!params) {
            throw new Error('Не переданы параметры запроса');
        }
    };

    /**
     * Проверка корректности параметров для post и put запросов
     * @param params
     */
    const checkDataParams = (params) => {
        if (!params.searchKey) {
            throw new Error('Не передан ключ запроса (id, name и т.д.)');
        }

        if (!params.data) {
            throw new Error('Не передано тело запроса')
        }
    };

    return createAsyncThunk(name,async (params = null, thunkAPI = null) => {
            const request = requests[method](params);

            return request
                .then(response => response.data)
                .catch(error => {
                    console.error(error);
                    return thunkAPI.rejectWithValue(error.message);
                });
        }
    );
};