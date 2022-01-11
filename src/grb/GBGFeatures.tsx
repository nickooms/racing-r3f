import { Feature } from 'geojson';
import { GBGFeature } from './GBGFeature';
import { Features } from '../wfs/Features';
import { WFSFeaturesProps, useGRB } from '../wfs';

export const GBGFeatures: React.FC<WFSFeaturesProps> = ({ center, bbox }) => {
  const { data } = useGRB({ typename: 'GBG', bbox });
  return (
    <Features data={data}>
      {(feature: Feature) => <GBGFeature {...feature} center={center} key={feature.id} />}
    </Features>
  );
};
