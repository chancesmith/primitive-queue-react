export type Queuable = {
  id: string;
};

export type Download = {
  videoId: string;
  downloadToken: string;
} & Queuable;

type Queue<T> = {
  enqueue: (item: T) => boolean;
  dequeue: () => T | undefined;
  isEmpty: () => boolean;
  peek: () => T | undefined;
  length: () => number;
  list: () => T[];
  head: () => T | undefined;
  tail: () => T | undefined;
};

export function createMapQueue<T extends Queuable>(): Queue<T> {
  const queue: Map<string, T> = new Map();

  return {
    enqueue: (item: T) => {
      if (queue.has(item.id)) {
        return false;
      }
      queue.set(item.id, item);
      return true;
    },
    dequeue: () => {
      const iterator = queue.values();
      const firstItem = iterator.next().value;
      if (firstItem) {
        queue.delete(firstItem.id);
      }
      return firstItem;
    },
    length: () => queue.size,
    isEmpty: () => queue.size === 0,
    peek: () => queue.values().next().value,
    list: () => Array.from(queue.values()),
    head: () => queue.values().next().value,
    tail: () => {
      const iterator = queue.values();
      let lastItem: T | undefined = undefined;
      for (let item of iterator) {
        lastItem = item;
      }
      return lastItem;
    },
  };
}
