import { PolygonFeature, PolygonFeatureProps } from '../../PolygonFeature';
import { randomColor } from '../../Color';

// Color.NAMES[Math.random(Object.entries(Color.NAMES).length)]
// console.log(Object.keys(Color.NAMES).length);
export const GRENS_ZONE_ZWAKKE_WEGGEBRUIKER = 1;
export const WEGSEGMENT = 2;

const getColor = (type?: number): string => {
  switch (type) {
    case undefined:
      return randomColor();
    case GRENS_ZONE_ZWAKKE_WEGGEBRUIKER:
      return 'purple';
    case WEGSEGMENT:
      return 'darkgray';
    default:
      return 'pink';
  }
};

export const WGOFeature: React.FC<PolygonFeatureProps> = ({ ...props }) => (
  <PolygonFeature {...props} color={getColor() /*getColor(props.properties!.TYPE)*/} />
);
