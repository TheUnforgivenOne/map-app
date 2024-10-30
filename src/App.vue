<script setup lang="ts">
import { RouterView } from 'vue-router';
import HeaderBar from './components/HeaderBar.vue';
</script>

<template>
  <v-app>
    <HeaderBar />
    <main>
      <RouterView />
    </main>
  </v-app>
</template>

<style>
main {
  padding: 64px 8px 8px;
  margin: 0 auto;
  width: 90vw;
  height: 100vh;
}

@media (min-width: 1280px) {
  main {
    width: 60vw;
  }
}
</style>
