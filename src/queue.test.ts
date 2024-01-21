import { createQueue } from "./queue";

describe("queue", () => {
  it("should start empty", () => {
    const queue = createQueue<number>();
    expect(queue.size()).toBe(0);
    expect(queue.isEmpty()).toBe(true);
  });
  it("should have size 1 when one item is added", () => {
    const queue = createQueue<number>();
    queue.enqueue(1);
    expect(queue.size()).toBe(1);
    queue.enqueue(2);
    expect(queue.size()).toBe(2);
  });
  it("should have size 0 when one item is added and removed", () => {
    const queue = createQueue<number>();
    queue.enqueue(1);
    queue.enqueue(2);
    queue.dequeue();
    expect(queue.size()).toBe(1);
    queue.dequeue();
    expect(queue.size()).toBe(0);
  });
  it("should be able to see active item in queue", () => {
    const queue = createQueue<number>();
    queue.enqueue(1);
    queue.enqueue(2);
    expect(queue.peek()).toBe(1);
    expect(queue.dequeue()).toBe(1);
    expect(queue.peek()).toBe(2);
    expect(queue.dequeue()).toBe(2);
    expect(queue.peek()).toBe(undefined);
  });
});
