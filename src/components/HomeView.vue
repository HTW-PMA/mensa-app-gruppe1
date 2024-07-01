<template>
  <div class="home-view">
    <!-- Header mit Begrüßungstext -->
    <header class="header">
      <h1>Willkommen zur Mensa Marvel App</h1>
      <p>Entdecke das Tagesmenü, spezielle Angebote und mehr!</p>
    </header>


    <!-- Footer mit Links und Kontaktinformationen -->
    <footer class="footer">
      <nav>
        <ul>
          <li><a href="/about">Über Uns</a></li>
          <li><a href="/contact">Kontakt</a></li>
        </ul>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">


</script>

<style scoped>

.home-view {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;
  padding: 2rem;
}

.header {
  text-align: center;
  margin-bottom: 2rem;
}

.main {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.section {
  margin-bottom: 2rem;
}

.card {
  background-color: #363636;
  padding: 1rem;
  border-radius: 8px;
}

.card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.card ul {
  list-style: none;
  padding: 0;
}

.card li {
  margin-bottom: 1rem;
}

.footer {
  text-align: center;
  margin-top: 2rem;
}

.footer nav ul {
  list-style: none;
  padding: 0;
}

.footer nav ul li {
  display: inline;
  margin-right: 1rem;
}

.footer nav ul li a {
  color: #646cff;
  text-decoration: none;
}

.footer nav ul li a:hover {
  color: #535bf2;
}

</style>
