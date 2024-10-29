import type { Module } from 'vuex';
import L, { type LeafletMouseEvent } from 'leaflet';
import type { INewMarker, IMarker } from '@/types';
import type { RootState, MarkerModuleState } from '../stateTypes';
import { CREATE_MARKER, DISPLAY_ALL_MARKERS, DISPLAY_MARKER } from '../actions';
import { ADD_MARKER } from '../mutations';
import genId from '@/utils/genId';
// import router, { Paths } from '@/router';

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

  getters: {
    getMarkerById(state, params: { id: number }) {
      return state.list.find(({ id }) => id === params.id);
    },
  },

  mutations: {
    [ADD_MARKER](state, payload: { marker: IMarker }) {
      state.list.push(payload.marker);
    },
  },

  actions: {
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

    [CREATE_MARKER](
      { commit, dispatch, state },
      payload: {
        newMarkerValues: INewMarker;
        onMarkerClick: (e: LeafletMouseEvent, marker: IMarker) => void;
      },
    ) {
      // Get address

      const id = genId(state.list);
      const newMarker: IMarker = {
        id,
        address: '',
        ...payload.newMarkerValues,
      };

      // Save marker to localstorage
      commit(ADD_MARKER, { marker: newMarker });
      dispatch(DISPLAY_MARKER, {
        marker: newMarker,
        onMarkerClick: payload.onMarkerClick,
      });
    },
  },
};

export default markerModule;
