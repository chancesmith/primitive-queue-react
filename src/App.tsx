import { useState } from "react";
import "./App.css";
import { createQueue } from "./queue";

function App() {
  const [queue] = useState(createQueue<number>());
  const [item, setItem] = useState("");
  const [dequeuedItem, setDequeuedItem] = useState<number | undefined>(
    undefined
  );

  const enqueueItem = () => {
    if (item) {
      queue.enqueue(Number(item));
      setItem("");
    }
  };

  const dequeueItem = () => {
    setDequeuedItem(queue.dequeue());
  };
  return (
    <div className="App">
      <h1>Primitive Queue</h1>
      <h2>Actions:</h2>
      <div>
        <input
          type="number"
          value={item}
          onChange={(e) => setItem(e.target.value)}
        />
        <button onClick={enqueueItem}>Enqueue</button>
        <button onClick={dequeueItem}>Dequeue</button>
        <div>Dequeued Item: {dequeuedItem}</div>
      </div>
      <h2>Queue:</h2>
      <ol>
        {queue.list().map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ol>
    </div>
  );
}

export default App;
