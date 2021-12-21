import * as THREE from 'three';

import { useGRB } from './wfs/use-grb';
import { BBoxType } from './BBoxType';
import { LineFeature } from './LineFeature';

const LAYER = 'GBG';

export interface GBGProps {
  center: THREE.Vector3;
  bbox: BBoxType;
}

export const GBG: React.FC<GBGProps> = ({ center, bbox }) => {
  const { data } = useGRB({ typename: LAYER, bbox });
  return (
    <>
      {center &&
        data?.features.map((feature) => (
          <LineFeature {...feature} center={center} key={feature.id} color="red" />
        ))}
    </>
  );
};
