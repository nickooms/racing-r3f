import { Vector3 } from 'three';
import { Line } from '@react-three/drei';
import { LineString } from 'geojson';

import { useGRB } from './wfs/use-grb';
import { BBoxType } from './BBoxType';

const LAYER = 'WVB';

export interface WVBProps {
  center: Vector3;
  bbox: BBoxType;
}

export const WVB: React.FC<WVBProps> = ({ center, bbox }) => {
  const { data } = useGRB({ typename: LAYER, bbox });
  return (
    <>
      {center &&
        data?.features.map(({ geometry, id }) => {
          const { coordinates } = geometry as LineString;
          const lines = coordinates.map(([x, z]) => new Vector3(x - center.x, 1, -z - center.z));
          return <Line key={id} points={lines} color="black" lineWidth={3} dashed={false} />;
        })}
    </>
  );
};
