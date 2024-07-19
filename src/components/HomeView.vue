<template>
  <div class="home-view">
    <header class="header">
      <h1>{{ t('welcome') }}</h1>
      <p>{{ t('discover') }}</p>
      <img src="@/assets/Mensa%20Marvel%20(4).png" alt="Mensa Marvel" class="mensa-logo" />
      <div v-if="nearestMensa">
        <h2>{{ t('nearest') }}</h2>
        <p>{{ nearestMensa.name }}</p>
        <p>{{ nearestMensa.address.street }}, {{ nearestMensa.address.city }}</p>
      </div>
    </header>
    <footer class="footer">
      <nav>
        <ul>
          <li><button @click="changeLocale('en')">English</button></li>
          <li><button @click="changeLocale('de')">Deutsch</button></li>
        </ul>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { ref, onMounted } from 'vue';
import { Mensa } from '@/types/mensainterface';
import localforage from "localforage";
import {fetchMensas} from "@/types/mensaService";

const { t, locale } = useI18n();
const location = ref<string | null>(null);
const nearestMensa = ref<Mensa | null>(null);
const mensas = ref<Mensa[]>([]);
const loading = ref<boolean>(true);

const CACHE_KEY = 'mensaData';
const CACHE_TIMESTAMP_KEY = 'mensaDataTimestamp';
const CACHE_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 Stunden

const fetchMensasList = async () => {
  try {
    const cachedData = await localforage.getItem<Mensa[]>(CACHE_KEY);
    const cachedTimestamp = await localforage.getItem<number>(CACHE_TIMESTAMP_KEY);
    const now = Date.now();

    if (cachedData && cachedTimestamp && (now - cachedTimestamp) < CACHE_EXPIRY_MS) {
      mensas.value = cachedData;
    } else {
      const data = await fetchMensas();
      mensas.value = data;
      await localforage.setItem(CACHE_KEY, data);
      await localforage.setItem(CACHE_TIMESTAMP_KEY, now);
    }
    loading.value = false;
  } catch (error) {
    console.error('Error fetching or saving mensas:', error);
    loading.value = false;
  }
};
const getLocation = () => {
  return new Promise<{ latitude: number; longitude: number }>((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            location.value = `Latitude: ${latitude}, Longitude: ${longitude}`;
            resolve({ latitude, longitude });
          },
          (error) => {
            console.error('Error getting location:', error);
            location.value = 'Unable to retrieve location';
            reject(error);
          }
      );
    } else {
      location.value = 'Geolocation is not supported by this browser.';
      reject(new Error('Geolocation is not supported by this browser.'));
    }
  });
};

const findNearestMensa = (userLat: number, userLng: number) => {
  let minDistance = Infinity;
  let closestMensa: Mensa | null = null;

  mensas.value.forEach((mensa) => {
    if (mensa.address && mensa.address.geoLocation) {
      const { latitude: mensaLat, longitude: mensaLng } = mensa.address.geoLocation;
      if (typeof mensaLat === 'number' && typeof mensaLng === 'number') {
        const distance = getDistance(userLat, userLng, mensaLat, mensaLng);

        if (distance < minDistance) {
          minDistance = distance;
          closestMensa = mensa;
        }
      }
    }
  });

  nearestMensa.value = closestMensa;
  console.log('Nearest Mensa:', closestMensa);
};

const getDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const R = 6371; // Radius of the Earth in km
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

onMounted(async () => {
  try {
    const data = await localforage.getItem<Mensa[]>('mensaData');
    if (data) {
      mensas.value = data;
      loading.value = false;
    } else {
      await fetchMensasList();
    }
    const userLocation = await getLocation();
    findNearestMensa(userLocation.latitude, userLocation.longitude);
  } catch (error) {
    console.error('Error fetching Mensas or getting location:', error);
  }
});

const changeLocale = (lang: 'en' | 'de') => {
  locale.value = lang;
};
</script>

<style scoped>
.home-view {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  color: #F8E8E1; /* Dunkelbraun */
  background-color: #F8E8E1; /* Helles Beige */
  padding: 2rem;
}

.header {
  text-align: center;
  margin-bottom: 2rem;
}

.footer {
  text-align: center;
  margin-top: 2rem;
}

.footer nav ul {
  list-style: none;
  padding: 0;
}

.footer nav ul li {
  display: inline;
  margin-right: 1rem;
}

.footer nav ul li button {
  background: none;
  border: none;
  color: #8D6E63; /* Brauntöne für die Buttons */
  cursor: pointer;
  text-decoration: none;
}

.footer nav ul li button:hover {
  color: #F8E8E1; /* Helles Beige für Hover */
}
</style>
