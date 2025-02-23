import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

/**
 * Получить новый загрузчик данных
 * @returns {AsyncThunk<axios.AxiosResponse<any> | RejectWithValue<AsyncThunkConfig extends {rejectValue: infer RejectValue} ? RejectValue : unknown, AsyncThunkConfig extends {rejectedMeta: infer RejectedMeta} ? RejectedMeta : unknown>, [*,*], AsyncThunkConfig>}
 */
export const getNewLoader = () => {
    const name = crypto.randomUUID();

    return createAsyncThunk(
        "site/loader" + name,
        async ([endpoint, converter = data => data], thunkAPI) => {
            const request = axios.get(endpoint);

            return request
                .then(response => converter(response.data))
                .catch(error => {
                    console.error(error);
                    return thunkAPI.rejectWithValue(error.message);
                });
        }
    );
}