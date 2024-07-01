<template>
  <div class="mensa-list-container">
    <h1>Mensa List</h1>

    <div v-if="loading" class="loading-spinner">

    </div>

    <ul v-else-if="mensas.length > 0" class="mensa-list">
      <li v-for="mensa in mensas" :key="mensa.id" class="mensa-item">
        <img

          v-if="mensa.url && mensa.url !== ''"
          :src="mensa.url"
          :alt="`Mensa ${mensa.name} Image`"
          loading="lazy"
          class="mensa-image"



        />
        <div class="mensa-details">
          <h2>{{ mensa.name }}</h2>
          <p>{{ mensa.address.street }}, {{ mensa.address.city }}</p>
          <p v-if="mensa.contactInfo.phone">Phone: {{ mensa.contactInfo.phone }}</p>
          <p v-if="mensa.contactInfo.email">Email: {{ mensa.contactInfo.email }}</p>
          <ul>
            <li v-for="day in mensa.businessDays" :key="day.day">
              <strong>{{ day.day }}</strong>:
              <ul>
                <li v-for="hour in day.businesshours" :key="`${hour.openAt}-${hour.closeAt}`">
                  {{ hour.openAt }} - {{ hour.closeAt }}
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </li>
    </ul>

    <p v-else>
      No Mensas found. Please try again later or contact support.
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { Mensa } from '../types/mensainterface';
import { fetchMensas } from '../types/mensaService';

export default defineComponent({
  name: 'MensaList',
  setup() {
    const mensas = ref<Mensa[]>([]);
    const loading = ref<boolean>(true); // State to track loading state
    const apiKey = 'EjGTzhCqu7TbBUwpN2x4H7YIRf5LIepS28Uc+Pn2k8IBkc05wDI6F+ZQbA13f67qSlENe8AU3UqL5Zzck+rERaYxrXKqISZQ6ut9/KIgGJoHs1VMlNvp0DfvWa69WzXyvdEEtTUN/3tsfxeGDG//UmzHTps9DnYKemomcgwGEPx+4U/dbv4L/QeHoTph8dLISK9ipWP2By5SjFKPreZoAJWuOy/6+u5uF23irGt5wBVZCFsdrvJUiIN72QURoF6aR9dzT+a8g1i9w9cFnTFxTtewRtm4lFY2ME/nmMIHKkchUuqfT0bNsxZL2dPfIo1E3ahzuNctbqUfdBBv1lslYw==';

    const fetchMensasList = async () => {
      try {
        const data = await fetchMensas(apiKey);
        mensas.value = data;
        loading.value = false; // Mark loading as complete
      } catch (error) {
        console.error('Error fetching mensas:', error);
        // Implement error handling logic here
        loading.value = false; // Ensure loading state is updated in case of error
      }
    };

    onMounted(() => {
      const intersectionObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          fetchMensasList();
          intersectionObserver.disconnect();
        }
      });

      const target = document.querySelector('.mensa-list-container');
      if (target) {
        intersectionObserver.observe(target);
      } else {
        console.warn('IntersectionObserver target not found');
      }
    });

    return { mensas, loading };
  },
});
</script>

<style scoped>
.mensa-list-container {
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

.mensa-list {
  list-style-type: none;
  padding: 0;
}

.mensa-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.mensa-image {
  max-width: 200px;
  height: auto;
  margin-right: 20px;
}

.mensa-details {
  flex: 1;
  text-align: left;
}

@media (max-width: 600px) {
  .mensa-item {
    flex-direction: column;
    text-align: center;
  }

  .mensa-image {
    margin-right: 0;
    margin-bottom: 10px;
  }
}
</style>
