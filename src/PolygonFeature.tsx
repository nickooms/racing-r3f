import * as THREE from 'three';
import { Line } from '@react-three/drei';
import { Polygon, Feature } from 'geojson';

interface PolygonProps {
  center: THREE.Vector3;
  color?: any;
  y?: number;
}

export type PolygonFeatureProps = Feature & PolygonProps;

export const PolygonFeature: React.FC<PolygonFeatureProps> = ({
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
  // console.log(border);
  const points = border.map(([x, z]) => new THREE.Vector3(x - center.x, y, -z - center.z));
  const click = (e: any) => {
    console.log(e);
  };
  return (
    <Line
      key={id}
      points={points}
      lineWidth={3}
      dashed={false}
      {...props}
      color={props.color}
      onClick={click}
    />
  );
};
