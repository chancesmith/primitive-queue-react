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
  peekAt: (id: string) => T | undefined;
  length: () => number;
  list: () => T[];
  head: () => T | undefined;
  tail: () => T | undefined;
  drop: (id: string) => boolean;
  clear: () => void;
  load: (list: T[]) => void;
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
    peekAt: (id: string) => queue.get(id),
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
    drop: (id: string) => {
      if (queue.has(id)) {
        queue.delete(id);
        return true;
      }
      return false;
    },
    clear: () => queue.clear(),
    load: (list: T[]) => {
      list.forEach((item) => queue.set(item.id, item));
    },
  };
}

type QueueManager<T> = {
  state: () => "waiting";
  queue: () => Queue<T>;
};
