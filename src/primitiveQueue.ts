type Queue<T> = {
  enqueue: (item: T) => boolean;
  dequeue: () => T | undefined;
  isEmpty: () => boolean;
  peek: () => T | undefined;
  size: () => number;
  list: () => T[];
};

export function createPrimitiveQueue<T>(): Queue<T> {
  const queue: Set<T> = new Set();

  return {
    enqueue: (item: T) => {
      if (queue.has(item)) {
        return false;
      }
      queue.add(item);
      return true;
    },
    dequeue: () => {
      const iterator = queue.values();
      const firstItem = iterator.next().value;
      queue.delete(firstItem);
      return firstItem;
    },
    size: () => queue.size,
    isEmpty: () => queue.size === 0,
    peek: () => queue.values().next().value,
    list: () => Array.from(queue.values()),
  };
}
