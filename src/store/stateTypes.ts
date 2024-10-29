import { type Map } from 'leaflet';
import { MapMode, type IMarker } from '@/types';

export interface MapModuleState {
  ref: Map | null;
  mode: MapMode;
}

export interface MarkerModuleState {
  list: IMarker[];
  loading: boolean;
}

export interface RootState {
  map: MapModuleState;
  marker: MarkerModuleState;
}
