import * as THREE from 'three';

import { BBoxType } from '../BBoxType';

export interface WFSFeaturesProps {
  center: THREE.Vector3;
  bbox: BBoxType;
}
