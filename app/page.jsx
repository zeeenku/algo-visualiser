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
    let maxIterationIndex = numbers.length - 1;
    let animationId = null;

    // Helper function to perform a single pass of bubble sort
    const bubbleSortStep = (i) => {
      if (i >= maxIterationIndex) {
        // Once a single pass is complete, start the next recursive pass
        return true;
      }

      let first_num = numbers[i],
          second_num = numbers[i + 1];
      arrayAccessCount += 2;

      if (first_num > second_num) {
        // Swap the elements
        numbers[i] = second_num;
        numbers[i + 1] = first_num;
        setStatee([...numbers]);  // Always use a copy to avoid direct mutation
        arrayAccessCount += 2;
      }

      comparisonCounts += 1;
      setComparaisonCounts(comparisonCounts);
      setArrayAccessCount(arrayAccessCount);

      return false; // Continue the animation
    };

    // Main recursive function for bubble sort
    const recursiveSort = (i,ne) => {
      if (i <= maxIterationIndex) {
        const isSorted = bubbleSortStep(i);
        if (!isSorted) {
          if(ne%n === 1){
            animationId = requestAnimationFrame(() => recursiveSort(i + 1, ne++));
          }
          else
          {
            recursiveSort(i + 1, ne++);
          }
        } else {
          // If a pass is finished, decrease the range of sorting
          maxIterationIndex--;
          if (maxIterationIndex >= 1) {
            animationId = requestAnimationFrame(() => recursiveSort(0,1));
          }
        }
      } else {
        cancelAnimationFrame(animationId);
      }
    };

    // Start the sorting process
    recursiveSort(0);
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
