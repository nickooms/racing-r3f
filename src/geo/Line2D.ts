import { LineString } from './LineString';
import { Point2DType } from './Point2D';

export type Line2DType = [from: Point2DType, to: Point2DType];

const X = 0;
const Y = 1;

export class Line2D {
  from: Point2DType;
  to: Point2DType;

  constructor(...[from, to]: Line2DType) {
    this.from = from;
    this.to = to;
  }

  get x() {
    return [this.from[X], this.to[X]];
  }

  get y() {
    return [this.from[Y], this.to[Y]];
  }

  get fromX() {
    return this.from[X];
  }

  get fromY() {
    return this.from[Y];
  }

  get toX() {
    return this.to[X];
  }

  get toY() {
    return this.to[Y];
  }

  get dX() {
    const [from, to] = this.x;
    return to - from;
  }

  get dY() {
    const [from, to] = this.y;
    return to - from;
  }

  intersects = (geometry: Line2D | LineString): boolean => {
    if (geometry instanceof LineString) {
      return geometry.lines.some((line) => line.intersects(this));
    }
    const det = this.dX * geometry.dY - geometry.dX * this.dY;
    if (det === 0) {
      return false;
    }
    const dX = geometry.toX - this.fromX;
    const dY = geometry.toY - this.fromY;
    const lineDirection = (geometry.dY * dX - geometry.dX * dY) / det;
    const direction = (this.dX * dY - this.dY * dX) / det;
    return 0 < direction && direction < 1 && 0 < lineDirection && lineDirection < 1;
  };
}
