import type { Module } from 'vuex';
import L, { type LeafletMouseEvent } from 'leaflet';
import type { INewMarker, IMarker } from '@/types';
import type { RootState, MarkerModuleState } from '../stateTypes';
import {
  CREATE_MARKER,
  DISPLAY_ALL_MARKERS,
  DISPLAY_MARKER,
  GET_MARKERS,
} from '../actions';
import { ADD_MARKER, SET_LOADING_STATE, SET_MARKERS } from '../mutations';
import FakeMarkerService from '@/services/FakeMarkerService';

// list: [
//   {
//     id: 0,
//     lat: 44.800011232919125,
//     lng: 20.45516743193243,
//     address: '',
//   },
//   {
//     id: 1,
//     lat: 44.793680273476724,
//     lng: 20.46374572048381,
//     address: '',
//   },
//   {
//     id: 2,
//     lat: 44.80755877674797,
//     lng: 20.463059457399,
//     address: '',
//   },
// ],

const markerModule: Module<MarkerModuleState, RootState> = {
  state: {
    list: [],
    loading: false,
  },

  mutations: {
    [SET_MARKERS](state, payload: { markers: IMarker[] }) {
      state.list = payload.markers;
    },

    [ADD_MARKER](state, payload: { marker: IMarker }) {
      state.list.push(payload.marker);
    },

    [SET_LOADING_STATE](state, payload: boolean) {
      state.loading = payload;
    },
  },

  actions: {
    async [GET_MARKERS]({ commit }) {
      commit(SET_LOADING_STATE, true);
      try {
        const markers = await FakeMarkerService.getAll();
        commit(SET_MARKERS, { markers });
        commit(SET_LOADING_STATE, false);
      } catch (e) {
        console.log(e);
        commit(SET_LOADING_STATE, false);
      }
    },

    [DISPLAY_MARKER](
      { rootState },
      payload: {
        marker: IMarker;
        onMarkerClick: (e: LeafletMouseEvent, marker: IMarker) => void;
      },
    ) {
      const mapRef = rootState.map.ref;
      if (!mapRef) return;

      const { id, lat, lng } = payload.marker;

      const marker = L.marker([lat, lng])
        .bindPopup(
          `<div>id: ${id}</div><div>lat: ${lat}</div><div>lng: ${lng}</div>`,
        )
        .addTo(mapRef);

      marker.on('click', (e: LeafletMouseEvent) =>
        payload.onMarkerClick(e, payload.marker),
      );
    },

    [DISPLAY_ALL_MARKERS](
      { state, dispatch },
      payload: {
        onMarkerClick: (e: LeafletMouseEvent, marker: IMarker) => void;
      },
    ) {
      state.list.forEach(marker => {
        dispatch(DISPLAY_MARKER, {
          marker,
          ...payload,
        });
      });
    },

    async [CREATE_MARKER](
      { commit, dispatch },
      payload: {
        newMarkerValues: INewMarker;
        onMarkerClick: (e: LeafletMouseEvent, marker: IMarker) => void;
      },
    ) {
      const marker = await FakeMarkerService.create(payload.newMarkerValues);

      commit(ADD_MARKER, { marker });
      dispatch(DISPLAY_MARKER, {
        marker,
        onMarkerClick: payload.onMarkerClick,
      });
    },
  },
};

export default markerModule;
