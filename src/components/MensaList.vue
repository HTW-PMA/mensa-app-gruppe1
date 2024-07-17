<template>
  <div class="mensa-list-container">
    <h1>{{ t('mensaList.title') }}</h1>

    <div class="filters">
      <input v-model="filters.name" @input="applyFilters" placeholder="{{ t('filters.filterName') }}" />
      <input v-model="filters.zipcode" @input="applyFilters" placeholder="{{ t('filters.filterZipcode') }}" />
      <input v-model="filters.district" @input="applyFilters" placeholder="{{ t('filters.filterDistrict') }}" />
      <input v-model="filters.openAt" @input="applyFilters" placeholder="{{ t('filters.filterOpenAt') }}" type="time" />
    </div>

    <div v-if="loading" class="loading-spinner"></div>

    <ul v-else-if="filteredMensas.length > 0" class="mensa-list">
      <li v-for="mensa in filteredMensas" :key="mensa.id" class="mensa-item">
        <img v-if="mensa.img" :src="getImgUrl(mensa.img)" :alt="`Mensa ${mensa.name} Image`" loading="lazy" class="mensa-image" />
        <div class="mensa-details">
          <h2>{{ mensa.name }}</h2>
          <p>{{ mensa.address.street }}, {{ mensa.address.city }}</p>
          <p v-if="mensa.contactInfo.phone">{{ t('phone') }}: {{ mensa.contactInfo.phone }}</p>
          <p v-if="mensa.contactInfo.email">{{ t('email') }}: {{ mensa.contactInfo.email }}</p>
          <ul>
            <li v-for="day in mensa.businessDays" :key="day.day">
              <strong>{{ day.day }}</strong>:
              <ul>
                <li v-if="day.businessHours.length > 0" v-for="hour in day.businessHours" :key="`${hour.openAt}-${hour.closeAt}`">
                  {{ hour.openAt }} - {{ hour.closeAt }} ({{ hour.businessHourType }})
                </li>
                <li v-else>{{ t('closed') }}</li>
              </ul>
            </li>
          </ul>
        </div>
      </li>
    </ul>

    <p v-else>
      {{ t('noMensasFound') }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { fetchMensas } from '../types/mensaService';
import localforage from 'localforage';
import {Mensa} from "@/types/mensainterface"; // corrected import

const { t } = useI18n();

const mensas = ref<Mensa[]>([]);
const loading = ref<boolean>(true);
const filters = ref({
  name: '',
  zipcode: '',
  district: '',
  openAt: '',
});

const applyFilters = () => {
  loading.value = true;
  fetchMensasList().then(() => {
    loading.value = false;
    console.log('Filters applied successfully');
  });
};

const fetchMensasList = async () => {
  try {
    const data = await fetchMensas(); // assuming fetchMensas returns an array of Mensa objects
    mensas.value = data;
    loading.value = false;

    await localforage.setItem('mensaData', data);
    console.log('Mensa data successfully saved in IndexedDB:', data);
  } catch (error) {
    console.error('Error fetching or saving mensas:', error);
    loading.value = false;
  }
};

const filteredMensas = computed(() => {
  return mensas.value.filter((mensa) => {
    const nameMatch = mensa.name.toLowerCase().includes(filters.value.name.toLowerCase());
    const zipcodeMatch = mensa.address.zipcode.includes(filters.value.zipcode);
    const districtMatch = mensa.address.district.toLowerCase().includes(filters.value.district.toLowerCase());
    const openAtMatch = filters.value.openAt ? mensa.businessDays.some((day) =>
        day.businessHours.some((hour) => hour.openAt <= filters.value.openAt && hour.closeAt >= filters.value.openAt)
    ) : true;

    return nameMatch && zipcodeMatch && districtMatch && openAtMatch;
  });
});

const getImgUrl = (file: File) => {
  return URL.createObjectURL(file);
};

const logMensaData = async () => {
  try {
    const data = await localforage.getItem('mensaData');
    console.log('Mensa data in IndexedDB:', data);
  } catch (error) {
    console.error('Error reading mensa data from IndexedDB:', error);
  }
};

onMounted(async () => {
  try {
    const data = await localforage.getItem<Mensa[]>('mensaData');
    if (data) {
      mensas.value = data;
      loading.value = false;
      console.log('Mensa data successfully loaded from IndexedDB:', data);
    } else {
      await fetchMensasList();
    }
  } catch (error) {
    console.error('Error fetching mensas from IndexedDB or API:', error);
    await fetchMensasList();
  }

  // Log the mensa data from IndexedDB
  logMensaData();
});
</script>

<style scoped>
/* CSS-Stile bleiben unverändert */
</style>
