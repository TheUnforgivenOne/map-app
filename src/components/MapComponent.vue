<script setup lang="ts">
import 'leaflet/dist/leaflet.css';
import { computed, onMounted, onUnmounted, watch } from 'vue';
import { useStore } from '@/store';
import {
  DISPLAY_ALL_MARKERS,
  GET_MARKERS,
  INIT_MAP,
  SET_MAP_MODE,
} from '@/store/actions';
import { CENTER_MAP, SET_MAP } from '@/store/mutations';
import { MapMode, type IMarker } from '@/types';
import type { LeafletMouseEvent } from 'leaflet';
import { useRoute, useRouter } from 'vue-router';
import { Paths } from '@/router';

const MAP_CONTAINER_ID = 'map';
const store = useStore();
const route = useRoute();
const router = useRouter();

const onMarkerClick = (_: LeafletMouseEvent, marker: IMarker) => {
  router.push(`${Paths.MAP}/${marker.id}`);
};

onMounted(async () => {
  store.dispatch(INIT_MAP, { mapContainerId: MAP_CONTAINER_ID });
  await store.dispatch(GET_MARKERS);
  await store.dispatch(DISPLAY_ALL_MARKERS, { onMarkerClick });
});

onUnmounted(() => {
  store.state.map.ref?.off();
  store.state.map.ref?.remove();
  store.commit(SET_MAP, { newMapRef: null });
});

watch(route, newRoute => {
  const markerId = newRoute.params.markerId;
  if (!markerId) return;

  const marker = store.state.marker.list.find(
    ({ id }) => id === Number(markerId),
  );

  if (!marker) return;
  store.commit(CENTER_MAP, { lat: marker.lat, lng: marker.lng });
});

const action = computed(() => {
  return store?.state?.map?.mode === MapMode.Add
    ? {
        newMapMode: MapMode.View,
        icon: 'mdi-map',
      }
    : {
        newMapMode: MapMode.Add,
        icon: 'mdi-plus-circle',
      };
});
</script>

<template>
  <div class="wrapper">
    <div :id="MAP_CONTAINER_ID" class="map"></div>
    <v-btn
      icon
      size="6vh"
      class="btn"
      @click="
        store.dispatch(SET_MAP_MODE, {
          newMapMode: action.newMapMode,
          onMarkerClick,
        })
      "
    >
      <v-icon size="6vh" color="blue" :icon="action.icon"></v-icon>
    </v-btn>
  </div>
</template>

<style scoped>
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
