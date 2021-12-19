import { FeatureCollection } from 'geojson';
import { useState } from 'react';

import { BBoxType } from '../BBoxType';
import { FetchStates, FetchState } from '../hooks/FetchState';
import { getJson, joinKeyValue } from '../hooks/util';

const URL = 'https://geoservices.informatievlaanderen.be/overdrachtdiensten/GRB/wfs';

const SERVICE = 'WFS';
const VERSION = '2.0.0';
const OUTPUT_FORMAT = 'application/json';
const PREFIX = 'GRB';
const REQUEST = 'GetFeature';

export interface GRBRequest {
  typename: string;
  bbox: BBoxType;
}

// export const getJson = (response: Response) => response.json();

// export const joinKeyValue = ([key, value]: [string, string | number]) => [key, value].join('=');

export const useGRB = ({ typename, bbox }: GRBRequest) => {
  const [fetchState, setFetchState] = useState<FetchState>(FetchStates.IDLE);
  const [data, setData] = useState<FeatureCollection | undefined>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);
  const qs = {
    service: SERVICE,
    version: VERSION,
    outputformat: OUTPUT_FORMAT,
    request: REQUEST,
    typename: `${PREFIX}:${typename}`,
    bbox: bbox.join(','),
  };
  const url = `${URL}?${Object.entries(qs).map(joinKeyValue).join('&')}`;
  if (fetchState === FetchStates.IDLE) {
    setFetchState(FetchStates.FETCHING);
    fetch(url)
      .then(getJson)
      .then((featureCollection) => {
        setData(featureCollection);
        setFetchState(FetchStates.FETCHED);
      })
      .catch((e) => {
        setError(e);
        setFetchState(FetchStates.FETCHED);
      });
  }
  return { fetchState, data, error };
};
