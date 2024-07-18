<template>
  <div class="mensa-list-container">
    <img src="@/assets/Mensa%20Marvel%20(4).png" alt="Mensa Marvel" class="mensa-logo" />
    <div class="header">
      <h1>{{ t('mensaList.title') }}</h1>
      <div class="language-switch">
        <button @click="changeLanguage('en')">EN</button>
        <button @click="changeLanguage('de')">DE</button>
      </div>
    </div>

    <div class="filters">
      <input v-model="filters.name" @input="applyFilters" :placeholder="t('filters.filterName')" />
      <input v-model="filters.zipcode" @input="applyFilters" :placeholder="t('filters.filterZipcode')" />
      <input v-model="filters.district" @input="applyFilters" :placeholder="t('filters.filterDistrict')" />
      <input v-model="filters.openAt" @input="applyFilters" :placeholder="t('filters.filterOpenAt')" type="time" />
    </div>

    <div v-if="loading" class="loading-spinner">{{ t('loading') }}</div>

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
              <strong>{{ t(`${day.day}`) }}</strong>:
              <ul>
                <li v-if="day.businessHours.length > 0" v-for="hour in day.businessHours" :key="`${hour.openAt}-${hour.closeAt}`">
                  {{ hour.openAt }} - {{ hour.closeAt }} ({{ t(`hourTypes.${hour.businessHourType}`) }})
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
import { Mensa } from '@/types/mensainterface';

const { t, locale } = useI18n();

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
  });
};

const fetchMensasList = async () => {
  try {
    const data = await fetchMensas();
    mensas.value = data;
    loading.value = false;
    await localforage.setItem('mensaData', data);
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

const changeLanguage = (lang: string) => {
  locale.value = lang;
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
  } catch (error) {
    console.error('Error fetching mensas from IndexedDB or API:', error);
    await fetchMensasList();
  }
});
</script>

<style scoped>
.mensa-list-container {
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.language-switch button {
  margin: 0 5px;
}

.filters input {
  display: block;
  margin-bottom: 10px;
  padding: 5px;
  width: 100%;
  max-width: 300px;
}

.mensa-list {
  list-style: none;
  padding: 0;
}

.mensa-item {
  margin-bottom: 20px;
  border: 1px solid #ccc;
  padding: 10px;
}

.mensa-details {
  margin-top: 10px;
}
</style>
