import GeoJSON from 'geojson';
// import { Point } from '../BBox';
import { WFSFeaturesProps, useGRB } from '../wfs';
import * as turf from '@turf/turf';
// import { simple } from '../wfs/Features';
import { isRoadSegment } from './isRoadSegment';
import { PolygonFeature } from '../PolygonFeature';

const lineStringToPolygon = (points: number[][]) =>
  [...points].concat([...points].reverse().map(([x, y]) => [x + 0.1, y + 0.1]));
/* points.map((_, index) => {
      const [x, y] = points[points.length - 1 - index];
      return [x + 0.1, y + 0.1];
    })
  ); */

export const CSGTest: React.FC<WFSFeaturesProps> = ({ ...props }) => {
  const { center } = props;
  const { data: wbn } = useGRB({ typename: 'WBN', bbox: props.bbox });
  const { data: wvb } = useGRB({ typename: 'WVB', bbox: props.bbox });
  if (wbn && wvb) {
    const segments = wbn.features
      .filter(isRoadSegment)
      .map((segment: GeoJSON.Feature) => {
        const {
          coordinates: [points],
        } = segment.geometry as GeoJSON.Polygon;
        // const points = coordinates[0] as Point[];
        const line1 = turf.polygon([points]);
        return wvb.features
          .map((connection: GeoJSON.Feature) => {
            const { coordinates } = connection.geometry as GeoJSON.LineString;
            const lines = lineStringToPolygon(coordinates); /* [...coordinates].concat(
              coordinates.map((_, index) => {
                const [x, y] = coordinates[coordinates.length - 1 - index];
                return [x + 0.1, y + 0.1];
              })
            ); */
            const line2 = turf.lineString(lines);
            const cross = turf.booleanCrosses(line1, line2);
            if (cross) {
              const difference = turf.difference(line1, turf.lineStringToPolygon(line2));
              const { coordinates: polygons } = difference?.geometry as GeoJSON.MultiPolygon;
              // console.log(polygons);
              return polygons.length > 1 ? polygons : null;
            }
            return null;
          })
          .filter(Boolean)
          .flat()
          .flat();
      })
      .flat();
    // console.log(segments);
    return (
      <>
        {segments.map((segment, index) => (
          <PolygonFeature
            {...turf.feature({ type: 'Polygon', coordinates: [segment!] })}
            key={index}
            center={center}
            bbox={props.bbox}
          />
        ))}
      </>
    );
  }
  return null;
};
