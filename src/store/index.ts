import type { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';
import mapModule from './modules/map';
import markerModule from './modules/marker';
import { type RootState } from './types';

const store = createStore<RootState>({
  modules: {
    map: mapModule,
    marker: markerModule,
  },
});

export const key: InjectionKey<Store<RootState>> = Symbol();

export function useStore() {
  return baseUseStore(key);
}

export default store;
