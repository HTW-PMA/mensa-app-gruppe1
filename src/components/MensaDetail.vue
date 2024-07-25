<template>
  <div class="mensa-detail-container">
    <div v-if="loading" class="loading-state">
      <p>{{ t('loading') }}</p>
    </div>
    <div v-if="error" class="error-state">
      <p>{{ t('errorLoadingData') }}: {{ error }}</p>
      <button @click="fetchData">{{ t('tryAgain') }}</button>
    </div>
    <div v-if="mensa && !loading && !error" class="mensa-details">
      <div class="heading">
        <h2>{{ mensa.name }}</h2>
        <button @click="handleMensaBookmark">
          <template v-if="isMensaBookmarked">
            <UnBookmarkIcon/>
          </template>
          <template v-else>
            <BookmarkIcon/>
          </template>
        </button>
      </div>

      <div class="mensa-details-content">
        <LocationIcon/>
        <div class="address-container">
          <strong>{{ t('mensaDetails.address') }}</strong>
          {{ mensa.address.street }}, <br/>
          {{ mensa.address.zipcode }} {{ mensa.address.city }}
        </div>
      </div>
      <div class="mensa-details-content">
        <ClockIcon/>
        <div class="address-container">
          <strong>{{ t('mensaDetails.openingHours') }}</strong>
          <div
              v-for="openTime in mensa.businessDays"
              :key="openTime.day"
              class="open-time-container"
          >
            <strong>{{ openTime.day }}:</strong>
            <div
                v-for="times in openTime.businessHours"
                :key="times.openAt"
                class="times"
            >
              {{ times.businessHourType }}: {{ times.openAt }} - {{ times.closeAt }}
            </div>
            <div v-if="openTime.businessHours.length === 0">{{ t('closed') }}</div>
          </div>
        </div>
      </div>
      <div class="mensa-contact-info">
        <div>
          <PhoneIcon/>
          {{ mensa.contactInfo.phone }}
        </div>
        <div>
          <MailIcon/>
          {{ mensa.contactInfo.email }}
        </div>
      </div>
    </div>
    <div v-if="menue && !loading && !error" class="menue-container">
      <div class="menue-heading">
        <h3>{{ t('menue') }}</h3>
        <div class="col-md-6 mb-3">
          <label for="date-select" class="form-label">{{ t('date.select') }}: </label>
          <input type="date" id="date-select" v-model="selectedDate" @change="fetchMenue"
                 class="form-control"/>
        </div>
      </div>

      <div v-if="menue.meals.length === 0">{{ t('noSpeisen') }}</div>
      <div v-for="meal in menue.meals" :key="meal.ID" class="meal-container">
        <div class="meal-heading">
          <h4>{{ meal.name }}</h4>
          <button @click="() => handleMealBookmark(meal)">
            <template v-if="isMealBookmarked(meal)">
              <UnBookmarkIcon/>
            </template>
            <template v-else>
              <BookmarkIcon/>
            </template>
          </button>
        </div>

        <div class="meal-details">
          <div>
            <strong>{{ t('mealDetails.category') }}:</strong> {{ meal.category }}
          </div>
          <div>
            <strong>{{ t('mealDetails.prices') }}:</strong>
            <ul>
              <li v-for="price in meal.prices" :key="price.priceType">{{ price.priceType }}: {{ price.price }}€</li>
            </ul>
          </div>
          <div>
            <strong>{{ t('mealDetails.additives') }}:</strong>
            <ul>
              <li v-for="additive in meal.additives" :key="additive.ID">{{ additive.text }}</li>
            </ul>
          </div>
          <div>
            <strong>{{ t('mealDetails.badges') }}:</strong>
            <ul>
              <li v-for="badge in meal.badges" :key="badge.ID">{{ badge.name }} - {{ badge.description }}</li>
            </ul>
          </div>
          <div>
            <strong>{{ t('mealDetails.waterBilanz') }}:</strong> {{ meal.waterBilanz }} L
          </div>
          <div>
            <strong>{{ t('mealDetails.co2Bilanz') }}:</strong> {{ meal.co2Bilanz }} kg
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from 'vue';
import {useRoute} from 'vue-router';
import {Mensa} from '@/types/mensainterface';
import {fetchMenueByMensaId} from '@/services/menueService';
import {Meal, MenueResponse} from '@/types/menueInterface';
import LocationIcon from "@/assets/icons/LocationIcon.vue";
import ClockIcon from "@/assets/icons/ClockIcon.vue";
import MailIcon from "@/assets/icons/MailIcon.vue";
import PhoneIcon from "@/assets/icons/PhoneIcon.vue";
import BookmarkIcon from "@/assets/icons/BookmarkIcon.vue";
import UnBookmarkIcon from "@/assets/icons/UnBookmarkIcon.vue";
import {CANTEEN_DEBUG_DATA} from "@/types/tmpDataMensa";
import localforage from "localforage";
import {useI18n} from "vue-i18n";
const { t, locale } = useI18n();


const route = useRoute();
const mensa = ref<Mensa | undefined>(undefined);
const menue = ref<MenueResponse | null>(null);
const loading = ref<boolean>(true);
const error = ref<string | null>(null);
const selectedDate = ref<string>(new Date().toISOString().split('T')[0]);

const FAVORITE_MENSA_KEY = 'favoriteMensas';
const FAVORITE_DISHES_KEY = 'favoriteMeals';
const favoriteMensas = ref<Mensa[]>([]);
const favoriteMeals = ref<Meal[]>([]);

