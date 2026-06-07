import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="inline-flex items-center gap-4 rounded-lg border border-gray-200 bg-white px-5 py-3 shadow-sm">
      <button
        onClick={() => setCount(count - 1)}
        className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 text-gray-700 transition hover:bg-gray-100"
        aria-label="Decrement"
      >
        &minus;
      </button>
      <span className="min-w-[2ch] text-center text-lg font-semibold tabular-nums">
        {count}
      </span>
      <button
        onClick={() => setCount(count + 1)}
        className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 text-gray-700 transition hover:bg-gray-100"
        aria-label="Increment"
      >
        +
      </button>
    </div>
  );
}
