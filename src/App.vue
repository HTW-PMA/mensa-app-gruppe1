<script setup lang="ts">
import {RouterLink, RouterView} from 'vue-router';
</script>

<template>
  <div id="app">
    <header>
      <img src="/src/assets/logo.svg" alt="logo">
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/mensa-list">Mensa List</router-link>
        <router-link to="/about">About Us</router-link>
      </nav>
    </header>
    <RouterView/>
    <footer>
      &copy; 2024 Mensa Marvel App
    </footer>
  </div>
</template>

<style>
:root {
  display: block;
}
header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  height: 100px;
  width: 100%;

  img {
    width: 80px;
    height: 80px;
  }

  nav {
    display: flex;
    width: 100%;
    gap: 3rem;
    justify-content: end;

    a {
      text-decoration: none;
      font-weight: bold;
      color: black;
      font-size: 20px;
    }
  }
}

footer {
  width: 100%;
  position: fixed;
  bottom: 1rem;
  text-align: center;
}

</style>
