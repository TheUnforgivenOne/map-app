import type { Module } from 'vuex';
import { type INewMarker, type IMarker, RequestState } from '@/types';
import type { RootState, MarkerModuleState } from '../stateTypes';
import { CREATE_MARKER, GET_MARKERS } from '../actions';
import {
  ADD_MARKER,
  SET_CREATING_STATE,
  SET_LOADING_STATE,
  SET_MARKERS,
} from '../mutations';
import FakeMarkerService from '@/services/FakeMarkerService';

const markerModule: Module<MarkerModuleState, RootState> = {
  state: {
    list: [],
    loadingMarkers: RequestState.Initial,
    creatingMarker: RequestState.Initial,
  },

  mutations: {
    [SET_MARKERS](state, payload: { markers: IMarker[] }) {
      state.list = payload.markers;
    },

    [ADD_MARKER](state, payload: { marker: IMarker }) {
      state.list.push(payload.marker);
    },

    [SET_LOADING_STATE](state, payload: RequestState) {
      state.loadingMarkers = payload;
    },

    [SET_CREATING_STATE](state, payload: RequestState) {
      state.creatingMarker = payload;
    },
  },

  actions: {
    async [GET_MARKERS]({ commit }) {
      try {
        commit(SET_LOADING_STATE, RequestState.Loading);

        const markers = await FakeMarkerService.getAll();

        commit(SET_MARKERS, { markers });
        commit(SET_LOADING_STATE, RequestState.Ready);
      } catch (e) {
        console.log(e);
        commit(SET_LOADING_STATE, RequestState.Error);
      }
    },

    async [CREATE_MARKER](
      { commit },
      payload: { newMarkerValues: INewMarker },
    ) {
      try {
        commit(SET_CREATING_STATE, RequestState.Loading);

        const marker = await FakeMarkerService.create(payload.newMarkerValues);

        commit(ADD_MARKER, { marker });
        commit(SET_CREATING_STATE, RequestState.Ready);
      } catch (e) {
        console.log(e);
        commit(SET_CREATING_STATE, RequestState.Error);
      }
    },
  },
};

export default markerModule;
