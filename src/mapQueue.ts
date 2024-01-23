export type Queuable = {
  id: string;
};

type Handler = (id: string) => Promise<void>;
type Status = "idle" | "running";

export type Download = {
  videoId: string;
  downloadToken: string;
} & Queuable;

type Queue<T> = {
  getStatus: () => Status;
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
  next: () => void;
};

export function createMapQueue<T extends Queuable>(handler: Handler): Queue<T> {
  let status: Status = "idle";
  const queue: Map<string, T> = new Map();

  const length = () => queue.size;
  const isEmpty = () => queue.size === 0;
  const peek = () => queue.values().next().value;
  const peekAt = (id: string) => queue.get(id);
  const list = () => Array.from(queue.values());
  const head = () => queue.values().next().value;
  const clear = () => queue.clear();

  const enqueue = (item: T) => {
    if (queue.has(item.id)) {
      return false;
    }
    queue.set(item.id, item);
    return true;
  };

  const dequeue = () => {
    const iterator = queue.values();
    const firstItem = iterator.next().value;
    if (firstItem) {
      queue.delete(firstItem.id);
    }
    return firstItem;
  };

  const tail = () => {
    const iterator = queue.values();
    let lastItem: T | undefined = undefined;
    for (let item of iterator) {
      lastItem = item;
    }
    return lastItem;
  };

  const drop = (id: string) => {
    if (queue.has(id)) {
      const wasFirstItem = queue.get(id) === head();
      queue.delete(id);
      return true;
    }
    return false;
  };

  const load = (list: T[]) => {
    list.forEach((item) => queue.set(item.id, item));
  };

  const next = () => {
    if (isEmpty()) {
      status = "idle";
      return;
    } else {
      status = "running";
      handler(peek().id);
    }
  };

  const getStatus = () => status;

  return {
    enqueue,
    dequeue,
    isEmpty,
    peek,
    peekAt,
    length,
    list,
    head,
    tail,
    drop,
    clear,
    load,
    next,
    getStatus,
  };
}
