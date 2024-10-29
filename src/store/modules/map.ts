import { type Module } from 'vuex';
import L, { type Map, type LeafletMouseEvent } from 'leaflet';
import type { RootState, MapModuleState } from '../stateTypes';
import { CREATE_MARKER, INIT_MAP, SET_MAP_MODE } from '../actions';
import { CENTER_MAP, SET_MAP } from '../mutations';
import { MapMode, type IMarker } from '@/types';

const DEFAULT_TILE = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const DEFAULT_ZOOM = 14;
const MAX_ZOOM = 18;

const mapModule: Module<MapModuleState, RootState> = {
  state: () => ({
    ref: null,
    mode: MapMode.View,
  }),

  mutations: {
    [SET_MAP](state, payload: { newMapRef: Map | null }) {
      state.ref = payload.newMapRef;
    },
    [CENTER_MAP](state, payload: { lat: number; lng: number }) {
      state.ref?.setView([payload.lat, payload.lng]);
    },
  },

  actions: {
    [INIT_MAP]({ commit }, payload: { mapContainerId: string }) {
      const { mapContainerId } = payload;

      const map = L.map(mapContainerId).setView([44.8, 20.45], DEFAULT_ZOOM);
      L.tileLayer(DEFAULT_TILE, { maxZoom: MAX_ZOOM }).addTo(map);
      commit(SET_MAP, { newMapRef: map });
    },

    [SET_MAP_MODE](
      { dispatch, state },
      payload: {
        newMapMode: MapMode;
        onMarkerClick: (e: LeafletMouseEvent, marker: IMarker) => void;
      },
    ) {
      if (!state.ref) return;

      const { newMapMode } = payload;
      state.mode = newMapMode;

      if (newMapMode === MapMode.Add) {
        state.ref.on('click', (e: LeafletMouseEvent) => {
          dispatch(CREATE_MARKER, {
            newMarkerValues: { ...e.latlng },
            onMarkerClick: payload.onMarkerClick,
          });
        });
        return;
      }

      if (newMapMode === MapMode.View) {
        state.ref.off('click');
      }
    },
  },
};

export default mapModule;
