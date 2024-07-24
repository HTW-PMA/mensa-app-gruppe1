<template>
  <div v-if="width > SMALL_BREAKPOINT" class="home-view">
    <div class="heading-container">
      <h1>{{ t('welcome') }}</h1>
      <h3>{{ t('discover') }}</h3>
      <div v-if="loading" class="loading-state">
        <p>Loading...</p>
      </div>
      <div v-if="error" class="error-state">
        <p>Error loading data: {{ error }}</p>
        <button @click="retryFetch">Retry</button>
      </div>
      <RouterLink v-if="nearestMensa && !loading && !error" :to="`/mensa/${nearestMensa.id}`" class="next-meal-container">
        <div class="next-meal-content">
          <p>{{ t('nearest') }}:</p>
          <h3>{{ nearestMensa.name }} ({{ distanceToNearestMensa?.toFixed(2) }} km)</h3>
          <div>
            <LocationIcon />
            {{ nearestMensa.address.street }}, {{ nearestMensa.address.city }}
          </div>
        </div>
        <ChevronRightIcon />
      </RouterLink>
    </div>
    <img src="@/assets/home_vector.svg" alt="Mensa Marvel" class="mensa-logo" />
  </div>

  <div v-if="width < SMALL_BREAKPOINT" class="home-view">
    <div v-if="loading" class="loading-state">
      <p>Loading...</p>
    </div>
    <div v-if="error" class="error-state">
      <p>Error loading data: {{ error }}</p>
      <button @click="retryFetch">Retry</button>
    </div>
    <RouterLink v-if="nearestMensa && !loading && !error" :to="`/mensa/${nearestMensa.id}`" class="next-meal-container">
      <div class="next-meal-content">
        <p>{{ t('nearest') }}:</p>
        <h3>{{ nearestMensa.name }} ({{ distanceToNearestMensa?.toFixed(2) }} km)</h3>
        <div>
          <LocationIcon />
          {{ nearestMensa.address.street }}, {{ nearestMensa.address.city }}
        </div>
      </div>
      <ChevronRightIcon />
    </RouterLink>

    <div class="header-container">
      Mensen
      <router-link to="/mensa-list">alle anzeigen</router-link>
    </div>

    <RouterLink v-for="mensa in firstThreeMensas" :key="mensa.id" :to="`/mensa/${mensa.id}`" class="mensen-container">
      <div class="content-wrapper">
        <h3>{{ mensa.name }}</h3>
        <div class="address-info">
          <LocationIcon />
          <p>{{ mensa.address.street }}, {{ mensa.address.city }}</p>
        </div>
      </div>
      <ChevronRightIcon />
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { ref, onMounted, computed } from 'vue';
import { Mensa } from '@/types/mensainterface';
import localforage from 'localforage';
import { fetchMensas } from '@/service/mensaService';
import { SMALL_BREAKPOINT, windowService } from '@/service/windowService';
import LocationIcon from '@/assets/icons/LocationIcon.vue';
import ChevronRightIcon from '@/assets/icons/ChevronRightIcon.vue';

const { t, locale } = useI18n();
const location = ref<string | null>(null);
const nearestMensa = ref<Mensa | null>(null);
const mensas = ref<Mensa[]>([]);
const distanceToNearestMensa = ref<number | null>(null);
const loading = ref<boolean>(true);
const error = ref<string | null>(null);
const { width } = windowService();

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
  } catch (err) {
    error.value = 'Error fetching or saving mensas';
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
          (err) => {
            error.value = 'Error getting location';
            reject(err);
          }
      );
    } else {
      error.value = 'Geolocation is not supported by this browser.';
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
      const distance = getDistance(userLat, userLng, mensaLat, mensaLng);
      if (distance < minDistance) {
        minDistance = distance;
        closestMensa = mensa;
      }
    }
  });
  distanceToNearestMensa.value = minDistance;
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

const retryFetch = async () => {
  error.value = null;
  loading.value = true;
  await fetchMensasList();
  try {
    const userLocation = await getLocation();
    findNearestMensa(userLocation.latitude, userLocation.longitude);
  } catch (err) {
    error.value = 'Error fetching location';
  }
  loading.value = false;
};

onMounted(async () => {
  await retryFetch();
});

const firstThreeMensas = computed(() => {
  return mensas.value.slice(0, 3);
});
</script>

<style scoped>
.home-view {
  display: flex;
  margin-bottom: 1rem;

  .heading-container {
    display: flex;
    flex-direction: column;
    justify-content: center;

    h1 {
      margin: 0 0 1rem 0;
      line-height: 3rem;
    }

    h3 {
      margin: 0;
      line-height: 1.5rem;
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }
}

.mensen-container {
  margin-top: 1rem;
  width: 100%;
  height: fit-content;
  padding: 1rem;
  border: solid 1px rgb(91, 54, 46, 0.21);
  border-radius: 12px;
  box-shadow: 0 6px 12px -4px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
  color: black;

  .content-wrapper {
    display: flex;
    flex-direction: column;

    h3,
    p {
      margin: 0;
    }

    .address-info {
      display: flex;
      align-items: center;
      gap: 5px;
    }
  }
}

.next-meal-container {
  text-decoration: none;
  color: black;
  margin-top: 2rem;
  width: fit-content;
  height: fit-content;
  padding: 1rem;
  border: solid 1px rgb(91, 54, 46, 0.21);
  border-radius: 12px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1), 0 15px 30px rgba(0, 0, 0, 0.1), 0 40px 40px rgba(0, 0, 0, 0.1), 0 80px 60px rgba(0, 0, 0, 0.05), 0 130px 85px rgba(0, 0, 0, 0.02);

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  .next-meal-content {
    display: flex;
    flex-direction: column;
    gap: 5px;

    p,
    h3 {
      margin: 0;
    }

    div {
      gap: 5px;
      display: flex;
    }
  }
}

.loading-state,
.error-state {
  text-align: center;
  margin-top: 20px;
}

.error-state button {
  margin-top: 10px;
}

@media (max-width: 690px) {
  .home-view {
    display: flex;
    flex-direction: column;
    padding: 0 2rem;
    align-items: center;
    margin-bottom: 100px;

    .header-container {
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin-top: 2rem;
      margin-bottom: 0.5rem;

      a {
        color: black;
      }
    }

    .next-meal-container {
      margin-top: 1rem;
      width: 100%;
      height: fit-content;
      box-shadow: 0 6px 12px -4px rgba(0, 0, 0, 0.2);
    }
  }
}

@media screen and (min-width: 690px) and (max-width: 1024px) {
  .home-view {
    flex-wrap: wrap;
    text-align: center;

    .heading-container {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 2rem;
    }

    .next-meal-container {
      text-align: start;
    }
  }
}

@media (min-width: 690px) {
  .home-view {
    justify-content: center;
    gap: 1rem;

    .header-container {
      align-items: center !important;
    }
  }
}

@media (max-width: 1250px) {
  .home-view {
    img {
      width: 650px;
    }
  }
}
</style>
