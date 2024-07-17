<template>
  <div class="mensa-list-container">
    <img src="@/assets/Mensa%20Marvel%20(2).jpg" alt="Mensa Marvel" class="mensa-logo" />
    <h1>Mensa List</h1>

    <div class="filters">
      <input v-model="filters.name" @input="applyFilters" placeholder="Nach Name filtern" />
      <input v-model="filters.zipcode" @input="applyFilters" placeholder="Nach Postleitzahl filtern" />
      <input v-model="filters.district" @input="applyFilters" placeholder="Nach Bezirk filtern" />
      <input v-model="filters.openAt" @input="applyFilters" placeholder="Nach Öffnungszeit filtern (HH:MM)" type="time" />
    </div>

    <div v-if="loading" class="loading-spinner"></div>

    <ul v-else-if="filteredMensas.length > 0" class="mensa-list">
      <li v-for="mensa in filteredMensas" :key="mensa.id" class="mensa-item">
        <img
            v-if="mensa.img"
            :src="getImgUrl(mensa.img)"
            :alt="`Mensa ${mensa.name} Image`"
            loading="lazy"
            class="mensa-image"
        />
        <div class="mensa-details">
          <h2>{{ mensa.name }}</h2>
          <p>{{ mensa.address.street }}, {{ mensa.address.city }}</p>
          <p v-if="mensa.contactInfo.phone">Phone: {{ mensa.contactInfo.phone }}</p>
          <p v-if="mensa.contactInfo.email">Email: {{ mensa.contactInfo.email }}</p>
          <ul>
            <li v-for="day in mensa.businessDays" :key="day.day">
              <strong>{{ day.day }}</strong>:
              <ul>
                <li v-if="day.businessHours.length > 0" v-for="hour in day.businessHours" :key="`${hour.openAt}-${hour.closeAt}`">
                  {{ hour.openAt }} - {{ hour.closeAt }} ({{ hour.businessHourType }})
                </li>
                <li v-else>Geschlossen</li>
              </ul>
            </li>
          </ul>
        </div>
      </li>
    </ul>

    <p v-else>
      No Mensas found. Please try again later or contact support.
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import { Mensa } from '../types/mensainterface';
import { fetchMensas } from '../types/mensaService';
import localforage from 'localforage'; // Import von localforage hinzugefügt

export default defineComponent({
  name: 'MensaList',
  setup() {
    const mensas = ref<Mensa[]>([]);
    const loading = ref<boolean>(true);
    const apiKey = 'EjGTzhCqu7TbBUwpN2x4H7YIRf5LIepS28Uc+Pn2k8IBkc05wDI6F+ZQbA13f67qSlENe8AU3UqL5Zzck+rERaYxrXKqISZQ6ut9/KIgGJoHs1VMlNvp0DfvWa69WzXyvdEEtTUN/3tsfxeGDG//UmzHTps9DnYKemomcgwGEPx+4U/dbv4L/QeHoTph8dLISK9ipWP2By5SjFKPreZoAJWuOy/6+u5uF23irGt5wBVZCFsdrvJUiIN72QURoF6aR9dzT+a8g1i9w9cFnTFxTtewRtm4lFY2ME/nmMIHKkchUuqfT0bNsxZL2dPfIo1E3ahzuNctbqUfdBBv1lslYw==';

    const filters = ref({
      name: '',
      zipcode: '',
      district: '',
      openAt: '',
    });

    const fetchMensasList = async () => {
      try {
        const data = await fetchMensas(apiKey);
        mensas.value = data;
        loading.value = false;

        // Speichern der Daten in IndexedDB
        await localforage.setItem('mensaData', data);
      } catch (error) {
        console.error('Error fetching mensas:', error);
        loading.value = false;
      }
    };

    const applyFilters = () => {
      loading.value = true;
      fetchMensasList().then(() => {
        loading.value = false;
      });
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

    const getImgUrl = (file: File): string => {
      return URL.createObjectURL(file);
    };

    onMounted(() => {
      const intersectionObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          fetchMensasList();
          intersectionObserver.disconnect();
        }
      });

      const target = document.querySelector('.mensa-list-container');
      if (target) {
        intersectionObserver.observe(target);
      } else {
        console.warn('IntersectionObserver target not found');
      }

      // Explicitly type the callback function for getItem
      localforage.getItem<Mensa[]>('mensaData').then((data) => {
        if (data) {
          mensas.value = data;
          loading.value = false;
        } else {
          fetchMensasList(); // Wenn nicht vorhanden, neue Daten abrufen
        }
      }).catch((error) => {
        console.error('Error fetching mensas from IndexedDB:', error);
        fetchMensasList(); // Im Fehlerfall ebenfalls neue Daten abrufen
      });
    });

    return { mensas, loading, filters, filteredMensas, applyFilters, getImgUrl };
  },
});
</script>

<style scoped>
/* CSS-Stile bleiben unverändert */
</style>
