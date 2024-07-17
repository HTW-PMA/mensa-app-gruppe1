<template>
  <div>
    <h2>LocalForage</h2>
    <form @submit.prevent="saveData">
      <label>Key:</label>
      <input v-model="key" required />
      <br />
      <label>Value:</label>
      <input v-model="value" required />
      <br />
      <button type="submit">Daten speichern</button>
    </form>

    <h3>Gespeicherte Daten:</h3>
    <ul>
      <li v-for="item in storedItems" :key="item.key">{{ item.key }}: {{ item.value }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import localforage from 'localforage';
import { ref, onMounted } from 'vue';

const storedItems = ref<{ key: string; value: any }[]>([]);
const key = ref<string>('');
const value = ref<any>('');

// LocalForage konfigurieren (optional)
localforage.config({
  driver: localforage.INDEXEDDB,
  name: 'myApp',
  version: 1.0,
  storeName: 'myData',
});

// Gespeicherte Daten beim Laden der Komponente abrufen
onMounted(async () => {
  try {
    const keys = await localforage.keys();
    const items = await Promise.all(keys.map(async (key) => {
      const value = await localforage.getItem(key);
      return { key, value };
    }));
    storedItems.value = items;
  } catch (error) {
    console.error('Fehler beim Abrufen der gespeicherten Daten:', error);
  }
});

// Funktion zum Speichern von Daten
const saveData = async () => {
  try {
    await localforage.setItem(key.value, value.value);
    storedItems.value.push({ key: key.value, value: value.value });
    key.value = '';
    value.value = '';
  } catch (error) {
    console.error('Fehler beim Speichern der Daten:', error);
  }
};
</script>
