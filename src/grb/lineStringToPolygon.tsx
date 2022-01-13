import { Position } from 'geojson';

export const lineStringToPolygon = (
  points: Position[],
  [offsetX, offsetY]: Position = [0.1, 0.1]
) => [...points].concat([...points].reverse().map(([x, y]) => [x + offsetX, y + offsetY]));
