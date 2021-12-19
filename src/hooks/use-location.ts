// import GeoJSON from 'geojson';
import { useState } from 'react';

import { FetchStates, FetchState } from '../hooks/FetchState';
import { getJson, joinKeyValue } from '../hooks/util';

const URL = 'https://loc.geopunt.be/v4/location';
// ?q=Stabroek%20Markt

export interface LocationRequest {
  city: string;
  street: string;
}

export interface Corner {
  Lat_WGS84: number;
  Lon_WGS84: number;
  X_Lambert72: number;
  Y_Lambert72: number;
}

export interface BoundingBox {
  LowerLeft: Corner;
  UpperRight: Corner;
}

export const useLocation = ({ city, street }: LocationRequest) => {
  const [fetchState, setFetchState] = useState<FetchState>(FetchStates.IDLE);
  const [data, setData] = useState<
    { LocationResult: [{ BoundingBox: BoundingBox; Location: Corner }] } | undefined
  >(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);
  const qs = { q: `${city}, ${street}` };
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
