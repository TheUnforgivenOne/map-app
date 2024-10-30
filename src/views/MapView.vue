<script setup lang="ts">
import MapComponent from '@/components/MapComponent.vue';
import MarkersList from '@/components/MarkersList.vue';
</script>

<template>
  <div class="d-flex map-view-wrapper">
    <div class="markers-list-wrapper">
      <MarkersList></MarkersList>
    </div>
    <div class="flex-grow-1">
      <MapComponent></MapComponent>
    </div>
  </div>
</template>

<style scoped>
.map-view-wrapper {
  height: 100%;
}

.markers-list-wrapper {
  height: 100%;
  width: 30%;
}

@media (max-width: 1024px) {
  .map-view-wrapper {
    flex-direction: column;
  }
  .markers-list-wrapper {
    height: 30%;
    width: 100%;
  }
}
</style>
