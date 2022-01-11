import { PolygonFeature, PolygonFeatureProps } from '../PolygonFeature';

export const GBGFeature: React.FC<PolygonFeatureProps> = ({ ...props }) => (
  <PolygonFeature {...props} color="red" />
);
