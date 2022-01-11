import { LineFeature, LineFeatureProps } from '../LineFeature';

export const WVBFeature: React.FC<LineFeatureProps> = ({ ...props }) => {
  return <LineFeature {...props} color={[Math.random(), Math.random(), Math.random()]} />;
};
