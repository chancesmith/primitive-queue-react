type Status = "idle" | "running";

type Queue<T> = {
  enqueue: (item: T) => boolean;
  dequeue: () => T | undefined;
  isEmpty: () => boolean;
  length: () => number;
  list: () => T[];
  getStatus: () => Status;
  peek: () => T | undefined;
  head: () => T | undefined;
  tail: () => T | undefined;
  peekAt: (item: T) => T | undefined;
  drop: (item: T) => boolean;
  clear: () => void;
  load: (items: T[]) => void;
  next: () => void;
};

type Handler = (item: string) => Promise<void>;

export function createPrimitiveQueue<T extends number | string>(
  handler: Handler
): Queue<T> {
  let status: Status = "idle";
  const queue: Set<T> = new Set();

  const length = () => queue.size;
  const isEmpty = () => queue.size === 0;
  const list = () => Array.from(queue.values());
  const getStatus = () => status;
  const peek = () => queue.values().next().value;
  const head = () => queue.values().next().value;
  const peekAt = (item: T) => (queue.has(item) ? item : undefined);

  const tail = () => {
    const iterator = queue.values();
    let lastItem: T | undefined = undefined;
    for (let item of iterator) {
      lastItem = item;
    }
    return lastItem;
  };

  const enqueue = (item: T) => {
    if (queue.has(item)) {
      return false;
    }
    queue.add(item);
    return true;
  };

  const dequeue = () => {
    const iterator = queue.values();
    const firstItem = iterator.next().value;
    queue.delete(firstItem);
    return firstItem;
  };

  const drop = (item: T) => {
    if (!queue.has(item)) {
      return false;
    }
    queue.delete(item);
    return true;
  };

  const clear = () => {
    queue.clear();
  };

  const load = (items: T[]) => {
    items.forEach((item) => enqueue(item));
  };

  const next = () => {
    if (isEmpty()) {
      status = "idle";
      return;
    } else {
      status = "running";
      handler(peek());
    }
  };

  return {
    length,
    isEmpty,
    list,
    getStatus,
    peek,
    head,
    tail,
    peekAt,
    enqueue,
    dequeue,
    drop,
    clear,
    load,
    next,
  };
}
