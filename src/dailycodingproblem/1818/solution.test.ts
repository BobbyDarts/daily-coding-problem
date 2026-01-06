import { closestPoints } from "./solution";

describe("Problem 1818: Closest Points", () => {
  test("should find closest points from example", () => {
    const points: [number, number][] = [
      [1, 1],
      [-1, -1],
      [3, 4],
      [6, 1],
      [-1, -6],
      [-4, -3],
    ];
    const result = closestPoints(points);

    // Could be in either order
    expect(result).toEqual(
      expect.arrayContaining([
        expect.arrayContaining([1, 1]),
        expect.arrayContaining([-1, -1]),
      ])
    );
  });

  test("should handle exactly two points", () => {
    const points: [number, number][] = [
      [0, 0],
      [3, 4],
    ];
    const result = closestPoints(points);

    expect(result).toHaveLength(2);
    expect(result).toEqual(
      expect.arrayContaining([
        expect.arrayContaining([0, 0]),
        expect.arrayContaining([3, 4]),
      ])
    );
  });

  test("should handle points on a horizontal line", () => {
    const points: [number, number][] = [
      [1, 0],
      [5, 0],
      [2, 0],
      [10, 0],
    ];
    const result = closestPoints(points);

    expect(result).toEqual(
      expect.arrayContaining([
        expect.arrayContaining([1, 0]),
        expect.arrayContaining([2, 0]),
      ])
    );
  });

  test("should handle points on a vertical line", () => {
    const points: [number, number][] = [
      [0, 1],
      [0, 5],
      [0, 2],
      [0, 10],
    ];
    const result = closestPoints(points);

    expect(result).toEqual(
      expect.arrayContaining([
        expect.arrayContaining([0, 1]),
        expect.arrayContaining([0, 2]),
      ])
    );
  });

  test("should handle points at origin", () => {
    const points: [number, number][] = [
      [0, 0],
      [1, 1],
      [5, 5],
      [0.5, 0.5],
    ];
    const result = closestPoints(points);

    expect(result).toEqual(
      expect.arrayContaining([
        expect.arrayContaining([0, 0]),
        expect.arrayContaining([0.5, 0.5]),
      ])
    );
  });

  test("should handle negative coordinates", () => {
    const points: [number, number][] = [
      [-5, -5],
      [-4, -4],
      [10, 10],
      [20, 20],
    ];
    const result = closestPoints(points);

    expect(result).toEqual(
      expect.arrayContaining([
        expect.arrayContaining([-5, -5]),
        expect.arrayContaining([-4, -4]),
      ])
    );
  });

  test("should handle floating point coordinates", () => {
    const points: [number, number][] = [
      [1.5, 2.3],
      [1.6, 2.4],
      [10.0, 10.0],
      [20.0, 20.0],
    ];
    const result = closestPoints(points);

    expect(result).toEqual(
      expect.arrayContaining([
        expect.arrayContaining([1.5, 2.3]),
        expect.arrayContaining([1.6, 2.4]),
      ])
    );
  });

  test("should handle identical points", () => {
    const points: [number, number][] = [
      [1, 1],
      [1, 1],
      [10, 10],
    ];
    const result = closestPoints(points);

    // Distance is 0 - should return the identical points
    expect(result).toEqual(
      expect.arrayContaining([
        expect.arrayContaining([1, 1]),
        expect.arrayContaining([1, 1]),
      ])
    );
  });

  test("should handle clustered points", () => {
    const points: [number, number][] = [
      [0, 0],
      [0, 1],
      [1, 0],
      [100, 100],
    ];
    const result = closestPoints(points);

    // Either [0,0] & [0,1] or [0,0] & [1,0] are valid (both distance 1)
    const validPairs = [
      [
        [0, 0],
        [0, 1],
      ],
      [
        [0, 0],
        [1, 0],
      ],
    ];

    const resultSet = new Set(result.map((p) => JSON.stringify(p)));
    const isValid = validPairs.some((pair) =>
      pair.every((p) => resultSet.has(JSON.stringify(p)))
    );

    expect(isValid).toBe(true);
  });

  test("should throw error for less than 2 points", () => {
    expect(() => closestPoints([[1, 1]])).toThrow();
    expect(() => closestPoints([])).toThrow();
  });

  test("should handle many points efficiently", () => {
    // Generate 100 random points
    const points: [number, number][] = Array.from({ length: 100 }, () => [
      Math.random() * 100,
      Math.random() * 100,
    ]);

    // Add two very close points
    points.push([50, 50]);
    points.push([50.001, 50.001]);

    const result = closestPoints(points);

    expect(result).toHaveLength(2);
    expect(result).toEqual(
      expect.arrayContaining([
        expect.arrayContaining([50, 50]),
        expect.arrayContaining([50.001, 50.001]),
      ])
    );
  });
});
