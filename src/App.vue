<script setup lang="ts">
import { RouterView } from 'vue-router';
import HeaderBar from './components/HeaderBar.vue';
</script>

<template>
  <v-app>
    <HeaderBar />
    <RouterView />
  </v-app>
</template>
