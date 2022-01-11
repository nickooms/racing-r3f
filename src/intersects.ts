type Point2D = [x: number, y: number];
type Line2D = [from: Point2D, to: Point2D];

// returns true if the line from (a,b)->(c,d) intersects with (p,q)->(r,s)
export const intersects = (
  [[l1FromX, l1FromY], [l1ToX, l1ToY]]: Line2D,
  [[l2FromX, l2FromY], [l2ToX, l2ToY]]: Line2D
): boolean => {
  const det = (l1ToX - l1FromX) * (l2ToY - l2FromY) - (l2ToX - l2FromX) * (l1ToY - l1FromY);
  if (det === 0) {
    return false;
  }
  const lambda =
    ((l2ToY - l2FromY) * (l2ToX - l1FromX) + (l2FromX - l2ToX) * (l2ToY - l1FromY)) / det;
  const gamma =
    ((l1FromY - l1ToY) * (l2ToX - l1FromX) + (l1ToX - l1FromX) * (l2ToY - l1FromY)) / det;
  return 0 < lambda && lambda < 1 && 0 < gamma && gamma < 1;
};
