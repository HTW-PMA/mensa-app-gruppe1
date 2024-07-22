<template>
  <div v-if="width > SMALL_BREAKPOINT" class="home-view">
    <div class="heading-container">
      <h1>{{ t('welcome') }}</h1>
      <h3>{{ t('discover') }}</h3>
      <a v-if="nearestMensa" class="next-meal-container">
        <h2>{{ t('nearest') }}</h2>
        <p>{{ nearestMensa.name }}</p>
        <div>
          <LocationIcon/>
          {{ nearestMensa.address.street }}, {{ nearestMensa.address.city }}
        </div>
      </a>
    </div>
    <img src="@/assets/home_vector.svg" alt="Mensa Marvel" class="mensa-logo"/>

  </div>

  <div v-if="width < SMALL_BREAKPOINT" class="home-view">
    <div class="next-meal-container">

    </div>

    <div class="header-container">
      Mensen
      <router-link to="/">alle anzeigen</router-link>
    </div>

    <div class="next-meal-container">

    </div>
  </div>
</template>

<script setup lang="ts">
import {useI18n} from 'vue-i18n';
import {ref, onMounted} from 'vue';
import {Mensa} from '@/types/mensainterface';
import localforage from "localforage";
import {fetchMensas} from "@/service/mensaService";
import {SMALL_BREAKPOINT, windowService} from "@/service/windowService";
import LocationIcon from "@/assets/icons/LocationIcon.vue";

const {t, locale} = useI18n();
const location = ref<string | null>(null);
const nearestMensa = ref<Mensa | null>(null);
const mensas = ref<Mensa[]>([]);
const loading = ref<boolean>(true);
const {width} = windowService()

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
            const {latitude, longitude} = position.coords;
            location.value = `Latitude: ${latitude}, Longitude: ${longitude}`;
            resolve({latitude, longitude});
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
      const {latitude: mensaLat, longitude: mensaLng} = mensa.address.geoLocation;
      const distance = getDistance(userLat, userLng, mensaLat, mensaLng);
      if (distance < minDistance) {
        minDistance = distance;
        closestMensa = mensa;
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


</script>

<style scoped>
.home-view {
  display: flex;

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

.next-meal-container {
  margin-top: 2rem;
  width: fit-content;
  height: fit-content;
  padding: 1rem;
  border: solid 1px rgb(91, 54, 46, 0.21);
  border-radius: 12px;
  box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.03), 0 15px 30px 0 rgba(255, 255, 255, 0.03),
  0 40px 40px 0 rgba(255, 255, 255, 0.03), 0 80px 60px 0 rgba(255, 255, 255, 0.01),
  0 130px 85px 0 rgba(255, 255, 255, 0);

  div {
    display: flex;
    align-items: center;
    gap: 5px;
  }
}

@media (max-width: 690px) {
  .home-view {
    display: flex;
    flex-direction: column;
    padding: 0 2rem;

    .header-container {
      display: flex;
      justify-content: space-between;
      margin-top: 2rem;
      margin-bottom: .5rem;
    }

    .next-meal-container {
      width: 100%;
      height: 80px;
      padding: 0;
    }
  }
}

@media screen and (min-width: 690px) and (max-width: 1024px) {
  .home-view {
    text-align: center;
    flex-wrap: wrap;

    .heading-container {
      display: flex;
      align-items: center;
      justify-content: center;
    }

  }
}

@media (min-width: 1025px) {
  .home-view {

    .header-container {
      width: 400px;
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

</style>
