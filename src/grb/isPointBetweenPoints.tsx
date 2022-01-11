// const isNotEmptyGroup = (group: { count: number }): boolean => group.count !== 0;
export function isPointBetweenPoints(
  currPoint: { x: number; y: number },
  point1: { x: number; y: number },
  point2: { x: number; y: number }
): Boolean {
  const dxc = currPoint.x - point1.x;
  const dyc = currPoint.y - point1.y;

  const dxl = point2.x - point1.x;
  const dyl = point2.y - point1.y;

  const cross = dxc * dyl - dyc * dxl;

  if (cross !== 0) {
    return false;
  }
  if (Math.abs(dxl) >= Math.abs(dyl))
    return dxl > 0
      ? point1.x <= currPoint.x && currPoint.x <= point2.x
      : point2.x <= currPoint.x && currPoint.x <= point1.x;
  else
    return dyl > 0
      ? point1.y <= currPoint.y && currPoint.y <= point2.y
      : point2.y <= currPoint.y && currPoint.y <= point1.y;
}
