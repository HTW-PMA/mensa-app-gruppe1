<template>
  <div class="mensa-detail-container">
    <div v-if="loading" class="loading-state">
      <p>Loading...</p>
    </div>
    <div v-if="error" class="error-state">
      <p>Error loading data: {{ error }}</p>
      <button @click="fetchData">Erneut versuchen</button>
    </div>
    <div v-if="mensa && !loading && !error" class="mensa-details">
      <h2>{{ mensa.name }}</h2>
      <div class="mensa-details-content">
        <LocationIcon/>
        <div class="address-container">
          <strong>Adresse</strong>
          {{ mensa.address.street }}, <br/>
          {{ mensa.address.zipcode }} {{ mensa.address.city }}
        </div>
      </div>
      <div class="mensa-details-content">
        <ClockIcon/>
        <div class="address-container">
          <strong>Öffnungszeiten</strong>
          <div v-for="openTime in mensa.businessDays" :key="openTime.day" class="open-time-container">
            <strong>{{ openTime.day }}:</strong>
            <div v-for="times in openTime.businessHours" :key="times.openAt" class="times">
              {{ times.businessHourType }}: {{ times.openAt }} - {{ times.closeAt }}
            </div>
            <div v-if="openTime.businessHours.length === 0">Geschlossen</div>
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
      <h3>Speiseplan für Heute</h3>
      <div v-for="meal in menue.meals" :key="meal.ID" class="meal-container">
        <h4>{{ meal.name }}</h4>
        <div class="meal-details">
          <div>
            <strong>Kategorie:</strong> {{ meal.category }}
          </div>
          <div>
            <strong>Preise:</strong>
            <ul>
              <li v-for="price in meal.prices" :key="price.priceType">{{ price.priceType }}: {{ price.price }}€</li>
            </ul>
          </div>
          <div>
            <strong>Zusätze:</strong>
            <ul>
              <li v-for="additive in meal.additives" :key="additive.ID">{{ additive.text }}</li>
            </ul>
          </div>
          <div>
            <strong>Badges:</strong>
            <ul>
              <li v-for="badge in meal.badges" :key="badge.ID">{{ badge.name }} - {{ badge.description }}</li>
            </ul>
          </div>
          <div>
            <strong>Wasserbilanz:</strong> {{ meal.waterBilanz }} L
          </div>
          <div>
            <strong>CO2-Bilanz:</strong> {{ meal.co2Bilanz }} kg
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {useRoute} from 'vue-router';
import {Mensa} from '@/types/mensainterface';
import {fetchMensaById} from '@/service/mensaService';
import {fetchMenueByMensaId} from '@/service/menueService';
import {MenueResponse} from '@/types/menueInterface';
import LocationIcon from "@/assets/icons/LocationIcon.vue";
import ClockIcon from "@/assets/icons/ClockIcon.vue";
import MailIcon from "@/assets/icons/MailIcon.vue";
import PhoneIcon from "@/assets/icons/PhoneIcon.vue";

const route = useRoute();
const mensa = ref<Mensa | null>(null);
const menue = ref<MenueResponse | null>(null);
const loading = ref<boolean>(true);
const error = ref<string | null>(null);


const fetchMensaDetail = async () => {
  try {
    mensa.value = await fetchMensaById(route.params.id as string);
    console.log(route.params.id)
  } catch (err) {
    error.value = 'Error fetching mensa details';
  }
};

const fetchMenue = async () => {
  try {
    const today = new Date().toISOString().split('T')[0];
    menue.value = await fetchMenueByMensaId(route.params.id as string, today, today);
  } catch (err) {
    error.value = 'Error fetching menue details';
  }
};

const fetchData = async () => {
  error.value = null;
  loading.value = true;
  await fetchMensaDetail();
  await fetchMenue();
  loading.value = false;
};

onMounted(async () => {
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

    .meal-container {
      border: 1px solid rgba(91, 54, 46, 0.21);
      border-radius: 8px;
      padding: 1rem;
      margin-bottom: 10px;
      box-shadow: 0 4px 8px -2px rgba(0, 0, 0, 0.2);

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
