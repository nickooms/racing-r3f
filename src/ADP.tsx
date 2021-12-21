import { Feature, FeatureCollection } from 'geojson';
import { ADPFeature } from './ADPFeature';
import { WFSFeaturesProps, useGRB } from './wfs';

interface FeaturesProps {
  data?: FeatureCollection;
  center: THREE.Vector3;
}

const Features: React.FC<FeaturesProps> = ({ data, center, children }) => {
  return (
    <>
      {center &&
        data?.features.map((feature) => (
          <ADPFeature {...feature} center={center} key={feature.id} />
        ))}
    </>
  );
};

export const ADPFeatures: React.FC<WFSFeaturesProps> = ({ center, bbox }) => {
  const { data } = useGRB({ typename: 'ADP', bbox });
  return (
    center && (
      <Features data={data} center={center}>
        {(feature: Feature) => <ADPFeature {...feature} center={center} key={feature.id} />}
      </Features>
    )
  );
  /* <>
      {center &&
        data?.features.map((feature) => (
          <ADPFeature {...feature} center={center} key={feature.id} />
        ))}
    </> */
};
