<script setup lang="ts">
import { onMounted } from 'vue';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

let map: L.Map | null = null;
console.log(map);

onMounted(() => {
  const newMap = L.map('map').setView([44.8, 20.45], 13);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
  }).addTo(newMap);

  map = newMap;
});
</script>

<template>
  <v-container fluid class="pa-0 pt-2">
    <v-row>
      <!-- <v-col cols="4">Points list</v-col> -->
      <v-col>
        <div id="map"></div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style>
#map {
  height: 80vh;
}
</style>
