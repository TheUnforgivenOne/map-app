import { RequestState, MapMode, type IMarker } from '@/types';

export interface MapModuleState {
  mode: MapMode;
}

export interface MarkerModuleState {
  list: IMarker[];
  loadingMarkers: RequestState;
  creatingMarker: RequestState;
}

export interface RootState {
  map: MapModuleState;
  marker: MarkerModuleState;
}
