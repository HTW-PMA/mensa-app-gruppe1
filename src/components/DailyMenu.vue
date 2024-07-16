<template>
  <div class="daily-menu-container">
    <h1>Daily Menu</h1>

    <div v-if="loading" class="loading-spinner">
      Loading...
    </div>

    <ul v-else-if="meals.length > 0" class="meal-list">
      <li v-for="meal in meals" :key="meal.ID" class="meal-item">
        <div class="meal-details">
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
        </div>
      </li>
    </ul>

    <p v-else>
      No meals found. Please try again later or contact support.
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { fetchMeals } from '../types/menuService';
import type { Meal } from '../types/menuInterface';

const meals = ref<Meal[]>([]);
const loading = ref<boolean>(true);

const fetchMealsList = async () => {
  try {
    const fetchedMeals = await fetchMeals();
    console.log('Fetched meals:', fetchedMeals); // Debugging Log
    meals.value = fetchedMeals;
    loading.value = false;
  } catch (error) {
    console.error('Error fetching meals:', error);
    loading.value = false;
  }
};

onMounted(fetchMealsList);
</script>

<style scoped>
.daily-menu-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.loading-spinner {
  font-size: 1.2em;
  color: #888;
  margin-top: 20px;
}

.meal-list {
  list-style-type: none;
  padding: 0;
}

.meal-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.meal-details {
  flex: 1;
  text-align: left;
}

@media (max-width: 600px) {
  .meal-item {
    flex-direction: column;
    text-align: center;
  }
}
</style>
