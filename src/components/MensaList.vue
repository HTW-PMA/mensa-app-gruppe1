<template>
  <div>
    <h1>Mensa List</h1>
    <ul>
      <li v-for="mensa in mensas" :key="mensa.id">{{ mensa.name }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { Mensa } from '../types/mensainterface'; // Pfad anpassen
import { fetchMensas } from '../types/mensaService'; // Pfad anpassen

export default defineComponent({
  name: 'MensaList',
  setup() {
    const mensas = ref<Mensa[]>([]);
    const apiKey = 'EjGTzhCqu7TbBUwpN2x4H7YIRf5LIepS28Uc+Pn2k8IBkc05wDI6F+ZQbA13f67qSlENe8AU3UqL5Zzck+rERaYxrXKqISZQ6ut9/KIgGJoHs1VMlNvp0DfvWa69WzXyvdEEtTUN/3tsfxeGDG//UmzHTps9DnYKemomcgwGEPx+4U/dbv4L/QeHoTph8dLISK9ipWP2By5SjFKPreZoAJWuOy/6+u5uF23irGt5wBVZCFsdrvJUiIN72QURoF6aR9dzT+a8g1i9w9cFnTFxTtewRtm4lFY2ME/nmMIHKkchUuqfT0bNsxZL2dPfIo1E3ahzuNctbqUfdBBv1lslYw==';

    const fetchMensasList = async () => {
      try {
        const data = await fetchMensas(apiKey);
        mensas.value = data;
      } catch (error) {
        console.error('Error fetching mensas:', error);
      }
    };

    onMounted(() => {
      fetchMensasList();
    });

    return { mensas };
  },
});
</script>
