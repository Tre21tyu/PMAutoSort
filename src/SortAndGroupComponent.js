import React, { useState } from 'react';

function SortAndGroupComponent() {
  const [inputData, setInputData] = useState('');
  const [outputData, setOutputData] = useState('');

  const sortAndGroupColumnData = (columnData) => {
    // Remove leading and trailing spaces and newlines
    const trimmedColumnData = columnData.trim();
  
    // Remove blank lines
    const nonBlankLines = trimmedColumnData.split('\n').filter((line) => line.trim() !== '');
  
    // Convert the array of strings to an array of numbers
    const numbers = nonBlankLines.map((line) => parseFloat(line));
  
    // Using the Array.prototype.sort() method to sort the numbers
    const sortedNumbers = numbers.sort((a, b) => a - b);
  
    // Group consecutive numbers
    const groupedNumbers = [];
    let currentGroup = [sortedNumbers[0]];
    let groupMin = sortedNumbers[0];
    let groupMax = sortedNumbers[0];
  
    for (let i = 1; i < sortedNumbers.length; i++) {
      if (sortedNumbers[i] === currentGroup[currentGroup.length - 1] + 1) {
        currentGroup.push(sortedNumbers[i]);
        groupMax = sortedNumbers[i];
      } else {
        groupedNumbers.push({ group: currentGroup, min: groupMin, max: groupMax });
        currentGroup = [sortedNumbers[i]];
        groupMin = sortedNumbers[i];
        groupMax = sortedNumbers[i];
      }
    }
  
    if (currentGroup.length > 0) {
      groupedNumbers.push({ group: currentGroup, min: groupMin, max: groupMax });
    }
  
    // Identify outliers
    const outliers = sortedNumbers.filter(
      (num) => !groupedNumbers.flat().some((group) => group.group.includes(num))
    );
  
    // Filter out groups with outliers and format the output
    const result = groupedNumbers
      .filter((group) => !outliers.some((outlier) => group.group.includes(outlier)))
      .map((group, index) => `Group ${index + 1}: [${group.min}, ${group.max}]`);
  
    if (outliers.length > 0) {
      result.push(`Outlier: [${outliers.join(', ')}]`);
    }
  
    // Update the state with the output data
    setOutputData(result.join('\n'));
  };
  
 

  const handleRunFunction = () => {
    sortAndGroupColumnData(inputData);
  };

  return (
    <div>
      <label>
        Input Data:
        <textarea value={inputData} onChange={(e) => setInputData(e.target.value)} />
      </label>
      <br />
      <button onClick={handleRunFunction}>Run Function</button>
      <br />
      <label>
        Output Data:
        <textarea value={outputData} readOnly />
      </label>
    </div>
  );
}

export default SortAndGroupComponent;
