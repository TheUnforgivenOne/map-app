import type { IMarker } from '@/types';

abstract class AbstractProvider {
  protected abstract init(mapContainerId: string): void;

  abstract cleanUp(): void;

  abstract centerMap(markerId: number): void;

  abstract setMapOnClick(onMapClick: (lat: number, lng: number) => void): void;

  abstract unsetMapOnClick(): void;

  abstract setMarkerOnClick(
    markerId: number,
    onMarkerClick: (markerId: number) => void,
  ): void;

  abstract unsetMarkerOnClick(markerId: number): void;

  abstract displayMarker(marker: IMarker): void;
}

export default AbstractProvider;
