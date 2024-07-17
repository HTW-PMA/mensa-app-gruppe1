<template>
  <div class="GerichtList">
    <h1>Gerichte</h1>

    <div v-if="loading" class="loading-spinner">
      Loading...
    </div>

    <ul v-else-if="meals.length > 0" class="gericht-list">
      <li v-for="meal in meals" :key="meal.ID" class="meal-item">
        <div class="meal-details">
          <h3>{{ meal.name }}</h3>
          <p>{{ meal.category }}</p>
          <ul>
            <li v-for="price in meal.prices" :key="price.priceType">
              Preis für {{ price.priceType }}: {{ price.price }} €
            </li>
          </ul>
          <button @click="toggleDetails(meal)" class="btn-show-details">Über das Gericht mehr erfahren</button>

          <!-- Detailed information -->
          <div v-if="meal.showDetails" class="detailed-info">
            <ul>
              <li v-for="additive in meal.additives" :key="additive.ID">{{ additive.text }}</li>
            </ul>
            <ul>
              <li v-for="badge in meal.badges" :key="badge.ID">{{ badge.name }}: {{ badge.description }}</li>
            </ul>
            <p>Water Balance: {{ meal.waterBilanz }} L</p>
            <p>CO2 Balance: {{ meal.co2Bilanz }} kg</p>

            <!-- Reviews section -->
            <h4 v-if="meal.mealReviews.length > 0">Reviews</h4>
            <div v-if="meal.mealReviews.length > 0">
              <div v-for="review in meal.mealReviews" :key="review.ID">
                <p>Average Rating: {{ review.averageRating }}</p>
                <ul>
                  <li v-for="rating in review.detailRatings" :key="rating.name">{{ rating.name }}: {{ rating.rating }}</li>
                </ul>
                <p>{{ review.comment }}</p>
              </div>
            </div>
            <p v-else>No reviews available</p>
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
import { fetchMeal } from '../types/GerichteService';
import type { Meal } from '../types/GerichteInterface';

const meals = ref<Meal[]>([]);
const loading = ref(true);
const apiKey = 'EjGTzhCqu7TbBUwpN2x4H7YIRf5LIepS28Uc+Pn2k8IBkc05wDI6F+ZQbA13f67qSlENe8AU3UqL5Zzck+rERaYxrXKqISZQ6ut9/KIgGJoHs1VMlNvp0DfvWa69WzXyvdEEtTUN/3tsfxeGDG//UmzHTps9DnYKemomcgwGEPx+4U/dbv4L/QeHoTph8dLISK9ipWP2By5SjFKPreZoAJWuOy/6+u5uF23irGt5wBVZCFsdrvJUiIN72QURoF6aR9dzT+a8g1i9w9cFnTFxTtewRtm4lFY2ME/nmMIHKkchUuqfT0bNsxZL2dPfIo1E3ahzuNctbqUfdBBv1lslYw==';

const fetchMealsList = async () => {
  try {
    const data = await fetchMeal(apiKey);
    console.log('Fetched meals:', data);
    meals.value = data.map(meal => ({
      ...meal,
      showDetails: false  // Initialize showDetails flag for each meal
    }));
    loading.value = false;
  } catch (error) {
    console.error('Error fetching meals:', error);
    loading.value = false;
  }
};

const toggleDetails = (meal: Meal) => {
  meal.showDetails = !meal.showDetails;
};

onMounted(() => {
  const intersectionObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      fetchMealsList();
      intersectionObserver.disconnect();
    }
  });
  const target = document.querySelector('.GerichtList');
  if (target) {
    intersectionObserver.observe(target);
  } else {
    console.warn('IntersectionObserver target not found');
  }
});
</script>

<style scoped>
.GerichtList {
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

.gericht-list {
  list-style-type: none;
  padding: 0;
}

.meal-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.meal-details {
  text-align: left;
}

.btn-show-details {
  cursor: pointer;
  color: blue;
}

.detailed-info {
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #ccc;
}

@media (max-width: 600px) {
  .meal-item {
    text-align: center;
  }
}
</style>
