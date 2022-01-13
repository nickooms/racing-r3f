import { Feature } from 'geojson';
import { GRENS_ZONE_ZWAKKE_WEGGEBRUIKER /* , RAND_VAN_DE_RIJBAAN */ } from './WGOFeature';

export const isSidewalk = (feature: Feature): boolean =>
  [GRENS_ZONE_ZWAKKE_WEGGEBRUIKER /* , RAND_VAN_DE_RIJBAAN */].includes(feature?.properties?.TYPE);
