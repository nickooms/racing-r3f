import { createContext } from 'react';
import { FeatureCollection } from 'geojson';

export const WBNContext = createContext<FeatureCollection>({} as FeatureCollection);
