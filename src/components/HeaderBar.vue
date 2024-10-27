<script setup lang="ts">
import i18n, { type AvailableLocalesType } from '@/i18n';
import { ref } from 'vue';
import { routes } from '@/router';

const navDrawerOpen = ref(false);

const setLocale = (newLocale: string) => {
  i18n.global.locale.value = newLocale as AvailableLocalesType;
};
</script>

<template>
  <v-app-bar>
    <v-app-bar-nav-icon
      @click="navDrawerOpen = !navDrawerOpen"
    ></v-app-bar-nav-icon>

    <v-app-bar-title>
      {{ $t(`header.${$route.name?.toString()}Title`) }}
    </v-app-bar-title>

    <v-btn>
      {{ $i18n.locale }}
      <v-icon icon="mdi-web"></v-icon>
      <v-menu activator="parent">
        <v-list>
          <v-list-item
            v-for="locale in $i18n.availableLocales"
            :key="locale"
            :active="locale === $i18n.locale"
            @click="setLocale(locale)"
          >
            {{ locale }}
          </v-list-item>
        </v-list>
      </v-menu>
    </v-btn>
  </v-app-bar>

  <v-navigation-drawer v-model="navDrawerOpen">
    <v-list>
      <template v-for="route in routes" :key="route.path">
        <v-list-item
          v-if="route.component"
          :to="route.path"
          :active="route.name === $route.name?.toString()"
        >
          {{ $t(`header.${route.name}Title`) }}
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>
