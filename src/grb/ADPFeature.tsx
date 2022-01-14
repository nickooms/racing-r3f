import { PolygonFeature, PolygonFeatureProps } from '../PolygonFeature';

export const ADPFeature: React.FC<PolygonFeatureProps> = ({ ...props }) => (
  <PolygonFeature {...props} color="beige" y={0} />
);
