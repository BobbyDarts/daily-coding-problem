import { sqrt } from "../1821/solution";

type Point = [number, number];
type Points = Point[];
type ClosestPoints = [Point, Point];

// Euclidean distance helper function, using sqrt from 1821
// which I wouldn't have if I did these problems in the right order :)
function euclideanDistance(p1: Point, p2: Point): number {
  return sqrt((p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2);
}

export function closestPoints(points: Points): ClosestPoints {
  if (points.length < 2) throw new Error("At least two points are required");

  let minDistance = Infinity;
  let closestPair: ClosestPoints = [points[0]!, points[1]!];

  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const p1 = points[i]!;
      const p2 = points[j]!;
      const dist = euclideanDistance(p1, p2);

      if (dist < minDistance) {
        minDistance = dist;
        closestPair = [p1, p2];
      }
    }
  }

  return closestPair;
}
