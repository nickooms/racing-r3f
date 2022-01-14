export type Point = [x: number, y: number];

export type BBoxType = [min: Point, max: Point];

const MIN_POINT: Point = [Infinity, Infinity];
const MAX_POINT: Point = [-Infinity, -Infinity];

const isBetween = (min: number, max: number) => (value: number) => min <= value && value <= max;

export class BBox {
  min: Point = MIN_POINT;
  max: Point = MAX_POINT;

  constructor(...points: Point[]) {
    let [[minX, minY], [maxX, maxY]] = [MIN_POINT, MAX_POINT];
    points.forEach(([x, y]: Point) => {
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
    });
    Object.assign(this, {
      min: [minX, minY],
      max: [maxX, maxY],
    });
  }

  toArray = () => {
    return [this.min, this.max] as BBoxType;
  };

  intersects = (points: Point[]): boolean => {
    const [minX, minY] = this.min;
    const [maxX, maxY] = this.max;
    const xIsBetween = isBetween(minX, maxX);
    const yIsBetween = isBetween(minY, maxY);
    return points.some(([x, y]: Point) => xIsBetween(x) && yIsBetween(y));
  };
}
