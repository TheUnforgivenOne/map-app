<script setup lang="ts">
import MapComponent from '@/components/MapComponent.vue';
import MarkersList from '@/components/MarkersList.vue';
</script>

<template>
  <v-row class="ma-0 full-height">
    <v-col cols="4" class="pa-0 full-height d-flex flex-column">
      <MarkersList></MarkersList>
    </v-col>
    <v-col cols="8" class="pa-0">
      <MapComponent></MapComponent>
    </v-col>
  </v-row>
</template>

<style>
.full-height {
  height: 100%;
}
</style>
