type Queue<T> = {
  enqueue: (item: T) => boolean;
  dequeue: () => T | undefined;
  isEmpty: () => boolean;
  peek: () => T | undefined;
  size: () => number;
  list: () => T[];
};

export function createQueue<T>(): Queue<T> {
  const queue: T[] = [];

  return {
    enqueue: (item: T) => {
      if (queue.includes(item)) {
        return false;
      }
      queue.push(item);
      return true;
    },
    dequeue: () => queue.shift(),
    size: () => queue.length,
    isEmpty: () => queue.length === 0,
    peek: () => queue[0],
    list: () => queue,
  };
}
