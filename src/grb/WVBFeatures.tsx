import { Feature } from 'geojson';
import { WVBFeature } from './WVBFeature';
import { Features, simple } from '../wfs/Features';
import { WFSFeaturesProps, useGRB } from '../wfs';

export const WVB_ID = 'WVB.100719';

export const isTestWVB = ({ id }: Feature) => id === WVB_ID;

export const WVBFeatures: React.FC<WFSFeaturesProps> = ({ center, bbox }) => {
  const { data } = useGRB({ typename: 'WVB', bbox });
  if (data) {
    data.features = data.features.filter(isTestWVB);
  }
  data?.features.forEach((feature) => {
    const geometry = feature.geometry as GeoJSON.LineString;
    geometry.coordinates = simple(geometry.coordinates);
  });
  return (
    <Features data={data}>
      {(feature: Feature) => <WVBFeature {...feature} center={center} key={feature.id} />}
    </Features>
  );
};
