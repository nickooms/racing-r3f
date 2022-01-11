import * as THREE from 'three';

import { Point } from './BBox';

export const extrude = (points: Point[]) => {
  /* const extrudeSettings = {
    steps: 1,
    depth: 1,
    bevelEnabled: false,
  }; */
  const shape = new THREE.Shape();
  points.forEach(([x, y], index) => {
    if (index === 0) {
      shape.moveTo(x, y);
    } else {
      shape.lineTo(x, y);
    }
  });
  shape.closePath();
  // const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  const geometry = new THREE.ShapeBufferGeometry(shape);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.updateMatrix();
  return mesh;
};
