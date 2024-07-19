<script setup lang="ts">
</script>

<template>
  <div class="home-container">
    <div>
      <h1>Mensa Marvel,</h1>
      <h2>Discover today's menu, <br>
        special offers, and more!</h2>
    </div>

    <img src="/src/assets/undraw_eating_together_re_ux62%201.svg">
  </div>
</template>

<style scoped>
:root {
  display: block
}

.home-container {
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap; /* Allows items to wrap on smaller screens */

}

.home-container div {
  max-width: 100%;
}

.home-container h1 {
  font-size: 4em;
  font-weight: bolder;
  margin: 0;
}

.home-container h2 {
  margin: 0;
  font-size: 3em;
  font-weight: bold;
  line-height: 1.2;
}

.home-container img {
  width: 100%;
  max-width: 840px;
  height: auto;
}

@media (max-width: 1200px) {
  .home-container {
    padding: 10px;
  }

  .home-container h1 {
    font-size: 3em;
  }

  .home-container h2 {
    font-size: 2em;
  }

  .home-container img {
    max-width: 600px;
  }
}

@media (max-width: 768px) {
  .home-container {
    flex-direction: column;
    align-items: flex-start;
  }

  .home-container h1 {
    font-size: 2.5em;
  }

  .home-container h2 {
    font-size: 1.5em;
  }

  .home-container img {
    max-width: 100%;
    margin-top: 20px;
  }
}
</style>
