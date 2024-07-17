<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <div id="app">
    <header>
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/mensa-list">Mensa List</router-link>
        <router-link to="/about">About Us</router-link>
        <router-link to="/contact">Contact</router-link>
        <router-link to="/gericht-list">Meal</router-link>
      </nav>
    </header>
    <RouterView />
    <footer>
      &copy; 2024 Mensa Marvel App
    </footer>
  </div>
</template>

<style>
#app {
  font-family: 'Inter', system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;
  color-scheme: light dark;
  color: #333;
  background-color: #f8f9fa;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  background: linear-gradient(90deg, #007bff 0%, #0056b3 100%);
  padding: 1rem;
}

nav a {
  margin: 0 1rem;
  color: #fff;
  text-decoration: none;
}

nav a.router-link-exact-active {
  font-weight: bold;
}

footer {
  margin-top: auto;
  padding: 1rem;
  background-color: #f1f1f1;
}
</style>
