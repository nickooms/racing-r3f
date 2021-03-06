import { Vector3 } from 'three';
import { Circle } from '@react-three/drei';
import { Point } from 'geojson';

import { useGRB } from './wfs/use-grb';
import { BBoxType } from './BBoxType';

const LAYER = 'WPI';

export interface WGOProps {
  center: Vector3;
  bbox: BBoxType;
}

export const WPI: React.FC<WGOProps> = ({ center, bbox }) => {
  const { data } = useGRB({ typename: LAYER, bbox });
  return (
    <>
      {center &&
        data?.features.map(({ geometry, properties, id }) => {
          // console.log(properties);
          const {
            coordinates: [x, z],
          } = geometry as Point;
          return <Circle key={id} position={[x - center.x, 0.1, -z - center.y]} />;
        })}
    </>
  );
};
