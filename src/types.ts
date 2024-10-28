export interface INewMarker {
  lat: number;
  lng: number;
  address: string;
}

export interface IMarker extends INewMarker {
  id: number;
}
