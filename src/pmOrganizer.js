const sortAndGroupColumnData = (columnData) => {
    // Remove leading and trailing spaces and newlines
    const trimmedColumnData = columnData.trim();
  
    // Remove blank lines
    const nonBlankLines = trimmedColumnData.split('\n').filter((line) => line.trim() !== '');
  
    // Convert the array of strings to an array of numbers
    const numbers = nonBlankLines.map((line) => parseFloat(line));

    return numbers
}
