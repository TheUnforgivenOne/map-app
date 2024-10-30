<script setup lang="ts">
import 'leaflet/dist/leaflet.css';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from '@/store';

import OSM from '@/mapProviders/OSM';
import type AbstractProvider from '@/mapProviders/AbstractProvider';
import { SET_MAP_MODE } from '@/store/mutations';
import { CREATE_MARKER } from '@/store/actions';
import { MapMode, RequestState } from '@/types';
import { Paths } from '@/router';

const MAP_CONTAINER_ID = 'map';

const router = useRouter();
const route = useRoute();
const store = useStore();

const mapProvider = ref<AbstractProvider | null>(null);

onMounted(() => {
  mapProvider.value = new OSM(MAP_CONTAINER_ID);
});

onUnmounted(() => {
  mapProvider.value?.cleanUp();
});

const onMarkerClick = (markerId: number) => {
  router.push(`${Paths.MAP}/${markerId}`);
};

const onMapClick = (lat: number, lng: number) => {
  store.dispatch(CREATE_MARKER, { newMarkerValues: { lat, lng } });
};

watch(store.state.marker, ({ list, loadingMarkers }) => {
  if (loadingMarkers === RequestState.Ready) {
    list.forEach(marker => {
      mapProvider.value?.displayMarker(marker);
      mapProvider.value?.setMarkerOnClick(marker.id, onMarkerClick);
    });
  }
});

watch(
  () => store.state.map.mode,
  newMapMode => {
    if (newMapMode === MapMode.Add) {
      mapProvider.value?.setMapOnClick(onMapClick);
      return;
    } else {
      mapProvider.value?.unsetMapOnClick();
    }
  },
);

watch(route, newRoute => {
  const markerId = newRoute.params.markerId;
  if (!markerId) return;

  mapProvider.value?.centerMap(Number(markerId));
});

const action = computed(() => {
  return store.state.map.mode === MapMode.Add
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
  <div class="position-relative h-100 w-100">
    <div :id="MAP_CONTAINER_ID" class="h-100"></div>
    <v-btn
      icon
      size="6vh"
      class="position-absolute action-btn-position"
      @click="store.commit(SET_MAP_MODE, { newMapMode: action.newMapMode })"
    >
      <v-icon size="6vh" color="blue" :icon="action.icon"></v-icon>
    </v-btn>
  </div>
</template>

<style scoped>
.action-btn-position {
  right: 4vw;
  bottom: 4vh;
  z-index: 1000;
}
</style>
