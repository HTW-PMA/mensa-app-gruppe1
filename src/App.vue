<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div id="app">
    <header>
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/mensa-list">Mensa List</router-link>
        <router-link to="/about">About Us</router-link>
        <router-link to="/contact">Contact</router-link>
        <router-link to="/meal-list">Meal</router-link>
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
  color: #333; /* Dunklere Textfarbe für bessere Lesbarkeit */
  background-color: #f8f9fa; /* Helle Hintergrundfarbe für ein sauberes Aussehen */
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
  padding: 1rem 0;
}

nav {
  display: flex;
  justify-content: center;
  gap: 2rem;
}

nav a {
  color: white;
  text-decoration: none;
  font-size: 1.2rem;
}

nav a:hover {
  text-decoration: underline;
}

main {
  flex: 1;
}

footer {
  background: #242424;
  color: white;
  padding: 1rem 0;
  text-align: center;
}

a {
  font-weight: 500;
  color: #007bff; /* Primärfarbe */
  text-decoration: inherit;
}
a:hover {
  color: #0056b3; /* Dunklere Schattierung für Hover-Zustand */
}

body {
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
}

h1 {
  font-size: 3.2em;
  line-height: 1.1;
  color: #007bff; /* Primärfarbe für Überschriften */
}

button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #007bff; /* Primärfarbe für Buttons */
  color: white;
  cursor: pointer;
  transition: background-color 0.25s, border-color 0.25s;
}
button:hover {
  background-color: #0056b3; /* Dunklere Schattierung für Hover-Zustand */
  border-color: #004085; /* Schattierung für den Rand im Hover-Zustand */
}
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

.card {
  padding: 2em;
  background-color: white;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5em;
}

@media (prefers-color-scheme: light) {
  :root {
    color: #213547;
    background-color: #ffffff;
  }
  a:hover {
    color: #0056b3;
  }
  button {
    background-color: #007bff;
  }
  button:hover {
    background-color: #0056b3;
  }
}
</style>
