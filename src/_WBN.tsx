import * as THREE from 'three';
import { Line } from '@react-three/drei';
import { Polygon } from 'geojson';

import { useGRB } from './wfs/use-grb';
import { BBoxType } from './BBoxType';

const KRUISPUNTZONE = 1;
const WEGSEGMENT = 2;

const getColor = (type: number): string => {
  switch (type) {
    case KRUISPUNTZONE:
      return 'darkgray';
    case WEGSEGMENT:
      return 'gray';
    default:
      return 'pink';
  }
};

export interface WBNProps {
  center: THREE.Vector3;
  bbox: BBoxType;
}

export const WBN: React.FC<WBNProps> = ({ center, bbox }) => {
  const { data } = useGRB({ typename: 'WBN', bbox });
  return (
    <>
      {center &&
        data?.features.map(({ geometry, properties, id }) => {
          const {
            coordinates: [border],
          } = geometry as Polygon;
          const points = border.map(([x, z]) => new THREE.Vector3(x - center.x, 1, -z - center.z));
          return (
            <Line
              key={id}
              points={points}
              color={getColor(properties!.TYPE)}
              lineWidth={3}
              dashed={false}
            />
          );
        })}
    </>
  );
};
