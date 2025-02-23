/**
 * Сортировка данных по id
 * @param data
 * @returns {*}
 */
export const sortByIdConverter = (data) => {
    data.sort((current, next) => current.id - next.id);

    return data;
};