<template>
  <div class="user-settings-container">
    <h2>Nutzereinstellungen</h2>

    <div>
      <label>Lieblings-Mensen:</label>
      <ul v-if="favoriteMensas.length > 0">
        <li v-for="(mensa, index) in favoriteMensas" :key="index">
          {{ mensa.name }}
          <button @click="removeFavoriteMensa(index)">Entfernen</button>
        </li>
      </ul>
      <p v-if="favoriteMensas.length === 0">Keine Lieblings-Mensen vorhanden.</p>
    </div>

    <div>
      <label>Lieblingsspeisen:</label>
      <ul v-if="favoriteMeals.length > 0">
        <li v-for="(meal, index) in favoriteMeals" :key="index">
          {{ meal.name }}
          <button @click="removeFavoriteMeal(index)">Entfernen</button>
        </li>
      </ul>
      <p v-if="favoriteMeals.length === 0">Keine Lieblingsspeisen vorhanden.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Mensa, MenuItem } from '@/types/mensainterface';

const favoriteMensas = ref<Mensa[]>([]);
const favoriteMeals = ref<MenuItem[]>([]);

const FAVORITE_MENSA_KEY = 'favoriteMensas';
const FAVORITE_MEALS_KEY = 'favoriteMeals';

const loadFavoriteMensas = () => {
  const storedFavorites = localStorage.getItem(FAVORITE_MENSA_KEY);
  if (storedFavorites) {
    favoriteMensas.value = JSON.parse(storedFavorites);
  } else {
    favoriteMensas.value = [];
  }
};

const loadFavoriteMeals = () => {
  const storedFavorites = localStorage.getItem(FAVORITE_MEALS_KEY);
  if (storedFavorites) {
    favoriteMeals.value = JSON.parse(storedFavorites);
  } else {
    favoriteMeals.value = [];
  }
};

const removeFavoriteMensa = (index: number) => {
  favoriteMensas.value.splice(index, 1);
  localStorage.setItem(FAVORITE_MENSA_KEY, JSON.stringify(favoriteMensas.value));
};

const removeFavoriteMeal = (index: number) => {
  favoriteMeals.value.splice(index, 1);
  localStorage.setItem(FAVORITE_MEALS_KEY, JSON.stringify(favoriteMeals.value));
};

onMounted(() => {
  loadFavoriteMensas();
  loadFavoriteMeals();
});
</script>


<style scoped>

.user-settings-container {
  padding: 0 2rem;
}

.language-container {
  .btn-container {
    display: flex;
    gap: 1rem;

    button {
      background: white;
      border: 1px solid black;
      color: black;
    }

    .active-button {
      background-color: #a2a2a2; /* Highlighted background color for the active button */
    }
  }
}

h2 {
  font-size: 2em;
  margin-bottom: 0.5em;
}

label {
  display: block;
  margin-bottom: 0.5em;
  font-weight: bold;
}

button {
  margin-top: 0.5em;
  padding: 0.5em 1em;
  font-size: 1em;
  border: none;
  border-radius: 4px;
  background-color: #5D4037;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #4e362f;
}

ul {
  list-style-type: none;
  padding-left: 0;
}

li {
  margin-bottom: 0.5em;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

li button {
  background-color: #d9534f;
}

li button:hover {
  background-color: #c9302c;
}
</style>
