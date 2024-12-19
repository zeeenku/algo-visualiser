"use client";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const canvasRef = useRef();

  function generateRandomArray(n, a, b) {
    const randomArray = [];
    for (let i = 0; i < n; i++) {
      const randomValue = Math.floor(Math.random() * (b - a + 1)) + a;
      randomArray.push(randomValue);
    }
    return randomArray;
  }
  const n = 100;
  const max = 10000;
  const min = 1;
  const [statee, setStatee] = useState(generateRandomArray(n,min,max));
  const [comparaisonCounts, setComparaisonCounts] = useState(0);
  const [arrayAccessCount, setArrayAccessCount] = useState(0);

  const start = () => {
    let numbers = [...statee]; // Create a copy of the state to avoid mutation directly
    let comparisonCounts = 0;
    let arrayAccessCount = 0;
    let animationId = null;
    let i = 1; // The index of the element we're inserting
    let j = 0; // The index used to compare the current element to the sorted portion

    // Helper function to perform a single step of insertion sort
    const insertionSortStep = () => {
      if (i >= numbers.length) {
        // Sorting is complete
        return true;
      }

      let currentElement = numbers[i];
      j = i - 1;
      arrayAccessCount += 1; // Access the current element

      // Find the correct position for the current element
      while (j >= 0 && numbers[j] > currentElement) {
        numbers[j + 1] = numbers[j];
        j--;
        arrayAccessCount += 1; // Access the element at numbers[j]
        setStatee([...numbers]); // Always use a copy to avoid direct mutation
      }

      // Place the current element into its correct position
      numbers[j + 1] = currentElement;
      setStatee([...numbers]); // Update the state
      arrayAccessCount += 1; // Access the current element position

      comparisonCounts += (i - 1); // Count comparisons for each iteration
      setComparaisonCounts(comparisonCounts);
      setArrayAccessCount(arrayAccessCount);

      return false; // Continue the animation
    };

    // Main recursive function for insertion sort
    const recursiveSort = () => {
      const isSorted = insertionSortStep();

      if (!isSorted) {
        animationId = requestAnimationFrame(recursiveSort);
      } else {
        cancelAnimationFrame(animationId); // Stop the animation once sorting is complete
      }

      i++; // Move to the next element
    };

    // Start the sorting process
    recursiveSort();
  };
  
  // Drawing the rectangles on canvas whenever statee changes
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = 700;
    canvas.height = 500;

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    statee.forEach((el, i) => {
      const width = (canvas.width *4) / (6*statee.length);
      const left = (canvas.width * i) / statee.length + canvas.width / (6 * statee.length);
      const height = (canvas.height * 0.9 * el) / max;
      const top = canvas.height - height;
      ctx.fillStyle = "#0f172a";
      ctx.fillRect(left, top, width, height);
    });
  }, [statee]); // Redraw canvas every time the statee changes

  return (
    <>
      <canvas ref={canvasRef}></canvas>
      <button onClick={start}>Start Sorting</button>
      <p>Comparisons: {comparaisonCounts}</p>
      <p>Array Accesses: {arrayAccessCount}</p>
    </>
  );
}
