<script setup lang="ts">
import { RouterView } from 'vue-router';
import HeaderBar from './components/HeaderBar.vue';
</script>

<template>
  <v-app>
    <HeaderBar />
    <main class="pt-16 px-2 mx-auto">
      <RouterView />
    </main>
  </v-app>
  <notifications position="bottom right" />
</template>

<style>
main {
  width: 80vw;
  height: 100vh;
}

@media (min-width: 1280px) {
  main {
    width: 60vw;
  }
}
</style>
