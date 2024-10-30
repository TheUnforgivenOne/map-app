<script setup lang="ts">
import { onMounted } from 'vue';
import { useStore } from '@/store';
import { GET_MARKERS } from '@/store/actions';
import { Paths } from '@/router';
import { RequestState } from '@/types';

const store = useStore();

onMounted(() => {
  store.dispatch(GET_MARKERS);
});
</script>

<template>
  <v-skeleton-loader
    type="list-item"
    v-if="store.state.marker.loadingMarkers === RequestState.Loading"
  ></v-skeleton-loader>
  <div
    v-if="
      store.state.marker.loadingMarkers === RequestState.Ready &&
      !store.state.marker.list.length
    "
    class="ma-2"
  >
    {{ $t('map.noMarkers') }}
  </div>
  <v-list v-else class="h-100 overflow-y-auto">
    <v-list-item
      v-for="marker in store.state.marker.list"
      :key="marker.id"
      :active="Number($route.params.markerId) === marker.id"
      border
      rounded
      class="ma-1"
      @click="$router.push(`${Paths.MAP}/${marker.id}`)"
    >
      <v-list-item-title>
        <b>{{ $t('map.marker') }} {{ marker.id }}</b>
      </v-list-item-title>
      <v-list-item-subtitle><b>lat:</b> {{ marker.lat }}</v-list-item-subtitle>
      <v-list-item-subtitle><b>lng:</b> {{ marker.lng }}</v-list-item-subtitle>
      <v-list-item-subtitle class="extended-address">
        <b>{{ $t('map.address') }}:</b> {{ marker.address }}
      </v-list-item-subtitle>
    </v-list-item>
  </v-list>
</template>

<style scoped>
.extended-address {
  -webkit-line-clamp: 10 !important;
  line-clamp: 10 !important;
}
</style>
