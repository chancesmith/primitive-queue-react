import { Download, createMapQueue } from "./mapQueue";

const download1: Download = {
  id: "1",
  videoId: "1",
  downloadToken: "1",
};
const download2: Download = {
  id: "2",
  videoId: "2",
  downloadToken: "2",
};

const handler = jest.fn().mockResolvedValue(null);

describe("queue", () => {
  beforeEach(() => {
    handler.mockClear();
  });

  it("should start empty", () => {
    const queue = createMapQueue<Download>(handler);
    expect(queue.getStatus()).toBe("idle");
    expect(queue.length()).toBe(0);
    expect(queue.head()).toBeUndefined();
    expect(queue.tail()).toBeUndefined();
    expect(queue.isEmpty()).toBe(true);
  });
  it("should have size 1 when one item is added", () => {
    const queue = createMapQueue<Download>(handler);
    queue.enqueue(download1);
    expect(queue.length()).toBe(1);
    expect(queue.head()).toBe(download1);
    expect(queue.tail()).toBe(download1);

    queue.enqueue(download2);
    expect(queue.length()).toBe(2);
    expect(queue.head()).toBe(download1);
    expect(queue.tail()).toBe(download2);
  });
  it("should have size 0 when one item is added and removed", () => {
    const queue = createMapQueue<Download>(handler);
    queue.enqueue(download1);
    queue.enqueue(download2);

    queue.dequeue();
    expect(queue.length()).toBe(1);
    expect(queue.head()).toBe(download2);
    expect(queue.tail()).toBe(download2);

    queue.dequeue();
    expect(queue.length()).toBe(0);
    expect(queue.head()).toBeUndefined();
    expect(queue.tail()).toBeUndefined();
  });
  it("should have return undefined if queue is empty", () => {
    const queue = createMapQueue<Download>(handler);
    expect(queue.dequeue()).toBe(undefined);
  });
  it("should be able to see active item in queue", () => {
    const queue = createMapQueue<Download>(handler);
    queue.enqueue(download1);
    queue.enqueue(download2);
    expect(queue.peek()).toBe(download1);
    expect(queue.dequeue()).toBe(download1);
    expect(queue.peek()).toBe(download2);
    expect(queue.dequeue()).toBe(download2);
    expect(queue.peek()).toBe(undefined);
  });
  it("should list items in queue", () => {
    const queue = createMapQueue<Download>(handler);
    queue.enqueue(download1);
    queue.enqueue(download2);
    expect(queue.list()).toEqual([download1, download2]);
  });
  it("should prevent adding duplicate items", () => {
    const queue = createMapQueue<Download>(handler);
    expect(queue.enqueue(download1)).toBe(true);
    expect(queue.enqueue(download1)).toBe(false);
  });
  it("should see into any item in queue", () => {
    const queue = createMapQueue<Download>(handler);
    expect(queue.peekAt(download1.id)).toBeUndefined();
    queue.enqueue(download1);
    queue.enqueue(download2);
    expect(queue.peekAt(download1.id)).toBe(download1);
  });
  it("should drop item from queue by ID", () => {
    const queue = createMapQueue<Download>(handler);
    expect(queue.drop(download1.id)).toBe(false);
    queue.enqueue(download1);
    expect(queue.length()).toBe(1);
    expect(queue.drop(download1.id)).toBe(true);
    expect(queue.length()).toBe(0);
  });
  it("should clear the queue", () => {
    const queue = createMapQueue<Download>(handler);
    queue.enqueue(download1);
    queue.enqueue(download2);
    expect(queue.length()).toBe(2);
    queue.clear();
    expect(queue.length()).toBe(0);
  });
  it("should load a queue from a list", () => {
    const queue = createMapQueue<Download>(handler);
    queue.load([download1, download2]);
    expect(queue.length()).toBe(2);
    expect(queue.head()).toBe(download1);
    expect(queue.tail()).toBe(download2);
  });
  it("should call handler on next if item in queue", () => {
    handler.mockImplementation((videoId) => {
      expect(videoId).toBe(download1.videoId);
    });
    const queue = createMapQueue<Download>(handler);
    expect(handler).toHaveBeenCalledTimes(0);
    queue.next();
    expect(handler).toHaveBeenCalledTimes(0);

    queue.enqueue(download1);
    queue.next();
    expect(queue.getStatus()).toBe("running");
    expect(handler).toHaveBeenCalledTimes(1);

    queue.dequeue();
    expect(queue.getStatus()).toBe("running");
    expect(queue.isEmpty()).toBeTruthy();
    queue.next();
    expect(queue.getStatus()).toBe("idle");
  });
  it("should not call handler if queue is empty", () => {
    const queue = createMapQueue<Download>(handler);
    queue.next();
    expect(queue.getStatus()).toBe("idle");
    expect(handler).not.toHaveBeenCalled();
  });
});

// QueueMonitor to always be processing the next item in the queue
