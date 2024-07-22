<template>
  <div v-if="mensa">
    <h1>{{ mensa.name }}</h1>
    <img :src="mensa.url" :alt="`Mensa ${mensa.name} Image`" />
    <p>{{ mensa.address.street }}, {{ mensa.address.city }}, {{ mensa.address.zipcode }}, {{ mensa.address.district }}</p>
    <p>Latitude: {{ mensa.address.geoLocation.latitude }}, Longitude: {{ mensa.address.geoLocation.longitude }}</p>
    <p v-if="mensa.contactInfo.phone">Phone: {{ mensa.contactInfo.phone }}</p>
    <p v-if="mensa.contactInfo.email">Email: {{ mensa.contactInfo.email }}</p>
    <ul>
      <li v-for="day in mensa.businessDays" :key="day.day">
        <strong>{{ day.day }}</strong>:
        <ul>
          <li v-for="hour in day.businessHours" :key="`${hour.openAt}-${hour.closeAt}`">
            {{ hour.openAt }} - {{ hour.closeAt }} ({{ hour.businessHourType }})
          </li>
        </ul>
      </li>
    </ul>
    <p>Last Updated: {{ mensa.lastUpdated }}</p>
    <div>
      <h3>Bewertungen</h3>
      <div v-if="mensa.canteenReviews.length > 0">
        <p>Durchschnittsbewertung: {{ mensa.canteenReviews[0].averageRating }}</p>
        <ul>
          <li v-for="review in mensa.canteenReviews[0].detailRatings" :key="review.name">
            {{ review.name }}: {{ review.rating }}
          </li>
        </ul>
        <p>{{ mensa.canteenReviews[0].comment }}</p>
      </div>
      <p v-else>Keine Bewertungen verfügbar</p>
    </div>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {useRoute} from 'vue-router';
import {Mensa} from '../types/mensainterface';
import {fetchMensaById} from '../service/mensaService';

const route = useRoute();
const mensa = ref<Mensa | null>(null);
const apiKey = 'EjGTzhCqu7TbBUwpN2x4H7YIRf5LIepS28Uc+Pn2k8IBkc05wDI6F+ZQbA13f67qSlENe8AU3UqL5Zzck+rERaYxrXKqISZQ6ut9/KIgGJoHs1VMlNvp0DfvWa69WzXyvdEEtTUN/3tsfxeGDG//UmzHTps9DnYKemomcgwGEPx+4U/dbv4L/QeHoTph8dLISK9ipWP2By5SjFKPreZoAJWuOy/6+u5uF23irGt5wBVZCFsdrvJUiIN72QURoF6aR9dzT+a8g1i9w9cFnTFxTtewRtm4lFY2ME/nmMIHKkchUuqfT0bNsxZL2dPfIo1E3ahzuNctbqUfdBBv1lslYw==';

const fetchMensaDetail = async () => {
  try {
    const data = await fetchMensaById(apiKey, route.params.id as string);
    mensa.value = data;
  } catch (error) {
    console.error('Error fetching mensa details:', error);
  }
};

onMounted(fetchMensaDetail);
</script>
