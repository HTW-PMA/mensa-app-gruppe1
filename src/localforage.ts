// src/localforage.ts
import localforage from 'localforage';

localforage.config({
    driver: localforage.INDEXEDDB,
    name: 'myApp',
    version: 1.0,
    storeName: 'keyvaluepairs',
    description: 'Some description'
});

export default localforage;
