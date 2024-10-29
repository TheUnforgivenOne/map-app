<script setup lang="ts">
import 'leaflet/dist/leaflet.css';
import { onMounted, onUnmounted } from 'vue';
import { useStore } from '@/store';
import { INIT_MAP } from '@/store/actions';
import { SET_MAP } from '@/store/mutations';

const mapContainerId = 'map';
const store = useStore();

onMounted(() => {
  store.dispatch(INIT_MAP, { mapContainerId });
});

onUnmounted(() => {
  store.commit(SET_MAP, { newMapRef: null });
});
</script>

<template>
  <v-container fluid class="pa-0 pt-3">
    <v-row>
      <v-col cols="4" class="pa-0">Points list</v-col>
      <v-col cols="8" class="pa-0">
        <div :id="mapContainerId"></div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style>
#map {
  height: 80vh;
}
</style>
