import { Feature, LineString } from 'geojson';
import { WVB } from './WVB';

export const fromFeature = ({ id, geometry }: Feature): WVB => ({
  id: id!.toString(),
  coordinates: new Float32Array((geometry as LineString).coordinates.flat()),
});
