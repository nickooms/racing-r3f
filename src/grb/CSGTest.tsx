import { Feature, Polygon } from 'geojson';
import * as turf from '@turf/turf';
import { WFSFeaturesProps, useGRB } from '../wfs';
import { PolygonFeature } from '../PolygonFeature';
import { WBN, WGO, WVB } from '.';
import { splitPolygon } from './splitPolygon';

export const CSGTest: React.FC<WFSFeaturesProps> = ({ ...props }) => {
  const wbnActions = WBN.useStore();
  const wgoActions = WGO.useStore();
  const wvbActions = WVB.useStore();
  const { center, bbox } = props;
  const { data: wbn } = useGRB({ typename: 'WBN', bbox });
  const { data: wvb } = useGRB({ typename: 'WVB', bbox });
  const { data: wgo } = useGRB({ typename: 'WGO', bbox });
  if (wbn && wvb && wgo) {
    wgo.features.map(async (feature: Feature) => wgoActions.update(WGO.fromFeature(feature)));
    wvb.features.map(async (feature: Feature) => wvbActions.update(WVB.fromFeature(feature)));
    wbn.features.map(async (feature: Feature) => wbnActions.update(WBN.fromFeature(feature)));
    const segments = wbn.features
      .filter(WBN.isRoadSegment)
      .map((segment: Feature) => {
        const polygon = turf.polygon((segment.geometry as Polygon).coordinates);
        const connections = splitPolygon(polygon, wvb.features);
        const sidewalks = splitPolygon(polygon, wgo.features.filter(WGO.isSidewalk));
        return [...sidewalks, ...connections];
      })
      .flat();
    return (
      <>
        {segments.map((segment, index) => (
          <PolygonFeature
            {...turf.feature({ type: 'Polygon', coordinates: [segment!] })}
            key={index}
            center={center}
            bbox={bbox}
          />
        ))}
      </>
    );
  }
  return null;
};
