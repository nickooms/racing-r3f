import * as THREE from 'three';
import { Line } from '@react-three/drei';
import { Polygon, Feature } from 'geojson';

interface LineProps {
  center: THREE.Vector3;
  color?: string;
  y?: number;
}

export type LineFeatureProps = Feature & LineProps;

export const LineFeature: React.FC<LineFeatureProps> = ({
  geometry,
  properties,
  id,
  center,
  y = 0,
  ...props
}) => {
  const {
    coordinates: [border],
  } = geometry as Polygon;
  const points = border.map(([x, z]) => new THREE.Vector3(x - center.x, y, -z - center.z));
  return <Line key={id} points={points} lineWidth={3} dashed={false} {...props} />;
};
