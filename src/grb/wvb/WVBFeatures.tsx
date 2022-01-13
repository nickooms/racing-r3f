import { Feature } from 'geojson';
import { WGOFeature } from './WVBFeature';
import { Features, simple } from '../../wfs/Features';
import { WFSFeaturesProps, useGRB } from '../../wfs';

export const WVBFeatures: React.FC<WFSFeaturesProps> = ({ center, bbox }) => {
  const { data } = useGRB({ typename: 'WVB', bbox });
  if (data)
    /* data.features = data?.features.filter(
      (feature: GeoJSON.Feature): boolean => feature?.id === 'WVB.329800'
    ); */
    /* .map((feature: GeoJSON.Feature) => ({
        ...feature,
        geometry: {
          ...feature.geometry,
          coordinates: [simple((feature.geometry as GeoJSON.Polygon).coordinates[0])],
        },
      })); */
    data?.features.forEach((feature) => {
      const geometry = feature.geometry as GeoJSON.Polygon;
      geometry.coordinates[0] = simple(geometry.coordinates[0]);
    });
  return (
    <Features data={data}>
      {(feature: Feature) => <WGOFeature {...feature} center={center} key={feature.id} />}
    </Features>
  );
};
