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

interface Mensa {
  id: number;
  name: string;
}

export default defineComponent({
  name: 'MensaList',
  setup() {
    const mensas = ref<Mensa[]>([]);
    const apiKey = 'O6omy9/uhnJIC0GVQd8Rho9WQOa2BrQMitety5vl4SFCw7i8WpiZdfaAKXBaEhGzZDsJ5GjFSvVHfKqh5SwSPK0JvaaNiYvsJMc/AdxVOfsBoIe32th3A36V/QR0QJ7mQKJOE4CBqR0VedpKenMqrfVLMj/4fj1EXG9f5SQ2BHVXopOYvPBQ+b3cWsRtP7eOX9sCAPRlCmrzAj6Gk11hhdOND1RPkHUGSgaRnS50JQ06+PXA+DgrevMnJoiebrZIzfUU6xRgW1ZFPeaNxGZLoG15BmB1tuaBXge97qiQ5F0NGmM3LF9CApuYNOH39hWa8bXOCAYRH2u2d29+Ei09DQ==';

    const fetchMensas = async () => {
      try {
        const response = await fetch(`https://mensa.gregorflachs.de/api/mensas?apiKey=${apiKey}`);
        if (!response.ok) {
          throw new Error('API request failed');
        }
        const data: Mensa[] = await response.json();
        mensas.value = data;
      } catch (error) {
        console.error('Error fetching mensas:', error);
      }
    };

    onMounted(() => {
      fetchMensas();
    });

    return { mensas };
  }
});
</script>
