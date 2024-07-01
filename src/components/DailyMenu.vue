<template>
  <div v-if="meals.length > 0">
    <h2>Tagesmenü</h2>
    <ul>
      <li v-for="meal in filteredMeals" :key="meal.ID">
        <h3>{{ meal.name }}</h3>
        <p>{{ meal.category }}</p>
        <p>Price: {{ meal.prices[0].price }} € ({{ meal.prices[0].priceType }})</p>
        <ul>
          <li v-for="additive in meal.additives" :key="additive.ID">{{ additive.text }}</li>
        </ul>
        <ul>
          <li v-for="badge in meal.badges" :key="badge.ID">{{ badge.name }}: {{ badge.description }}</li>
        </ul>
        <p>Water Balance: {{ meal.waterBilanz }} L</p>
        <p>CO2 Balance: {{ meal.co2Bilanz }} kg</p>
        <h4>Reviews</h4>
        <div v-for="review in meal.mealReviews" :key="review.ID">
          <p>Average Rating: {{ review.averageRating }}</p>
          <ul>
            <li v-for="rating in review.detailRatings" :key="rating.name">{{ rating.name }}: {{ rating.rating }}</li>
          </ul>
          <p>{{ review.comment }}</p>
        </div>
      </li>
    </ul>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { fetchMeals } from '../types/menuService';
import type { Meal } from '../types/menuInterface';

const meals = ref<Meal[]>([]);
const loading = ref<boolean>(true);
const filter = ref<string>('');

const fetchMenu = async () => {
  try {
    meals.value = await fetchMeals();
    loading.value = false;
  } catch (error) {
    console.error('Error fetching daily menu:', error);
    loading.value = false;
  }
};

const filteredMeals = computed(() => {
  if (!filter.value) return meals.value;
  return meals.value.filter(meal =>
    meal.badges.some(badge => badge.name.toLowerCase().includes(filter.value.toLowerCase()))
  );
});

onMounted(fetchMenu);
</script>


<style scoped>

</style>
