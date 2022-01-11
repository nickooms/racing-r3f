import { PolygonFeature, PolygonFeatureProps } from '../PolygonFeature';
import { randomColor } from '../Color';

// Color.NAMES[Math.random(Object.entries(Color.NAMES).length)]
// console.log(Object.keys(Color.NAMES).length);
export const KRUISPUNTZONE = 1;
export const WEGSEGMENT = 2;

const getColor = (type?: number): string => {
  switch (type) {
    case undefined:
      return randomColor();
    case KRUISPUNTZONE:
      return 'gray';
    case WEGSEGMENT:
      return 'darkgray';
    default:
      return 'pink';
  }
};

export const WBNFeature: React.FC<PolygonFeatureProps> = ({ ...props }) => (
  <PolygonFeature {...props} color={getColor() /*getColor(props.properties!.TYPE)*/} />
);
