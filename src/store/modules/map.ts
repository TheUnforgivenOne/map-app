import { type Module } from 'vuex';
import type { RootState, MapModuleState } from '../stateTypes';
import { SET_MAP_MODE } from '../mutations';
import { MapMode } from '@/types';

const mapModule: Module<MapModuleState, RootState> = {
  state: () => ({
    mode: MapMode.View,
  }),

  mutations: {
    [SET_MAP_MODE](state, payload: { newMapMode: MapMode }) {
      state.mode = payload.newMapMode;
    },
  },
};

export default mapModule;
