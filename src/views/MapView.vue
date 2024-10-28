<script setup lang="ts">
import { onMounted } from 'vue';
import 'leaflet/dist/leaflet.css';
import L, { type LeafletMouseEvent } from 'leaflet';
import { useStore } from '@/store';
import { type INewMarker } from '@/types';

const store = useStore();

// const displayMarker = (map: Map, { id, lat, lng }: IMarker) => {
//   const marker = L.marker([lat, lng])
//     .bindPopup(`id: ${id}, lat: ${lat}, lng: ${lng}`)
//     .addTo(map);

//   const h = (e: LeafletMouseEvent) => {
//     console.log(e);
//   };
//   marker.on('click', h);
// };

const initMap = (mapContainerId: string) => {
  const DEFAULT_TILE = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';

  const map = L.map(mapContainerId).setView([44.8, 20.45], 13);

  L.tileLayer(DEFAULT_TILE, { maxZoom: 19 }).addTo(map);

  const onMapClick = (e: LeafletMouseEvent) => {
    const newMarker: INewMarker = {
      ...e.latlng,
      address: '',
    };
    store.dispatch('createMarker', newMarker);
  };

  map.on('click', onMapClick);

  return map;
};

onMounted(() => {
  const map = initMap('map');
  store.commit('setMap', map);

  store.state.markers.forEach(marker => {
    store.commit('displayMarker', marker);
  });
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
