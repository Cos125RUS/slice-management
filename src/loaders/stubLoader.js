import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

/**
 * Загрузчик заглушек данных
 * @type {[string, function]}
 */
export const stubLoader = createAsyncThunk(
    "site/defaultLoader",
    async ([endpoint = "homepages", converter = data => data], thunkAPI) => {
        const request = axios.get(`/data/${endpoint}.json`);

        return request
            .then(response => converter(response.data))
            .catch(error => {
                console.error(error);
                return thunkAPI.rejectWithValue(error.message);
            });
    }
);