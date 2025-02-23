import {defaultLoader} from "../loaders/defaultLoader.js";

/**
 * Кейсы загрузчика ресурсов
 * @param builder
 */
export const loadingApiCases = (builder) => {
    builder
        .addCase(defaultLoader.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        })
        .addCase(defaultLoader.fulfilled, (state, action) => {
            state.data = action.payload;
            state.isLoading = false;
        })
        .addCase(defaultLoader.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        });
};