import type { IMarker, INewMarker } from '@/types';

class FakeMarkerService {
  private static localstorageKey = 'markers';
  private static delay = 1000;

  private static genId(markers: { id: number }[]) {
    let newId = -1;
    let idUsed = false;

    do {
      newId += 1;
      idUsed = Boolean(markers.find(({ id }) => id === newId));
    } while (idUsed);

    return newId;
  }

  private static getSync(): IMarker[] {
    const rawMarkers = window.localStorage.getItem(this.localstorageKey);
    let markers: IMarker[];

    if (!rawMarkers) {
      markers = [];
    } else {
      markers = JSON.parse(rawMarkers);
    }
    return markers;
  }

  private static setSync(markers: IMarker[]): void {
    window.localStorage.setItem(this.localstorageKey, JSON.stringify(markers));
  }

  static async getAll(): Promise<IMarker[]> {
    return new Promise(resolve =>
      setTimeout(() => {
        const markers = this.getSync();

        resolve(markers);
      }, this.delay),
    );
  }

  static async create(marker: INewMarker): Promise<IMarker | Error> {
    return new Promise(resolve =>
      setTimeout(async () => {
        const markers = this.getSync();

        const url = new URL('/reverse', 'https://geocode.maps.co');
        const params = new URLSearchParams({
          api_key: import.meta.env.VITE_GEO_API_KEY,
          lat: String(marker.lat),
          lon: String(marker.lng),
        });
        params.forEach((v, k) => url.searchParams.append(k, v));

        const res = await fetch(url).then(res => res.json());
        if (res?.error) {
          throw new Error(res.error.message);
        }

        const id = this.genId(markers);
        const newMarker: IMarker = {
          id,
          address: res.display_name,
          ...marker,
        };
        markers.push(newMarker);

        this.setSync(markers);

        resolve(newMarker);
      }, this.delay),
    );
  }
}

export default FakeMarkerService;
