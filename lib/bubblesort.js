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
