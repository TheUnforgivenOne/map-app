import type { IMarker } from '@/types';
import L, {
  type LatLngExpression,
  type Marker as LeafletMarker,
  type LeafletMouseEvent,
  type Map,
} from 'leaflet';
import AbstractProvider from './AbstractProvider';

const DEFAULT_TILE = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const DEFAULT_ZOOM = 14;
const MAX_ZOOM = 18;
const BELGRADE_COORDINATES = [44.8, 20.45] as LatLngExpression;

class OSM extends AbstractProvider {
  // Reference to the leaflet map instance
  protected map: Map | null = null;
  // Object key is id of the marker from DB, value is leaflet marker instance
  protected leafletMarkers: Record<number, LeafletMarker> = {};

  constructor(mapContainerId: string) {
    super();
    this.init(mapContainerId);
  }

  protected init(mapContainerId: string) {
    const _map = L.map(mapContainerId).setView(
      BELGRADE_COORDINATES,
      DEFAULT_ZOOM,
    );
    L.tileLayer(DEFAULT_TILE, { maxZoom: MAX_ZOOM }).addTo(_map);

    this.map = _map;
  }

  cleanUp() {
    // Clear markers
    Object.values(this.leafletMarkers).forEach(marker => {
      marker.remove();
    });

    // Clear layers
    this.map?.eachLayer(layer => layer.remove());

    // Clear map
    this.map?.remove();
  }

  centerMap(markerId: number) {
    if (!this.map) return;

    const leafletMarker = this.leafletMarkers?.[markerId];
    if (!leafletMarker) return;

    this.map.setView(leafletMarker.getLatLng());
  }

  setMapOnClick(onMapClick: (lat: number, lng: number) => void) {
    if (!this.map) return;

    this.map.on('click', (e: LeafletMouseEvent) =>
      onMapClick(e.latlng.lat, e.latlng.lng),
    );
  }

  unsetMapOnClick() {
    if (!this.map) return;

    this.map.off('click');
  }

  setMarkerOnClick(
    markerId: number,
    onMarkerClick: (markerId: number) => void,
  ) {
    const leafletMarker = this.leafletMarkers?.[markerId];
    if (!leafletMarker) return;

    leafletMarker.on('click', () => onMarkerClick(markerId));
  }

  unsetMarkerOnClick(markerId: number) {
    const leafletMarker = this.leafletMarkers?.[markerId];
    if (!leafletMarker) return;

    leafletMarker.off('click');
  }

  displayMarker(marker: IMarker) {
    if (!this.map) return;

    // Handle case if marker already on the map
    if (this.leafletMarkers?.[marker.id]) return;

    const { id, lat, lng, address } = marker;

    const leafletMarker = L.marker([lat, lng])
      .bindPopup(
        `<div>id: ${id}</div><div>lat: ${lat}</div><div>lng: ${lng}</div><div>${address}</div>`,
      )
      .addTo(this.map);

    this.leafletMarkers[marker.id] = leafletMarker;
  }
}

export default OSM;
