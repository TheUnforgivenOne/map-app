<script setup lang="ts">
import 'leaflet/dist/leaflet.css';
import { computed, onMounted, onUnmounted } from 'vue';
import { useStore } from '@/store';
import { INIT_MAP, SET_MAP_MODE } from '@/store/actions';
import { SET_MAP } from '@/store/mutations';
import { MapMode } from '@/types';

const mapContainerId = 'map';
const store = useStore();

onMounted(() => {
  store.dispatch(INIT_MAP, { mapContainerId });
});

onUnmounted(() => {
  store.commit(SET_MAP, { newMapRef: null });
});

const currentMode = computed(() => store.state.map.mode);

const switchMapMode = () => {
  const newMapMode =
    currentMode.value === MapMode.View ? MapMode.Add : MapMode.View;
  store.dispatch(SET_MAP_MODE, { newMapMode });
};
</script>

<template>
  <div class="wrapper">
    <div :id="mapContainerId" class="map"></div>
    <v-btn size="8vh" icon class="btn" @click.prevent="switchMapMode">
      <v-icon
        size="8vh"
        color="blue"
        :icon="currentMode === MapMode.View ? 'mdi-plus-circle' : 'mdi-map'"
      ></v-icon>
    </v-btn>
  </div>
</template>

<style>
.wrapper {
  position: relative;
  height: 100%;
}

.map {
  height: 100%;
}

.btn {
  position: absolute;
  right: 4vw;
  bottom: 4vh;
  z-index: 1000;
  min-width: 0;
}
</style>
