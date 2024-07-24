<template>
  <div class="mensa-list-container">
    <div class="header">
      <h2>{{ t('mensaList.title') }}</h2>
    </div>

    <!-- Dropdown zur Mensa-Auswahl -->
    <div class="mensa-selector row mb-4">
      <div class="col-md-6 mb-3">
        <label for="canteen-select" class="form-label">{{ t('selectCanteen') }}</label>
        <div class="input-group">
          <select id="canteen-select" v-model="selectedCanteenId" @change="fetchMenu"
                  class="form-select">
            <option v-for="mensa in mensas" :key="mensa.id" :value="mensa.id">
              {{ mensa.name }}
            </option>
          </select>
          <span class="input-group-text">
            <i class="bi bi-chevron-down"></i>
          </span>
        </div>
      </div>

      <!-- Datumsauswahl -->
      <div class="col-md-6 mb-3">
        <label for="date-select" class="form-label">{{ t('selectDate') }}</label>
        <input type="date" id="date-select" v-model="selectedDate" @change="fetchMenu"
               class="form-control"/>
      </div>
    </div>

    <!-- Ladeanzeige -->
    <div v-if="loading" class="loading-spinner">{{ t('loading') }}</div>

    <!-- Menü für die ausgewählte Mensa und Datum -->
    <div v-if="selectedCanteenId" class="menu-container">
      <h3>{{ t('MENÜ', { day: selectedDate }) }}</h3>
      <div v-if="menuItems.length" class="row">
        <div v-for="item in menuItems" :key="item.id" class="menu-item col-md-6 mb-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">{{ item.name }}</h5>
              <h6 class="card-subtitle mb-2 text-muted">
                Preis:
                <span v-for="price in item.prices" :key="price.priceType">
                  {{ price.priceType }}: {{ price.price }} €
                </span>
              </h6>
              <div v-if="item.additives.length" class="mt-2">
                <strong>Zusatzstoffe:</strong>
                <ul class="list-group list-group-flush">
                  <li v-for="additive in item.additives" :key="additive.id" class="list-group-item">{{ additive.text }}</li>
                </ul>
              </div>
              <div v-if="item.badges.length" class="mt-2">
                <strong>Abzeichen:</strong>
                <ul class="list-group list-group-flush">
                  <li v-for="badge in item.badges" :key="badge.id" class="list-group-item">
                    <strong>{{ badge.name }}</strong>: {{ badge.description }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="alert alert-info">
        {{ t('Keine Speisen vorhanden') }}
      </div>
    </div>

    <!-- Filterbereich -->
    <div class="filters-container">
      <input v-model="filters.search" @input="applyFilters" :placeholder="t('Name, PLZ, Bezirk')"/>
      <input v-model="filters.openAt" @input="applyFilters" :placeholder="t('filters.filterOpenAt')" type="time"/>
    </div>

    <!-- Ladeanzeige für Filter -->
    <div v-if="loading" class="loading-spinner">{{ t('loading') }}</div>

    <!-- Liste der Mensas -->
    <div class="mensa-item-container">
      <div v-for="mensa in filteredMensas" :key="mensa.id" class="mensa-item">
          <div class="mensa-item-content">
            <h2>{{ mensa.name }}</h2>
            <div class="mensa-content-container">
              <div class="mensa-content-item">
                <LocationIcon/>
                <div class="address-container">
                  <strong>Adresse</strong>
                  {{ mensa.address.street }}, <br>
                  {{ mensa.address.zipcode }} {{ mensa.address.city }}
                </div>
              </div>

              <div class="mensa-content-item">
                <ClockIcon/>
                <div v-if="getCurrentDayHours(mensa)">
                  <strong>Heute:</strong>
                  <div v-for="hour in getCurrentDayHours(mensa)" :key="hour.openAt">
                    {{ hour.businessHourType }}: {{ hour.openAt }} - {{ hour.closeAt }}
                  </div>
                </div>
                <div v-else>
                  {{ t('closed') }}
                </div>
              </div>

              <div class="contact-info">
                <div>
                  <PhoneIcon/>
                  {{ mensa.contactInfo.phone }}
                </div>
                <div>
                  <MailIcon/>
                  {{ mensa.contactInfo.email }}
                </div>
              </div>

              <div class="mensa-content-item">
                <RatingIcon/>
                {{ mensa.canteenReviews.length }} Bewertungen
              </div>
            </div>
          </div>


        <button @click="toggleFavoriteMensa(mensa)">
          {{ isFavorite(mensa) ? t('removeFavorite') : t('addFavorite') }}
        </button>
      </div>
    </div>

    <p v-if="mensas.length === 0">
      {{ t('noMensasFound') }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { Mensa, MenuItem } from '@/types/mensainterface';
import { CANTEEN_DEBUG_DATA } from '../types/tmpDataMensa';
import { MENUE_DEBUG_DATA } from '../types/tmpDataMeal';
import LocationIcon from '../assets/icons/LocationIcon.vue';
import ClockIcon from '../assets/icons/ClockIcon.vue';
import PhoneIcon from '../assets/icons/PhoneIcon.vue';
import MailIcon from '../assets/icons/MailIcon.vue';
import RatingIcon from '../assets/icons/RatingIcon.vue';
import localforage from 'localforage';

const selectedDate = ref<string>(new Date().toISOString().split('T')[0]);
const selectedCanteenId = ref<string | null>(null);
const menuItems = ref<MenuItem[]>([]);

const FAVORITE_MENSA_KEY = 'favoriteMensas';
const MENSA_DATA_KEY = 'mensaData';
const favoriteMensas = ref<Mensa[]>([]);
const { t } = useI18n();

const mensas = ref<Mensa[]>(CANTEEN_DEBUG_DATA);
const loading = ref<boolean>(false);
const filters = ref({
  search: '',
  openAt: '',
});

// Funktion zum Initialisieren der Datenbank
const initializeDatabase = async () => {
  try {
    const existingData: Mensa[] | null = await localforage.getItem(MENSA_DATA_KEY);
    if (!existingData) {
      console.log("No existing data found. Adding default data...");
      await localforage.setItem(MENSA_DATA_KEY, CANTEEN_DEBUG_DATA);
      mensas.value = CANTEEN_DEBUG_DATA;
    } else {
      console.log("Existing data found.");
      mensas.value = existingData;
    }
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

// Filter anwenden
const applyFilters = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 300); // Simuliere Ladeverzögerung
};

// Favoriten aus localStorage laden
const loadFavoriteMensas = () => {
  const storedFavorites = localStorage.getItem(FAVORITE_MENSA_KEY);
  if (storedFavorites) {
    favoriteMensas.value = JSON.parse(storedFavorites);
  } else {
    favoriteMensas.value = [];
  }
};

// Favoriten in localStorage speichern
const saveFavoriteMensas = () => {
  localStorage.setItem(FAVORITE_MENSA_KEY, JSON.stringify(favoriteMensas.value));
};

const filteredMensas = computed(() => {
  const searchLower = filters.value.search.toLowerCase();
  return mensas.value.filter((mensa) => {
    const nameMatch = mensa.name.toLowerCase().includes(searchLower);
    const zipcodeMatch = mensa.address.zipcode.includes(searchLower);
    const districtMatch = mensa.address.district.toLowerCase().includes(searchLower);
    const openAtMatch = filters.value.openAt ? mensa.businessDays.some((day) =>
        day.businessHours.some((hour) => hour.openAt <= filters.value.openAt && hour.closeAt >= filters.value.openAt)
    ) : true;

    return (nameMatch || zipcodeMatch || districtMatch) && openAtMatch;
  });
});

const getCurrentDayName = () => {
  const days = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
  const currentDayIndex = new Date().getDay();
  return days[currentDayIndex];
};

const getCurrentDayHours = (mensa: Mensa) => {
  const currentDayName = getCurrentDayName();
  const currentDay = mensa.businessDays.find(day => day.day === currentDayName);
  return currentDay ? currentDay.businessHours : null;
};

// Menü für die ausgewählte Mensa und Datum abrufen
const getMenuForCanteenAndDate = (canteenId: string, date: string) => {
  const menuForDate = MENUE_DEBUG_DATA.find(menu => menu.canteenId === canteenId && menu.date === date);
  return menuForDate ? menuForDate.meals : [];
};

// Menü abrufen
const fetchMenu = () => {
  if (selectedCanteenId.value && selectedDate.value) {
    menuItems.value = getMenuForCanteenAndDate(selectedCanteenId.value, selectedDate.value);
  }
};

// Favoriten-Menü umschalten
const toggleFavoriteMensa = (mensa: Mensa) => {
  const index = favoriteMensas.value.findIndex(fav => fav.id === mensa.id);
  if (index !== -1) {
    favoriteMensas.value.splice(index, 1);
  } else {
    favoriteMensas.value.push(mensa);
  }
  saveFavoriteMensas();
};

const isFavorite = (mensa: Mensa) => {
  return favoriteMensas.value.some(fav => fav.id === mensa.id);
};

watch([selectedDate, selectedCanteenId], fetchMenu);

onMounted(async () => {
  applyFilters();
  await initializeDatabase();
  loadFavoriteMensas();
});
</script>

<style scoped>
.mensa-list-container {
  padding: 0 2rem;
  margin-bottom: 1rem;

  .filters-container {
    display: flex;
    justify-content: end;
    width: 100%;
    gap: 1rem;

    input {
      display: block;
      margin-bottom: 10px;
      padding: 5px;
      border-radius: 5px;
      min-width: 200px;
    }
  }

  .mensa-item-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .mensa-item {
      text-decoration: none;
      color: black;
      display: flex;
      border: 1px solid rgba(91, 54, 46, 0.21);
      border-radius: 12px;
      padding: 1rem;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 6px 12px -4px rgba(0, 0, 0, 0.2);

      .mensa-item-link {
        display: flex;
        flex-grow: 1;
      }

      .mensa-item-content {
        display: flex;
        flex-direction: column;

        .mensa-content-container {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;

          .mensa-content-item, .contact-info {
            display: flex;
            gap: 5px;

            .address-container {
              display: flex;
              flex-direction: column;
            }
          }

          .contact-info {
            flex-direction: column;

            div {
              display: flex;
              align-items: center;
              gap: 5px;
            }
          }
        }
      }

      button {
        background: none;
        border: none;
        cursor: pointer;
      }
    }
  }
}

@media (max-width: 690px) {
  .mensa-list-container {
    margin-bottom: 100px;

    .filters-container {
      flex-direction: column;
      width: 100%;
      gap: 0 !important;
    }
  }
}
</style>
