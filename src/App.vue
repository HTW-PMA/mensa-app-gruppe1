<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import {SMALL_BREAKPOINT, windowService} from "@/service/windowService";
import HomeIcon from "@/assets/icons/HomeIcon.vue";
import ListIcon from "@/assets/icons/ListIcon.vue";
import UserIcon from "@/assets/icons/UserIcon.vue";

const {width} = windowService()

</script>

<template>
  <div id="app">
    <header>
      <img src="/src/assets/logo.svg" alt="logo">
      <nav class="desktop-nav" v-if="width > SMALL_BREAKPOINT">
        <router-link to="/">Home</router-link>
        <router-link to="/mensa-list">Mensa List</router-link>
        <router-link to="/about">About Us</router-link>
        <router-link to="/settings"><UserIcon></UserIcon></router-link>
      </nav>
    </header>

    <nav class="mobile-nav" v-if="width < SMALL_BREAKPOINT">
      <router-link to="/"> <HomeIcon></HomeIcon> Home</router-link>
      <router-link to="/mensa-list"> <ListIcon></ListIcon> List</router-link>
      <router-link to="/settings"><UserIcon></UserIcon> Profile</router-link>

    </nav>
    <RouterView />
  </div>
</template>

<style>
:root {
  margin-left: 5rem;
  margin-right: 5rem;
}

header {
  display: flex;
  justify-content: space-between;
  padding: 1rem;

  img {
    width: 50px;
  }
}

.desktop-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    margin: 0 1rem;
    text-decoration: none;
    font-weight: 500;
    font-size: 20px;
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.desktop-nav a.router-link-exact-active {
  font-weight: 900;
}

.mobile-nav {
  position: fixed;
  bottom: 0;
  padding: 1rem 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  background: white;
  margin-left: -1rem;
  border-top: solid 1px rgba(93, 64, 55, 0.3);

  a {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    color: black;
  }

  a.router-link-exact-active {
    font-weight: 900;
  }
}

@media (max-width: 690px) {
  :root {
    margin-right: 0;
    margin-left: 0;
  }

  header {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

</style>
