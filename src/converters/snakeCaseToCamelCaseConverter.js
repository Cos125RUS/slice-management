/**
 * Конвертер ключей из змеиного регистра в верблюжий
 * @param data {Object|Array} Data for sorting (Данные для сортировки)
 * @returns {*}
 */
export const snakeCaseToCamelCaseConverter = (data) => {
    if (!Array.isArray(data)) {
        return converter(data);
    }

    return data.map(it => converter(it));
};

const converter = (it) => {
    const keys = Object.keys(it);
    const newObj = {};
    keys.forEach(key => {
        const parts = key.split('_');
        let newKey = key;
        if (parts.length > 1) {
            newKey = parts.reduce((acc, cur) => acc + cur.charAt(0).toUpperCase() + cur.slice(1));
        }
        if (typeof it[key] === 'object' && it[key] !== null) {
            newObj[newKey] = snakeCaseToCamelCaseConverter(it[key]);
        } else {
            newObj[newKey] = it[key];
        }
    });
    return newObj;
}