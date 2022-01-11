import { FC, useMemo } from 'react';
import { Extrude, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Vector2, Shape } from 'three';
import './extrude-test.css';

type Point2D = [x: number, y: number];

interface ExtrudePolygonProps {
  height?: number;
}

const EXTRUDE_SETTINGS = { steps: 1, depth: 1, bevelEnabled: false };

const SHAPE: Point2D[] = [
  [0, 0],
  [0, 8],
  [12, 8],
  [12, 0],
  [0, 0],
];

const vector2 = ([x, y]: Point2D): Vector2 => new Vector2(x, y);

export const shapeFromPoints = (points: Point2D[]): Shape =>
  new Shape().setFromPoints(points.map(vector2));

export const ExtrudeScene: FC<ExtrudePolygonProps> = ({ height = 3 }) => {
  const shape = useMemo(() => shapeFromPoints(SHAPE), []);

  const extrudeSettings = useMemo(() => ({ ...EXTRUDE_SETTINGS, height }), [height]);

  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, -20] }}>
      <color attach="background" args={['black']} />
      <ambientLight />
      <OrbitControls />
      <Extrude args={[shape, extrudeSettings]}>
        <meshPhongMaterial attach="material" color="#f3f3f3" wireframe />
      </Extrude>
    </Canvas>
  );
};
