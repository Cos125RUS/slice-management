import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";

/**
 * Загрузчик данных
 * @type {[string, function]}
 */
export const defaultLoader = createAsyncThunk(
    "site/defaultLoader",
    async ([endpoint = "homepages", converter], thunkAPI) => {
        const request = axios.get(endpoint);

        return request
            .then(response => converter(response.data))
            .catch(error => {
                console.error(error);
                return thunkAPI.rejectWithValue(error.message);
            });
    }
);