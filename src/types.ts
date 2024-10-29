export enum MapMode {
  View = 'View',
  Add = 'Add',
}

export interface INewMarker {
  lat: number;
  lng: number;
}

export interface IMarker extends INewMarker {
  id: number;
  address: string;
}
