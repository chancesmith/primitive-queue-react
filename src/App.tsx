import { useState } from "react";
import "./App.css";
import { createPrimitiveQueue } from "./primitiveQueue";

function App() {
  const [queue] = useState(createPrimitiveQueue<number>());
  const [item, setItem] = useState("");
  const [dequeuedItem, setDequeuedItem] = useState<number | undefined>(
    undefined
  );

  const enqueueItem = () => {
    if (item) {
      const success = queue.enqueue(Number(item));
      if (!success) {
        alert("Queue already has that item.");
        return;
      }
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
        <button onClick={enqueueItem} style={{ marginLeft: "1rem" }}>
          Enqueue
        </button>
        <p>
          Dequeued Item: {dequeuedItem}{" "}
          <button onClick={dequeueItem} style={{ marginLeft: "1rem" }}>
            Dequeue
          </button>
        </p>
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
