import localforage from 'localforage';
localforage.config({
    driver: localforage.INDEXEDDB,
    name: 'myApp',
    version: 1.0,
    storeName: 'Mensa Marvel',
    description: 'Local storage for Mensa data'
});
async function logMensaData() {
    try {
        const data = await localforage.getItem('mensaData');
        console.log('Mensa data in IndexedDB:', data);
    }
    catch (error) {
        console.error('Error reading mensa data from IndexedDB:', error);
    }
}
logMensaData();
export default localforage;
//# sourceMappingURL=localforage.js.map