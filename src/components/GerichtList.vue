<template>
  <div class="GerichtList">
    <img src="@/assets/Mensa%20Marvel%20(4).png" alt="Mensa Marvel" class="mensa-logo" />
    <h1>Gerichte</h1>

    <!-- Filters -->
    <div class="filters">
      <input v-model="searchQuery" @input="applyFilters" placeholder="Nach Gericht suchen" />
      <select v-model="sortOption" @change="applyFilters">
        <option value="name">Name</option>
        <option value="category">Kategorie</option>
      </select>
    </div>

    <div v-if="loading" class="loading-spinner">
      Loading...
    </div>

    <!-- List of Meals -->
    <ul v-else-if="filteredMeals.length > 0" class="gericht-list">
      <li v-for="meal in filteredMeals" :key="meal.ID" class="meal-item">
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
          <button @click="toggleFavoriteDish(meal.name)">
            {{ isFavorite(meal.name) ? 'Aus Lieblingsgerichten entfernen' : 'Als Lieblingsgericht auswählen' }}
          </button>
        </div>
      </li>
    </ul>

    <!-- No meals found message -->
    <p v-else>
      No meals found. Please try again later or contact support.
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { fetchMeal } from '../service/GerichteService';
import type { Meal } from '../types/GerichteInterface';
import localforage from 'localforage';

// Einstellungen für lokale Speicherung
const FAVORITE_DISHES_KEY = 'favoriteDishes';

// Initiale Daten
const meals = ref<Meal[]>([]);
const loading = ref(true);
const favoriteDishes = ref<string[]>([]);
const apiKey = 'KJFzc/5w7I61UPPRrP8Is1Fq8ZTgvx93RIcuckfzqXqeEYIuwcJq7Ut1ZfasBnIppFJxkqCi7MOnME15cppwGbd9689hWV97bWPxmgTykB7pT1oCOWQlJFTVt/1nl1imKVNyRpPHGbR7ZYoTl7QAOQRtom/+iTt6+AcgaKLzBzrGqoxWbuRQEcLv98jhGE9Sibojc0Oj8n5GYn2xKfCcp/mJaFf23OSB3vPkcMPrEOPw+0TinGeu6LZZ4UFt8qeaKNi8jc+Tb9uEKeBUjOTM1co5RjyoKun2M5EWVTHYLRY8jZvF/VSJXLzHc6E3gp3dW7b3EPqE+/5RUZi5XFyWaQ==';
const CACHE_KEY = 'mealData';
const CACHE_TIMESTAMP_KEY = 'mealDataTimestamp';
const CACHE_EXPIRY_MS = 7 *24 * 60 * 60 * 1000; // 7 Tagen

// Lade die Favoriten aus localStorage
const loadFavoriteDishes = () => {
  const storedFavorites = localStorage.getItem(FAVORITE_DISHES_KEY);
  if (storedFavorites) {
    favoriteDishes.value = JSON.parse(storedFavorites);
  } else {
    favoriteDishes.value = [];
  }
};

// Speichere die Favoriten in localStorage
const saveFavoriteDishes = () => {
  localStorage.setItem(FAVORITE_DISHES_KEY, JSON.stringify(favoriteDishes.value));
};

// Initialisiere die Favoriten und die Gerichtsliste
const initializeData = async () => {
  loadFavoriteDishes();

  try {
    const cachedData = await localforage.getItem<Meal[]>(CACHE_KEY);
    const cachedTimestamp = await localforage.getItem<number>(CACHE_TIMESTAMP_KEY);
    const now = Date.now();

    if (cachedData && cachedTimestamp && (now - cachedTimestamp) < CACHE_EXPIRY_MS) {
      meals.value = cachedData;
    } else {
      const data = await fetchMeal(apiKey);
      meals.value = data.map(meal => ({
        ...meal,
        showDetails: false  // Initialize showDetails flag for each meal
      }));
      await localforage.setItem(CACHE_KEY, data);
      await localforage.setItem(CACHE_TIMESTAMP_KEY, now);
    }
    loading.value = false;
  } catch (error) {
    console.error('Error fetching or saving meals:', error);
    loading.value = false;
  }
};

// Handle Details Toggle
const toggleDetails = (meal: Meal) => {
  meal.showDetails = !meal.showDetails;
};

// Handle Favorite Toggle
const toggleFavoriteDish = (mealName: string) => {
  if (favoriteDishes.value.includes(mealName)) {
    favoriteDishes.value = favoriteDishes.value.filter((dish: string) => dish !== mealName);
  } else {
    favoriteDishes.value.push(mealName);
  }
  saveFavoriteDishes();
};

// Check if a dish is a favorite
const isFavorite = (mealName: string) => {
  return favoriteDishes.value.includes(mealName);
};

// Load meals on component mount
onMounted(() => {
  initializeData();
});

// Reactive search and sorting
const searchQuery = ref('');
const sortOption = ref('name'); // Default sorting option

const filteredMeals = computed(() => {
  let filteredList = meals.value;

  // Filter by search query
  if (searchQuery.value) {
    const lowerCaseQuery = searchQuery.value.toLowerCase();
    filteredList = filteredList.filter(meal =>
        meal.name.toLowerCase().includes(lowerCaseQuery)
    );
  }

  // Sort by selected option
  if (sortOption.value === 'name') {
    filteredList.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOption.value === 'category') {
    filteredList.sort((a, b) => a.category.localeCompare(b.category));
  }

  return filteredList;
});

const applyFilters = () => {

};
</script>


<style scoped>
.GerichtList {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  background-color: #F8E8E1; /* Helles Beige */
}

.loading-spinner {
  font-size: 1.2em;
  color: #888;
  margin-top: 20px;
}

.filters {
  margin-bottom: 20px;
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
  background-color: #FFF; /* Weiß für die einzelnen Gerichte */
  border: 1px solid #D7CCC8; /* Hellbraun für die Rahmen */
  padding: 10px;
}

.meal-details {
  text-align: left;
}

.btn-show-details {
  cursor: pointer;
  color: #8D6E63; /* Brauntöne für die Buttons */
}

.detailed-info {
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #D7CCC8; /* Hellbraun für die Rahmen */
}

/* Media Queries für Responsive Design */
@media (max-width: 600px) {
  /* Styles für kleine Bildschirme */
  .header nav {
    flex-direction: column;
    text-align: center;
  }

  .header nav a {
    margin: 0.5rem 0;
  }
}

@media (min-width: 601px) {
  /* Styles für größere Bildschirme */
  .header nav {
    flex-direction: row;
  }

  .header nav a {
    margin: 0 1rem;
  }
}

</style>
