import { OrderLog } from "./solution";

describe("Problem 1813: Order Log", () => {
  test("should record and retrieve single order", () => {
    const log = new OrderLog(5);
    log.record("order1");
    expect(log.get_last(1)).toBe("order1");
  });

  test("should retrieve orders in correct order", () => {
    const log = new OrderLog(5);
    log.record("order1");
    log.record("order2");
    log.record("order3");

    expect(log.get_last(1)).toBe("order3"); // most recent
    expect(log.get_last(2)).toBe("order2");
    expect(log.get_last(3)).toBe("order1"); // oldest
  });

  test("should handle circular buffer wraparound", () => {
    const log = new OrderLog(3);
    log.record("order1");
    log.record("order2");
    log.record("order3");
    log.record("order4"); // overwrites order1
    log.record("order5"); // overwrites order2

    expect(log.get_last(1)).toBe("order5");
    expect(log.get_last(2)).toBe("order4");
    expect(log.get_last(3)).toBe("order3");
  });

  test("should work with capacity of 1", () => {
    const log = new OrderLog(1);
    log.record("order1");
    expect(log.get_last(1)).toBe("order1");

    log.record("order2"); // overwrites order1
    expect(log.get_last(1)).toBe("order2");
  });

  test("should handle exact capacity fill", () => {
    const log = new OrderLog(5);
    log.record("A");
    log.record("B");
    log.record("C");
    log.record("D");
    log.record("E");

    expect(log.get_last(1)).toBe("E");
    expect(log.get_last(2)).toBe("D");
    expect(log.get_last(3)).toBe("C");
    expect(log.get_last(4)).toBe("B");
    expect(log.get_last(5)).toBe("A");
  });

  test("should handle multiple wraparounds", () => {
    const log = new OrderLog(3);

    // First fill
    log.record("A");
    log.record("B");
    log.record("C");

    // First wraparound
    log.record("D"); // overwrites A
    log.record("E"); // overwrites B
    log.record("F"); // overwrites C

    // Second wraparound
    log.record("G"); // overwrites D

    expect(log.get_last(1)).toBe("G");
    expect(log.get_last(2)).toBe("F");
    expect(log.get_last(3)).toBe("E");
  });

  test("should work with large capacity", () => {
    const log = new OrderLog(100);

    // Record 50 orders
    for (let i = 1; i <= 50; i++) {
      log.record(`order${i}`);
    }

    expect(log.get_last(1)).toBe("order50");
    expect(log.get_last(10)).toBe("order41");
    expect(log.get_last(50)).toBe("order1");
  });

  test("should handle numeric order IDs", () => {
    const log = new OrderLog(3);
    log.record("1001");
    log.record("1002");
    log.record("1003");

    expect(log.get_last(1)).toBe("1003");
    expect(log.get_last(2)).toBe("1002");
    expect(log.get_last(3)).toBe("1001");
  });

  test("should handle order IDs with special characters", () => {
    const log = new OrderLog(3);
    log.record("ORD-2024-001");
    log.record("ORD-2024-002");
    log.record("ORD-2024-003");

    expect(log.get_last(1)).toBe("ORD-2024-003");
    expect(log.get_last(2)).toBe("ORD-2024-002");
  });

  test("should maintain correct order after wraparound at boundary", () => {
    const log = new OrderLog(4);
    log.record("A");
    log.record("B");
    log.record("C");
    log.record("D"); // buffer full, position wraps to 0
    log.record("E"); // overwrites A at position 0

    expect(log.get_last(1)).toBe("E");
    expect(log.get_last(2)).toBe("D");
    expect(log.get_last(3)).toBe("C");
    expect(log.get_last(4)).toBe("B");
  });

  test("should handle continuous recording pattern", () => {
    const log = new OrderLog(5);

    // Simulate continuous e-commerce activity
    const orders = [
      "ord1",
      "ord2",
      "ord3",
      "ord4",
      "ord5",
      "ord6",
      "ord7",
      "ord8",
    ];
    orders.forEach((order) => log.record(order));

    // Last 5 should be ord4, ord5, ord6, ord7, ord8
    expect(log.get_last(1)).toBe("ord8");
    expect(log.get_last(2)).toBe("ord7");
    expect(log.get_last(3)).toBe("ord6");
    expect(log.get_last(4)).toBe("ord5");
    expect(log.get_last(5)).toBe("ord4");
  });
});
