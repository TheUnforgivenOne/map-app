<script setup lang="ts">
import { Paths } from '@/router';
import { useStore } from '@/store';

const store = useStore();
</script>

<template>
  <v-skeleton-loader
    type="list-item"
    v-if="store.state.marker.loading"
  ></v-skeleton-loader>
  <v-list class="h-100 overflow-y-auto">
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
