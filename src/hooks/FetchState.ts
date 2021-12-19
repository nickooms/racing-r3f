export enum FetchStates {
  IDLE = 'idle',
  FETCHING = 'fetching',
  FETCHED = 'fetched',
}

export type FetchState = FetchStates.IDLE | FetchStates.FETCHING | FetchStates.FETCHED;
