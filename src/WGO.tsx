import { Vector3 } from 'three';
import { Line } from '@react-three/drei';
import { LineString } from 'geojson';

import { useGRB } from './wfs/use-grb';
import { BBoxType } from './BBoxType';

const LAYER = 'WGO';

export interface WGOProps {
  center: Vector3;
  bbox: BBoxType;
}
const GRENS_ZONE_ZWAKKE_WEGGEBRUIKER_WCZ = 1;
const GRENS_ONVERHARDE_ZONE_WOZ = 2;
const RAND_VAN_DE_RIJBAAN_WRB = 3;

const getColor = (type: number): string => {
  switch (type) {
    case GRENS_ZONE_ZWAKKE_WEGGEBRUIKER_WCZ:
      return 'purple';
    case RAND_VAN_DE_RIJBAAN_WRB:
      return 'brown';
    case GRENS_ONVERHARDE_ZONE_WOZ:
      return 'yellow';
    default:
      return 'pink';
  }
};

export const WGO: React.FC<WGOProps> = ({ center, bbox }) => {
  const { data } = useGRB({ typename: LAYER, bbox });
  return (
    <>
      {center &&
        data?.features.map(({ geometry, properties, id }) => {
          console.log(properties);
          const type = properties!.TYPE!;
          const { coordinates } = geometry as LineString;
          const lines = coordinates.map(([x, z]) => new Vector3(x - center.x, 1, -z - center.z));
          return (
            <Line key={id} points={lines} color={getColor(type)} lineWidth={3} dashed={false} />
          );
        })}
    </>
  );
};
