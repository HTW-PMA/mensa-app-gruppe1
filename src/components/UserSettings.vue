<template>
  <div class="user-settings-container">
    <h2>{{ t('userSettings.title') }}</h2>

    <div>
      <label>{{ t('userSettings.favoriteMensas') }}:</label>
      <ul v-if="favoriteMensas.length > 0">
        <li v-for="(mensa, index) in favoriteMensas" :key="index">
          {{ mensa.name }}
          <button @click="removeFavoriteMensa(index)">{{ t('userSettings.remove') }}</button>
        </li>
      </ul>
      <p v-if="favoriteMensas.length === 0">{{ t('userSettings.noFavoriteMensa') }}</p>
    </div>

    <div>
      <label>{{ t('userSettings.favoriteMeals') }}:</label>
      <ul v-if="favoriteMeals.length > 0">
        <li v-for="(dish, index) in favoriteMeals" :key="index">
          {{ dish.name }}
          <button @click="removeFavoriteDish(index)">{{ t('userSettings.remove') }}</button>
        </li>
      </ul>
      <p v-if="favoriteMeals.length === 0">{{ t('userSettings.noFavoriteMeal') }}</p>
    </div>

    <div>
      <label>{{ t('userSettings.notificationSettings') }}:</label>
      <div>
        <input type="checkbox" v-model="notificationPreferences.daily" @change="updateNotificationPreferences"/>
        {{ t('userSettings.dailyNotifications') }}
      </div>
      <div>
        <input type="checkbox" v-model="notificationPreferences.newMeals" @change="updateNotificationPreferences"/>
        {{ t('userSettings.newMealsNotifications') }}
      </div>
      <div>
        <input type="checkbox" v-model="notificationPreferences.offers" @change="updateNotificationPreferences"/>
        {{ t('userSettings.offersNotifications') }}
      </div>
    </div>

    <div class="language-container">
      <label>{{ t('userSettings.language') }}:</label>

      <div class="btn-container">
        <button :class="{ 'active-button': locale === 'en' }" @click="changeLocale('en')">
          <ENIcon></ENIcon>
        </button>

        <button :class="{ 'active-button': locale === 'de' }" @click="changeLocale('de')">
          <DEIcon></DEIcon>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, watch, onMounted} from 'vue';
import {useI18n} from "vue-i18n";
import DEIcon from "@/assets/icons/DEIcon.vue";
import ENIcon from "@/assets/icons/ENIcon.vue";
import {Meal} from "@/types/menueInterface";

const {t, locale} = useI18n();

// LocalStorage keys
const FAVORITE_MENSA_KEY = 'favoriteMensas';
const FAVORITE_DISHES_KEY = 'favoriteMeals';
const NOTIFICATION_PREFERENCES_KEY = 'notificationPreferences';

// Reactive variables
const favoriteMensas = ref<any[]>([]);
const favoriteMeals = ref<Meal[]>([]);
const notificationPreferences = ref({
  daily: false,
  newMeals: false,
  offers: false
});

// Load settings from LocalStorage
const loadSettings = () => {
  const savedFavoriteMensas = localStorage.getItem(FAVORITE_MENSA_KEY);
  if (savedFavoriteMensas) {
    favoriteMensas.value = JSON.parse(savedFavoriteMensas);
  }
  const savedFavoriteMeals = localStorage.getItem(FAVORITE_DISHES_KEY);
  if (savedFavoriteMeals) {
    favoriteMeals.value = JSON.parse(savedFavoriteMeals);
  }
  const savedNotificationPreferences = localStorage.getItem(NOTIFICATION_PREFERENCES_KEY);
  if (savedNotificationPreferences) {
    notificationPreferences.value = JSON.parse(savedNotificationPreferences);
  }
};

// Function to remove a favorite dish
const removeFavoriteDish = (index: number) => {
  favoriteMeals.value.splice(index, 1);
};

// Function to remove a favorite mensa
const removeFavoriteMensa = (index: number) => {
  favoriteMensas.value.splice(index, 1);
};

// Function to update notification preferences
const updateNotificationPreferences = () => {
  if (Notification.permission === 'default' || Notification.permission === 'denied') {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        saveNotificationPreferences();
        showNotification(t('notifications.enabledTitle'), t('notifications.enabledBody'));
      }
    });
  } else {
    saveNotificationPreferences();
    showNotification(t('notifications.updatedTitle'), t('notifications.updatedBody'));
  }
};

// Function to save notification preferences
const saveNotificationPreferences = () => {
  localStorage.setItem(NOTIFICATION_PREFERENCES_KEY, JSON.stringify(notificationPreferences.value));
};

// Function to show a notification
const showNotification = (title: string, body: string) => {
  if (Notification.permission === 'granted') {
    new Notification(title, {body});
  }
};

// Watch and update localStorage when changes occur
watch(favoriteMensas, (newValue) => {
  localStorage.setItem(FAVORITE_MENSA_KEY, JSON.stringify(newValue));
}, {deep: true});

watch(favoriteMeals, (newValue) => {
  localStorage.setItem(FAVORITE_DISHES_KEY, JSON.stringify(newValue));
}, {deep: true});

watch(notificationPreferences, (newValue) => {
  saveNotificationPreferences();
}, {deep: true});

const changeLocale = (lang: 'en' | 'de') => {
  locale.value = lang;
};

// Load settings on component mount
onMounted(() => {
  loadSettings();
});
</script>

<style scoped>

.user-settings-container {
  padding: 0 2rem;
}

.language-container {
  .btn-container {
    display: flex;
    gap: 1rem;

    button {
      background: white;
      border: 1px solid black;
      color: black;
    }

    .active-button {
      background-color: #a2a2a2; /* Highlighted background color for the active button */
    }
  }
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
