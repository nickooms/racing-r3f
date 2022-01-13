import { Feature, Polygon } from 'geojson';
import { WBN } from './WBN';

export const fromFeature = ({ id, properties, geometry }: Feature): WBN => ({
  id: id!.toString(),
  type: properties!.TYPE,
  coordinates: new Float32Array((geometry as Polygon).coordinates[0].flat()),
});
