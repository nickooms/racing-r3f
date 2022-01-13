import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Vector3 } from 'three';
import IndexedDBProvider from 'use-indexeddb';

import { useLocation } from './hooks';
import * as GRB from './grb';
// import { GBG } from './GBG';
// import { WGO } from './WGO';
// import { WPI } from './WPI';
import { BBoxType } from './BBoxType';
// import { Leva, folder, button, useControls } from 'leva';

const idbConfig = {
  databaseName: 'racing-db',
  version: 4,
  stores: [GRB.WBN.store, GRB.WGO.store, GRB.WVB.store],
};

const CITY = 'Stabroek';
const STREET = 'Markt';
const EXPAND = 50; // 200;
const BBOX: BBoxType = [
  152513.1 - EXPAND,
  221816.38 - EXPAND,
  152686.15 + EXPAND,
  221917.99 + EXPAND,
];

const App = () => {
  const location = useLocation({ city: CITY, street: STREET });
  const loc = location.data?.LocationResult[0].Location!;
  const center = loc ? new Vector3(loc.X_Lambert72, 0, -loc.Y_Lambert72) : null;

  /* const controls = useControls({
    city: {options: {'Stabroek': 23, 'Kapellen': 19}},
  }) */

  return (
    <div id="canvas-container">
      <Canvas camera={{ position: [0, 200, 0], fov: 42 }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls target={[0, 100, 0]} />
        {center && (
          <>
            {/* <GRB.ADPFeatures center={center} bbox={BBOX} /> */}
            <IndexedDBProvider config={idbConfig}>
              <GRB.CSGTest center={center} bbox={BBOX} />
            </IndexedDBProvider>
            {/* <GRB.WBNFeatures center={center} bbox={BBOX} /> */}
            {/* <GRB.GBGFeatures center={center} bbox={BBOX} /> */}
            {/* <GRB.WVBFeatures center={center} bbox={BBOX} /> */}
            {/* <WGO center={center} bbox={BBOX} /> */}
            {/* <WPI center={center} bbox={BBOX} /> */}
          </>
        )}
      </Canvas>
    </div>
  );
};

export default App;
