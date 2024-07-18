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
  color: #5D4037; /* Dunkelbraun aus dem Logo */
  background-color: #F8E8E1; /* Helles Beige für den Hintergrund */
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
  background: linear-gradient(90deg, #8D6E63 0%, #795548 100%); /* Brauntöne für den Header */
  padding: 1rem;
}

nav a {
  margin: 0 1rem;
  color: #FFF; /* Weiß für die Links */
  text-decoration: none;
}

nav a.router-link-exact-active {
  font-weight: bold;
}

footer {
  margin-top: auto;
  padding: 1rem;
  background-color: #D7CCC8; /* Hellbraun für den Footer */
}

/* Media Queries für Responsive Design */
@media (max-width: 600px) {
  /* Styles für kleine Bildschirme */
  .header nav {
    flex-direction: column;
    text-align: center;
  }

  .header nav a {
    margin: 0.5rem 0;
  }
}

@media (min-width: 601px) {
  /* Styles für größere Bildschirme */
  .header nav {
    flex-direction: row;
  }

  .header nav a {
    margin: 0 1rem;
  }
}

</style>
