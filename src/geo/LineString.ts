import { Line2D } from './Line2D';
import { Point2DType } from './Point2D';

export type LineString2DType = Point2DType[];

export class LineString {
  points: LineString2DType;

  constructor(points: LineString2DType) {
    this.points = points;
  }

  get lines() {
    return this.points
      .slice(1)
      .map((to: Point2DType, index: number) => new Line2D(this.points[index], to));
  }

  intersects = (geometry: Line2D): boolean => this.lines.some((line) => line.intersects(geometry));
}
