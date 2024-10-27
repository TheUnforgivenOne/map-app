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
  max-width: 90vw;
}

@media (min-width: 1024px) {
  main {
    max-width: 60vw;
  }
}
</style>
