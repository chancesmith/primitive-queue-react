import { createPrimitiveQueue } from "./primitiveQueue";

describe("queue", () => {
  it("should start empty", () => {
    const queue = createPrimitiveQueue<number>();
    expect(queue.size()).toBe(0);
    expect(queue.isEmpty()).toBe(true);
  });
  it("should have size 1 when one item is added", () => {
    const queue = createPrimitiveQueue<number>();
    queue.enqueue(1);
    expect(queue.size()).toBe(1);
    queue.enqueue(2);
    expect(queue.size()).toBe(2);
  });
  it("should have size 0 when one item is added and removed", () => {
    const queue = createPrimitiveQueue<number>();
    queue.enqueue(1);
    queue.enqueue(2);
    queue.dequeue();
    expect(queue.size()).toBe(1);
    queue.dequeue();
    expect(queue.size()).toBe(0);
  });
  it("should have return undefined if queue is empty", () => {
    const queue = createPrimitiveQueue<number>();
    expect(queue.dequeue()).toBe(undefined);
  });
  it("should be able to see active item in queue", () => {
    const queue = createPrimitiveQueue<number>();
    queue.enqueue(1);
    queue.enqueue(2);
    expect(queue.peek()).toBe(1);
    expect(queue.dequeue()).toBe(1);
    expect(queue.peek()).toBe(2);
    expect(queue.dequeue()).toBe(2);
    expect(queue.peek()).toBe(undefined);
  });
  it("should list items in queue", () => {
    const queue = createPrimitiveQueue<number>();
    queue.enqueue(1);
    queue.enqueue(2);
    expect(queue.list()).toEqual([1, 2]);
  });
  it("should prevent adding duplicate items", () => {
    const queue = createPrimitiveQueue<number>();
    expect(queue.enqueue(1)).toBe(true);
    expect(queue.enqueue(1)).toBe(false);
  });
});
