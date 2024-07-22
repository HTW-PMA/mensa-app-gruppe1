<template>
  <div>
    <h2>Nutzereinstellungen</h2>

    <div>
      <label>Lieblings-Mensen:</label>
      <ul>
        <li v-for="(mensa, index) in favoriteMensas" :key="index">
          {{ mensa.name }}
          <button @click="removeFavoriteMensa(index)">Entfernen</button>
        </li>
      </ul>
    </div>

    <div>
      <label>Lieblingsspeisen:</label>
      <ul>
        <li v-for="(dish, index) in favoriteDishes" :key="index">
          {{ dish }}
          <button @click="removeFavoriteDish(index)">Entfernen</button>
        </li>
      </ul>
    </div>

    <div>
      <label>Benachrichtigungseinstellungen:</label>
      <div>
        <input type="checkbox" v-model="notificationPreferences.daily" @change="updateNotificationPreferences" /> Tägliche Benachrichtigungen
      </div>
      <div>
        <input type="checkbox" v-model="notificationPreferences.newDishes" @change="updateNotificationPreferences" /> Benachrichtigungen über neue Gerichte
      </div>
      <div>
        <input type="checkbox" v-model="notificationPreferences.offers" @change="updateNotificationPreferences" /> Benachrichtigungen über Angebote
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';

// LocalStorage Schlüssel
const FAVORITE_MENSA_KEY = 'favoriteMensas';
const FAVORITE_DISHES_KEY = 'favoriteDishes';
const NOTIFICATION_PREFERENCES_KEY = 'notificationPreferences';

// Reactive Variablen
const favoriteMensas = ref<any[]>([]);
const favoriteDishes = ref<string[]>([]);
const notificationPreferences = ref({
  daily: false,
  newDishes: false,
  offers: false
});

// Lade Einstellungen aus LocalStorage
const loadSettings = () => {
  const savedFavoriteMensas = localStorage.getItem(FAVORITE_MENSA_KEY);
  if (savedFavoriteMensas) {
    favoriteMensas.value = JSON.parse(savedFavoriteMensas);
  }
  const savedFavoriteDishes = localStorage.getItem(FAVORITE_DISHES_KEY);
  if (savedFavoriteDishes) {
    favoriteDishes.value = JSON.parse(savedFavoriteDishes);
  }
  const savedNotificationPreferences = localStorage.getItem(NOTIFICATION_PREFERENCES_KEY);
  if (savedNotificationPreferences) {
    notificationPreferences.value = JSON.parse(savedNotificationPreferences);
  }
};

// Funktion zum Entfernen einer Lieblingsspeise
const removeFavoriteDish = (index: number) => {
  favoriteDishes.value.splice(index, 1);
};

// Funktion zum Entfernen einer Lieblings-Mensa
const removeFavoriteMensa = (index: number) => {
  favoriteMensas.value.splice(index, 1);
};

// Funktion zum Aktualisieren der Benachrichtigungseinstellungen
const updateNotificationPreferences = () => {
  if (Notification.permission === 'default' || Notification.permission === 'denied') {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        saveNotificationPreferences();
        showNotification('Benachrichtigungen aktiviert', 'Sie erhalten nun Benachrichtigungen gemäß Ihren Einstellungen.');
      }
    });
  } else {
    saveNotificationPreferences();
    showNotification('Benachrichtigungen aktualisiert', 'Ihre Benachrichtigungseinstellungen wurden aktualisiert.');
  }
};

// Funktion zum Speichern der Benachrichtigungseinstellungen
const saveNotificationPreferences = () => {
  localStorage.setItem(NOTIFICATION_PREFERENCES_KEY, JSON.stringify(notificationPreferences.value));
};

// Funktion zum Anzeigen einer Benachrichtigung
const showNotification = (title: string, body: string) => {
  if (Notification.permission === 'granted') {
    new Notification(title, { body });
  }
};

// Watch und Update localStorage, wenn Änderungen auftreten
watch(favoriteMensas, (newValue) => {
  localStorage.setItem(FAVORITE_MENSA_KEY, JSON.stringify(newValue));
}, { deep: true });

watch(favoriteDishes, (newValue) => {
  localStorage.setItem(FAVORITE_DISHES_KEY, JSON.stringify(newValue));
}, { deep: true });

watch(notificationPreferences, (newValue) => {
  saveNotificationPreferences();
}, { deep: true });

// Einstellungen beim Komponent-Mount laden
onMounted(() => {
  loadSettings();
});
</script>

<style scoped>
div {
  margin-bottom: 1em;
}

h2 {
  font-size: 2em;
  margin-bottom: 0.5em;
}

label {
  display: block;
  margin-bottom: 0.5em;
  font-weight: bold;
}

button {
  margin-top: 0.5em;
  padding: 0.5em 1em;
  font-size: 1em;
  border: none;
  border-radius: 4px;
  background-color: #5D4037;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #4e362f;
}

ul {
  list-style-type: none;
  padding-left: 0;
}

li {
  margin-bottom: 0.5em;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

li button {
  background-color: #d9534f;
}

li button:hover {
  background-color: #c9302c;
}
</style>
