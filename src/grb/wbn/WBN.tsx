export type WBNType =
  | { type: 1; lbltype: 'intersection-zone' }
  | { type: 2; lbltype: 'road-segment' };
// export type WBNType = 1 | 2;

export interface WBN {
  id: string;
  type: WBNType;
  coordinates: Float32Array;
}
