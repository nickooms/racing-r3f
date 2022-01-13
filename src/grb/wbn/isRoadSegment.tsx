import { Feature } from 'geojson';
import { WEGSEGMENT } from './WBNFeature';

export const isRoadSegment = (feature: Feature): boolean =>
  feature?.properties?.TYPE === WEGSEGMENT;