const CACHE_KEY = 'mensaData';
const CACHE_TIMESTAMP_KEY = 'mensaDataTimestamp';
const CACHE_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 Stunden

const fetchMenue = async () => {
  try {
    const today = new Date().toISOString().split('T')[0];
    menue.value = await fetchMenueByMensaId(route.params.id as string, selectedDate.value, selectedDate.value);
  } catch (err) {
    error.value = 'Error fetching menue details';
  }
};

const isMensaBookmarked = computed(() => {
  return mensa.value ? favoriteMensas.value.some(favMensa => favMensa.id === mensa.value!.id) : false;
});

const isMealBookmarked = (meal: Meal) => {
  return meal ? favoriteMeals.value.some(favMeal => favMeal.ID === meal.ID) : false;
};

const handleMensaBookmark = () => {
  if (!mensa.value) return;

  const index = favoriteMensas.value.findIndex(favMensa => favMensa.id === mensa.value!.id);
  if (index === -1) {
    favoriteMensas.value.push(mensa.value);
  } else {
    favoriteMensas.value.splice(index, 1);
  }
  saveFavoriteMensas();
};

const handleMealBookmark = (meal: Meal) => {
  if (!meal) return;

  const index = favoriteMeals.value.findIndex(favMeal => favMeal.ID === meal.ID);
  if (index === -1) {
    favoriteMeals.value.push(meal);
  } else {
    favoriteMeals.value.splice(index, 1);
  }
  saveFavoriteMeals();
};

const loadFavoriteMensas = () => {
  const storedFavorites = localStorage.getItem(FAVORITE_MENSA_KEY);
  if (storedFavorites) {
    favoriteMensas.value = JSON.parse(storedFavorites);
  } else {
    favoriteMensas.value = [];
  }
};

const saveFavoriteMensas = () => {
  localStorage.setItem(FAVORITE_MENSA_KEY, JSON.stringify(favoriteMensas.value));
};

// Lade die Favoriten aus localStorage
const loadFavoriteMeals = () => {
  const storedFavorites = localStorage.getItem(FAVORITE_DISHES_KEY);
  if (storedFavorites) {
    favoriteMeals.value = JSON.parse(storedFavorites);
  } else {
    favoriteMeals.value = [];
  }
};

// Speichere die Favoriten in localStorage
const saveFavoriteMeals = () => {
  localStorage.setItem(FAVORITE_DISHES_KEY, JSON.stringify(favoriteMeals.value));
};

const fetchData = async () => {
  error.value = null;
  loading.value = true;

  try {
    const cachedData = await localforage.getItem<Mensa[]>(CACHE_KEY);
    const cachedTimestamp = await localforage.getItem<number>(CACHE_TIMESTAMP_KEY);
    const now = Date.now();

    if (cachedData && cachedTimestamp && (now - cachedTimestamp) < CACHE_EXPIRY_MS) {
      mensa.value = cachedData.find(mensa => mensa.id === route.params.id as string);
    } else {
      mensa.value = CANTEEN_DEBUG_DATA.find(mensa => mensa.id === route.params.id as string);;
      await localforage.setItem(CACHE_KEY, CANTEEN_DEBUG_DATA);
      await localforage.setItem(CACHE_TIMESTAMP_KEY, now);
    }
    loading.value = false;
  } catch (error) {
    console.error('Error getting Data:', error);
  }

  await fetchMenue();
  loading.value = false;
};

onMounted(async () => {
  loadFavoriteMensas();
  loadFavoriteMeals();
  await fetchData();
});

</script>

<style scoped>
.mensa-detail-container {
  color: black;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(91, 54, 46, 0.21);
  border-radius: 12px;
  padding: 1rem;
  margin-top: 30px;
  box-shadow: 0 6px 12px -4px rgba(0, 0, 0, 0.2);
  margin-bottom: 1rem;

  .loading-state,
  .error-state {
    text-align: center;
    margin-top: 20px;
  }

  .error-state button {
    margin-top: 10px;
  }

  .mensa-details {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .heading {
      display: flex;
      justify-content: space-between;

      button {
        background: transparent;
        width: 50px;
        height: 50px;
        border-radius: 12px;
        cursor: pointer;
      }
    }

    .mensa-details-content {
      display: flex;
      gap: 10px;

      .address-container {
        display: flex;
        flex-direction: column;
      }
    }

    .mensa-contact-info {
      display: flex;
      flex-direction: column;

      div {
        display: flex;
        align-items: center;
        gap: 5px;
      }
    }
  }

  .menue-container {
    margin-top: 20px;

    .menue-heading {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .meal-container {
      border: 1px solid rgba(91, 54, 46, 0.21);
      border-radius: 8px;
      padding: 1rem;
      margin-bottom: 10px;
      box-shadow: 0 4px 8px -2px rgba(0, 0, 0, 0.2);

      .meal-heading {
        display: flex;
        justify-content: space-between;

        button {
          width: 50px;
          height: 50px;
          cursor: pointer;
        }
      }

      .meal-details {
        display: flex;
        flex-direction: column;
        gap: 5px;

        ul {
          padding-left: 1.5rem;
        }
      }
    }
  }
}

@media (max-width: 690px) {
  .mensa-detail-container {
    margin-bottom: 100px;
    margin-left: 1rem;
    margin-right: 1rem;
  }
}
</style>
