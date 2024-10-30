export enum MapMode {
  View = 'View',
  Add = 'Add',
}

export enum RequestState {
  Initial = 'Initial',
  Loading = 'Loading',
  Ready = 'Ready',
  Error = 'Error',
}

export interface INewMarker {
  lat: number;
  lng: number;
}

export interface IMarker extends INewMarker {
  id: number;
  address: string;
}
