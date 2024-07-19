import localforage from 'localforage';
import { Mensa } from '@/types/mensainterface';
import {Meal} from "@/types/GerichteInterface";

const CACHE_KEY_MENSAS = 'mensas';
const CACHE_TIMESTAMP_KEY_MENSAS = 'mensas_timestamp';
const CACHE_KEY_MEALS = 'meals';
const CACHE_TIMESTAMP_KEY_MEALS = 'meals_timestamp';
const CACHE_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours

localforage.config({
    driver: localforage.INDEXEDDB,
    name: 'MensaDatabase',
    storeName: 'mensaStore',
    version: 1.0,
});

const getCachedData = async <T>(cacheKey: string, cacheTimestampKey: string): Promise<T | null> => {
    const cachedData = await localforage.getItem<T>(cacheKey);
    const cachedTimestamp = await localforage.getItem<number>(cacheTimestampKey);
    const now = Date.now();

    if (cachedData && cachedTimestamp && (now - cachedTimestamp) < CACHE_EXPIRY_MS) {
        return cachedData;
    }
    return null;
};

const setCachedData = async <T>(cacheKey: string, cacheTimestampKey: string, data: T): Promise<void> => {
    const now = Date.now();
    await localforage.setItem(cacheKey, data);
    await localforage.setItem(cacheTimestampKey, now);
};

export const getMensas = async (fetchMensas: () => Promise<Mensa[]>): Promise<Mensa[]> => {
    const cachedMensas = await getCachedData<Mensa[]>(CACHE_KEY_MENSAS, CACHE_TIMESTAMP_KEY_MENSAS);
    if (cachedMensas) {
        return cachedMensas;
    } else {
        const data = await fetchMensas();
        await setCachedData(CACHE_KEY_MENSAS, CACHE_TIMESTAMP_KEY_MENSAS, data);
        return data;
    }
};

export const getMeals = async (fetchMeals: () => Promise<Meal[]>): Promise<Meal[]> => {
    const cachedMeals = await getCachedData<Meal[]>(CACHE_KEY_MEALS, CACHE_TIMESTAMP_KEY_MEALS);
    if (cachedMeals) {
        return cachedMeals;
    } else {
        const data = await fetchMeals();
        await setCachedData(CACHE_KEY_MEALS, CACHE_TIMESTAMP_KEY_MEALS, data);
        return data;
    }
};
