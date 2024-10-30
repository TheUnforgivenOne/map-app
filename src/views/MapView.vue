<script setup lang="ts">
import MapComponent from '@/components/MapComponent.vue';
import MarkersList from '@/components/MarkersList.vue';
</script>

<template>
  <div class="map-view-wrapper">
    <div class="markers-list-wrapper">
      <MarkersList></MarkersList>
    </div>
    <div class="map-wrapper">
      <MapComponent></MapComponent>
    </div>
  </div>
</template>

<style scoped>
.map-view-wrapper {
  display: flex;
  height: 100%;
}

.markers-list-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 30%;
}

.map-wrapper {
  flex-grow: 1;
}

.full-height {
  height: 100%;
}
</style>

<!-- <v-row class="full-height ma-0">
    <v-col cols="4" class="full-height d-flex flex-column pa-0">
      <MarkersList></MarkersList>
    </v-col>
    <v-col cols="8" class="pa-0">
      <MapComponent></MapComponent>
    </v-col>
  </v-row> -->
