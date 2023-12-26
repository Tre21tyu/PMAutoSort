const createDictionary = (numbers) => {
  let zeroCount = 0;
  const dictionary = {};

  for (const num of numbers) {
    const numWithoutZeros = parseInt(num, 10); // Convert to integer to remove leading zeros
    const leadingZeros = num.length - numWithoutZeros.toString().length;

    zeroCount += leadingZeros;

    dictionary[numWithoutZeros] = leadingZeros;
  }

  // Convert the dictionary to an array of key-value pairs and sort it by keys
  const sortedEntries = Object.entries(dictionary).sort(([a], [b]) => a - b);

  // Create a new object from the sorted array
  const sortedDictionary = Object.fromEntries(sortedEntries);

  return sortedDictionary;
};

const sortAndGroupColumnData = (columnData) => {
  // Remove leading and trailing spaces and newlines
  const trimmedColumnData = columnData.trim();

  // Remove blank lines
  const nonBlankLines = trimmedColumnData.split('\n').filter((line) => line.trim() !== '');

  // Convert the array of strings to an array of numbers
  const numbers = nonBlankLines.map((line) => line.trim());

  // Create the dictionary based on the rules and sort it by keys
  const sortedDictionary = createDictionary(numbers);

  // Convert the dictionary to an array of key-value pairs and sort it by keys
  const sortedEntries = Object.entries(sortedDictionary).sort(([a], [b]) => a - b);

  // Create the final result array of strings
  const resultArray = sortedEntries.map(([key, value]) => {
    const paddedKey = String(key).padStart(value + 1, '0');
    return paddedKey;
  });

  return resultArray;
};

// Example usage:
const result = sortAndGroupColumnData('00060287\n00048351\n00076330\n');
console.log(result); // Output: {3: 0, 1: 2, 2: 1, 4: 2}
