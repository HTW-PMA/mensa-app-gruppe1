<template>
  <div id="app">
    <MensaList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MensaList from './components/MensaList.vue';

export default defineComponent({
  name: 'App',
  components: {
    MensaList
  }
});
</script>
