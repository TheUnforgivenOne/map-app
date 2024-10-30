<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { Paths } from '@/router';
import i18n, { type AvailableLocalesType } from '@/i18n';

const route = useRoute();

const navDrawerOpen = ref(false);

const setLocale = (newLocale: string) => {
  i18n.global.locale.value = newLocale as AvailableLocalesType;
};

const currentRouteName = computed(() => {
  return route.name?.toString() ?? '';
});
</script>

<template>
  <v-app-bar>
    <v-app-bar-nav-icon
      @click="navDrawerOpen = !navDrawerOpen"
    ></v-app-bar-nav-icon>

    <v-app-bar-title>
      {{ $t(`header.${currentRouteName}Title`) }}
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
      <v-list-item :to="Paths.ABOUT" :active="currentRouteName === 'about'">{{
        $t('header.aboutTitle')
      }}</v-list-item>
      <v-list-item :to="Paths.MAP" :active="currentRouteName === 'map'">{{
        $t('header.mapTitle')
      }}</v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
