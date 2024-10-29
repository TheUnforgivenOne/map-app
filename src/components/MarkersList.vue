<script setup lang="ts">
import { useStore } from '@/store';

const store = useStore();
</script>

<template>
  <h2 class="pt-4">Markers</h2>
  <v-list>
    <v-list-item
      v-for="marker in store.state.marker.list"
      :key="marker.id"
      @click="e => console.log(e)"
      border
      rounded
      class="ma-1"
    >
      <v-list-item-title>Marker {{ marker.id }}</v-list-item-title>
      <v-list-item-subtitle>lat: {{ marker.lat }}</v-list-item-subtitle>
      <v-list-item-subtitle>lng: {{ marker.lng }}</v-list-item-subtitle>
      <v-list-item-subtitle>
        address: {{ marker.address }}
      </v-list-item-subtitle>
    </v-list-item>
  </v-list>
</template>
