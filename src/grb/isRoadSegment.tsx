import GeoJSON from 'geojson';
import { WEGSEGMENT } from './WBNFeature';

export const isRoadSegment = (feature: GeoJSON.Feature): boolean =>
  feature?.properties?.TYPE === WEGSEGMENT;
