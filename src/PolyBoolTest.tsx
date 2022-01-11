import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { PolyBool } from './polybool/polybool';
import { Vector2, Shape, DoubleSide } from 'three';
import { Fragment } from 'react';

interface Cutter {
  regions: number[][][];
  inverted: boolean;
}

const shape: Cutter = {
  regions: [
    [
      [-10, -10],
      [-10, 10],
      [5, 10],
      [10, 4],
      [10, -11],
      [2, -11],
      [2, -9],
      [-5, -9],
      [-5, -10],
    ],
  ],
  inverted: false,
};

const cutter: Cutter = {
  regions: [],
  inverted: false,
};

for (let i = 0; i < 10; i++) {
  let add: number = -11 + i * 2 * 1.1;
  cutter.regions.push([
    [-11, 0 + add],
    [-11, 2 + add],
    [11, 2 + add],
    [11, 0 + add],
  ]);
}

var result = PolyBool.intersect(shape, cutter);

export interface ContourProps {
  pbObject: any;
  color: string | number;
  name: string;
  isMesh: boolean;
  visible: boolean;
}

export const Contour: React.FC<ContourProps> = ({ pbObject, color, name, isMesh, visible }) => (
  <group>
    {pbObject.regions.map((r: any, index: number) => {
      let v2s = r.map(([x, y]: [x: number, y: number]) => new Vector2(x, y));
      return (
        <Fragment key={index}>
          {isMesh ? (
            <mesh key={index}>
              <shapeBufferGeometry args={[new Shape(v2s)]} />
              <meshBasicMaterial color={color} side={DoubleSide} />
            </mesh>
          ) : (
            <lineLoop key={index}>
              <bufferGeometry attach="geometry">
                <bufferAttribute
                  attachObject={['attributes', 'position']}
                  count={v2s.length / 2}
                  array={r.flat()}
                  itemSize={2}
                />
              </bufferGeometry>
              <lineBasicMaterial color={color} />
            </lineLoop>
          )}
        </Fragment>
      );
    })}
  </group>
);

export const PolyBoolTest = () => (
  <div id="canvas-container">
    <Canvas camera={{ position: [0, 0, 20], fov: 42 }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls target={[0, 100, 0]} />
      <Contour pbObject={result} color={0x404040} name="result" isMesh={true} visible={true} />
      <Contour pbObject={cutter} color="gray" name="cutter" isMesh={false} visible={true} />
      <Contour pbObject={shape} color="aqua" name="shape" isMesh={false} visible={true} />
    </Canvas>
  </div>
);
