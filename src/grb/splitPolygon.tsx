import { Feature, Polygon, LineString, MultiPolygon, GeoJsonProperties, Geometry } from 'geojson';
import * as turf from '@turf/turf';
import { lineStringToPolygon } from './lineStringToPolygon';

export const splitPolygon = (
  line1: Feature<Polygon>,
  features: Feature<Geometry, GeoJsonProperties>[]
) =>
  features
    .map((feature: Feature) => {
      const lines = lineStringToPolygon((feature.geometry as LineString).coordinates);
      const line2 = turf.lineString(lines);
      if (turf.booleanCrosses(line1, line2)) {
        const difference = turf.difference(line1, turf.lineStringToPolygon(line2));
        const { coordinates: polygons } = difference?.geometry as MultiPolygon;
        return polygons.length > 1 ? polygons : null;
      }
      return null;
    })
    .filter(Boolean)
    .flat()
    .flat();
