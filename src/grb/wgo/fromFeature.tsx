import { Feature, LineString } from 'geojson';
import { WGO } from './WGO';

export const fromFeature = ({ id, properties, geometry }: Feature): WGO => ({
  id: id!.toString(),
  type: properties!.TYPE,
  coordinates: new Float32Array((geometry as LineString).coordinates.flat()),
});
