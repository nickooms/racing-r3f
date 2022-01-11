import { Feature, FeatureCollection } from 'geojson';
import simplify from 'simplify-js';

export interface FeaturesProps {
  data?: FeatureCollection;
  children: (feature: Feature) => React.ReactElement;
}

export const Features: React.FC<FeaturesProps> = ({ data, children }) => (
  <>{data?.features.map(children)}</>
);

export const simple = (points: number[][]) =>
  simplify(points.map(([x, y]) => ({ x, y }))).map(({ x, y }) => [x, y]);
