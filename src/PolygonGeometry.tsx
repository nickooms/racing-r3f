import { FC, useMemo } from 'react';
// import { Canvas, useFrame, useThree } from '@react-three/fiber';
// import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
// import * as THREE from 'three';
// import useConstant from 'use-constant';
import { Point2DType } from './geo/Point2D';

interface PolygonGeometryProps {
  points: Point2DType[];
}

export const PolygonGeometry: FC<PolygonGeometryProps> = ({ points }) => {
  // const count = 20;
  // const size = 1;

  const position = useMemo(() => {
    return new Float32Array(points.flatMap(([x, z]) => [x, 0, z]));
    /* new Float32Array([
      // First vertex
      0, 0, 0,
      // Second vertex
      0, 1, 0,
      // Third vertex
      1, 0, 0,
    ]),
    const values = new Array(count * 3 * 3).keys()].flatMap((index) => {
      return (Math.random() - 0.5) * size;
    });
    return new Float32Array(values); */
  }, [points]);

  return (
    <bufferGeometry>
      <bufferAttribute attach="attributes-position" args={[position, 3]} />
    </bufferGeometry>
  );
};
