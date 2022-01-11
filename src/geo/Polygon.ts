import { Line2D } from './Line2D';
import { LineString } from './LineString';
import { Point2DType } from './Point2D';

export type Polygon2DType = Point2DType[];

export class Polygon {
  points: Polygon2DType;

  constructor(points: Polygon2DType) {
    this.points = points;
  }

  get lines() {
    return this.points.map(
      (from: Point2DType, index: number) =>
        new Line2D(from, this.points[index % this.points.length])
    );
  }

  intersects = (geometry: Line2D | LineString): boolean =>
    this.lines.some((line) => line.intersects(geometry));
}
