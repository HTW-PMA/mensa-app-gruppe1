<template>
  <div class="mensa-list-container">
    <div class="header">
      <h2>{{ t('mensaList.title') }}</h2>
    </div>

    <div class="filters-container">
      <input v-model="filters.search" @input="applyFilters" :placeholder="t('filters.filterName')" />
      <input v-model="filters.openAt" @input="applyFilters" :placeholder="t('filters.filterOpenAt')" type="time" />
    </div>

    <div v-if="loading" class="loading-spinner"></div>

    <div class="mensa-item-container">
      <RouterLink :to="`/mensa/${mensa.id}`" v-for="mensa in filteredMensas" :key="mensa.id" class="mensa-item">
        <div class="mensa-item-content">
          <h2>{{ mensa.name }}</h2>
          <div class="mensa-content-container">
            <div class="mensa-content-item">
              <LocationIcon />
              <div class="address-container">
                <strong>{{ t('mensaDetails.address') }}</strong>
                {{ mensa.address.street }}, <br />
                {{ mensa.address.zipcode }} {{ mensa.address.city }}
              </div>
            </div>

            <div class="mensa-content-item">
              <ClockIcon />
              <div v-if="getCurrentDayHours(mensa)">
                <strong>{{ t('today') }}:</strong>
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
                <PhoneIcon />
                {{ mensa.contactInfo.phone }}
              </div>
              <div>
                <MailIcon />
                {{ mensa.contactInfo.email }}
              </div>
            </div>
          </div>
        </div>

        <a>
          <ChevronRightIcon />
        </a>
      </RouterLink>
    </div>

    <p v-if="mensas.length === 0">
      {{ t('noMensasFound') }}
    </p>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from 'vue';
import {useI18n} from 'vue-i18n';
import localforage from 'localforage';
import {Mensa} from '@/types/mensainterface';
import LocationIcon from "@/assets/icons/LocationIcon.vue";
import ClockIcon from "@/assets/icons/ClockIcon.vue";
import PhoneIcon from "@/assets/icons/PhoneIcon.vue";
import MailIcon from "@/assets/icons/MailIcon.vue";
import ChevronRightIcon from "@/assets/icons/ChevronRightIcon.vue";
import {CANTEEN_DEBUG_DATA} from "@/types/tmpDataMensa";

const FAVORITE_MENSA_KEY = 'favoriteMensas';
const favoriteMensas = ref<Mensa[]>([]);

const {t, locale} = useI18n();

const CACHE_KEY = 'mensaData';
const CACHE_TIMESTAMP_KEY = 'mensaDataTimestamp';
const CACHE_EXPIRY_MS = 7 * 24 * 60 * 60 * 1000; // 7 Tage

const mensas = ref<Mensa[]>([]);
const loading = ref<boolean>(true);
const filters = ref({
  search: '',
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
    const cachedData = await localforage.getItem<Mensa[]>(CACHE_KEY);
    const cachedTimestamp = await localforage.getItem<number>(CACHE_TIMESTAMP_KEY);
    const now = Date.now();

    if (cachedData && cachedTimestamp && (now - cachedTimestamp) < CACHE_EXPIRY_MS) {
      mensas.value = cachedData;
    } else {
      mensas.value = CANTEEN_DEBUG_DATA;
      await localforage.setItem(CACHE_KEY, CANTEEN_DEBUG_DATA);
      await localforage.setItem(CACHE_TIMESTAMP_KEY, now);
    }
    loading.value = false;
  } catch (error) {
    console.error('Error getting Data:', error);
  }
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

onMounted(async () => {
  applyFilters();

  try {
    loading.value = true;

    const data = await localforage.getItem<Mensa[]>('mensaData');
    if (data) {
      mensas.value = data;
      loading.value = false;

    } else {
      await fetchMensasList();
    }
  } catch (error) {
    console.error('Error fetching mensas from IndexedDB or API:', error);
  }
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
