import type { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';
import { type IMarker, type INewMarker } from '@/types';
import type { LeafletMouseEvent, Map } from 'leaflet';
import genId from '@/utils/genId';
import L from 'leaflet';

export interface State {
  map: Map | null;
  markers: IMarker[];
}

const store = createStore<State>({
  state() {
    return {
      map: null,
      markers: [
        {
          id: 0,
          lat: 44.800011232919125,
          lng: 20.45516743193243,
          address: '',
        },
        {
          id: 1,
          lat: 44.793680273476724,
          lng: 20.46374572048381,
          address: '',
        },
        {
          id: 2,
          lat: 44.80755877674797,
          lng: 20.463059457399,
          address: '',
        },
      ],
    };
  },

  mutations: {
    setMap(state, newMap: Map) {
      state.map = newMap;
    },
    displayMarker(state, { id, lat, lng }: IMarker) {
      if (!state.map) return;

      const marker = L.marker([lat, lng])
        .bindPopup(`id: ${id}, lat: ${lat}, lng: ${lng}`)
        .addTo(state.map);

      const h = (e: LeafletMouseEvent) => {
        console.log(e);
      };
      marker.on('click', h);
    },
  },

  actions: {
    createMarker({ commit, state }, newMarkerValues: INewMarker) {
      const id = genId(state.markers);
      const newMarker = {
        ...newMarkerValues,
        id,
      };

      state.markers.push(newMarker);
      commit('displayMarker', newMarker);
    },
  },
});

export const key: InjectionKey<Store<State>> = Symbol();

export function useStore() {
  return baseUseStore(key);
}

export default store;
