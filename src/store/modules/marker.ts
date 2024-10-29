import type { Module } from 'vuex';
import L, { type LeafletMouseEvent } from 'leaflet';
import type { INewMarker, IMarker } from '@/types';
import type { RootState, MarkerModuleState } from '../types';
import { CREATE_MARKER, DISPLAY_ALL_MARKERS, DISPLAY_MARKER } from '../actions';
import { ADD_MARKER } from '../mutations';
import genId from '@/utils/genId';

const markerModule: Module<MarkerModuleState, RootState> = {
  state: {
    list: [
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
  },

  mutations: {
    [ADD_MARKER](state, payload: { marker: IMarker }) {
      state.list.push(payload.marker);
    },
  },

  actions: {
    [DISPLAY_MARKER]({ rootState }, payload: { marker: IMarker }) {
      const mapRef = rootState.map.ref;
      if (!mapRef) return;

      const { id, lat, lng } = payload.marker;

      const marker = L.marker([lat, lng])
        .bindPopup(
          `<div>id: ${id}</div><div>lat: ${lat}</div><div>lng: ${lng}</div>`,
        )
        .addTo(mapRef);

      const placeholder = (e: LeafletMouseEvent) => {
        console.log(e);
      };
      marker.on('click', placeholder);
    },

    [DISPLAY_ALL_MARKERS]({ state, dispatch }) {
      state.list.forEach(marker => {
        dispatch(DISPLAY_MARKER, { marker });
      });
    },

    [CREATE_MARKER](
      { commit, dispatch, state },
      payload: { newMarkerValues: INewMarker },
    ) {
      const id = genId(state.list);
      const newMarker: IMarker = {
        id,
        address: '',
        ...payload.newMarkerValues,
      };

      commit(ADD_MARKER, { marker: newMarker });
      dispatch(DISPLAY_MARKER, { marker: newMarker });
    },
  },
};

export default markerModule;
