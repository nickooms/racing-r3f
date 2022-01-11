import { Feature } from 'geojson';
import { ADPFeature } from './ADPFeature';
import { Features } from '../wfs/Features';
import { WFSFeaturesProps, useGRB } from '../wfs';

export const ADPFeatures: React.FC<WFSFeaturesProps> = ({ center, bbox }) => {
  const { data } = useGRB({ typename: 'ADP', bbox });
  return (
    <Features data={data}>
      {(feature: Feature) => <ADPFeature {...feature} center={center} key={feature.id} />}
    </Features>
  );
};
