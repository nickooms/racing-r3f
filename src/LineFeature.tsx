import * as THREE from 'three';
import { Circle, Line } from '@react-three/drei';
import { Feature, LineString } from 'geojson';

interface LineProps {
  center: THREE.Vector3;
  color?: any;
  vertexColors?: any;
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
  const { coordinates } = geometry as LineString;
  const points = coordinates.map(([x, z]) => new THREE.Vector3(x - center.x, y, -z - center.z));
  return (
    <>
      {points.slice(1).map((to, index) => (
        <>
          <Line
            key={`${id}_${index}`}
            points={[points[index], to]}
            lineWidth={6}
            dashed={true}
            dashSize={1}
            gapSize={0.3}
            color={[Math.random(), Math.random(), Math.random()]}
            onClick={(e) => {
              console.log(e.object.uuid);
            }}
            {...props}
          />
          <Circle key={`${id}_${index}_circle`} position={points[index]} />
        </>
      ))}
    </>
  );
};
