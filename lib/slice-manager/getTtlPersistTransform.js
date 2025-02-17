import {createTransform} from "redux-persist";

/**
 * Получить трансформатор хранилища для данных со сроком хранения
 * @param ttl время хранения данных в миллисекундах
 * @param blackList список переменных без срока хранения
 * @param clearValues значения хранимые после удаления данных
 * @returns {Transform<null|any, {data: *, updatedAt: number}, any, any>}
 */
export const getTtlPersistTransform = (ttl, blackList = [], clearValues = {}) => createTransform(
    (inboundState) => {
        return {data: inboundState, updatedAt: Date.now()};
    },
    (outboundState, key) => {
        // Срок хранения истёк
        if (Date.now() - outboundState.updatedAt > ttl) {
            return clearValues.has(key) ? clearValues[key] : null;
        }
        return outboundState.data;
    },
    {blacklist: [...blackList, '_persist']}
);