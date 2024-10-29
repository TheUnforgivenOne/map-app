import type { IMarker, INewMarker } from '@/types';
import genId from '@/utils/genId';

class FakeMarkerService {
  private static localstorageKey = 'markers';
  private static delay = 1000;

  static async getAll(): Promise<IMarker[]> {
    return new Promise(resolve =>
      setTimeout(() => {
        const rawMarkers = window.localStorage.getItem(this.localstorageKey);

        if (!rawMarkers) {
          resolve([]);
          return;
        }

        resolve(JSON.parse(rawMarkers));
      }, this.delay),
    );
  }

  static async create(marker: INewMarker): Promise<IMarker> {
    return new Promise(resolve =>
      setTimeout(async () => {
        const rawMarkers = window.localStorage.getItem(this.localstorageKey);
        let markers: IMarker[];

        if (rawMarkers) {
          markers = JSON.parse(rawMarkers);
        } else {
          markers = [];
        }

        const address = await fetch(
          `https://geocode.maps.co/reverse?lat=${marker.lat}&lon=${marker.lng}&api_key=${import.meta.env.VITE_GEO_API_KEY}`,
        ).then(res => res.json());

        const id = genId(markers);
        const newMarker: IMarker = {
          id,
          address: address.display_name,
          ...marker,
        };

        markers.push(newMarker);

        window.localStorage.setItem(
          this.localstorageKey,
          JSON.stringify(markers),
        );
        resolve(newMarker);
      }, this.delay),
    );
  }
}

export default FakeMarkerService;
