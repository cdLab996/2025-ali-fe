const getTimeStamp = time => Date.parse(`01 May 2021 ${time} GMT`);

const table1 = [
  { date: getTimeStamp('00:00:00'), value: 'a0' },
  { date: getTimeStamp('00:02:00'), value: 'a2' },
  { date: getTimeStamp('00:04:00'), value: 'a4' },
  { date: getTimeStamp('00:06:00'), value: 'a6' },
  { date: getTimeStamp('00:07:00'), value: 'a7' }
];

const table2 = [
  { date: getTimeStamp('00:00:00'), value: 'b0' },
  { date: getTimeStamp('00:03:00'), value: 'b3' },
  { date: getTimeStamp('00:04:00'), value: 'b4' },
  { date: getTimeStamp('00:05:00'), value: 'b5' }
];

function mergeTimeSeries(table1, table2) {
  const allDates = [...new Set([...table1.map(item => item.date), ...table2.map(item => item.date)])].sort((a, b) => a - b);

  const result = [];

  let lastValue1 = table1[0].value;
  let lastValue2 = table2[0].value;

  allDates.forEach(date => {
    const table1Entry = table1.find(item => item.date === date);
    if (table1Entry) {
      lastValue1 = table1Entry.value;
    }

    const table2Entry = table2.find(item => item.date === date);
    if (table2Entry) {
      lastValue2 = table2Entry.value;
    }

    result.push([date, lastValue1, lastValue2]);
  });

  return result;
}

const mergedResult = mergeTimeSeries(table1, table2);

console.log("Merged Result:", mergedResult);

const expectedResult = [
  [1619827200000, 'a0', 'b0'],
  [1619827320000, 'a2', 'b0'],
  [1619827380000, 'a2', 'b3'],
  [1619827440000, 'a4', 'b4'],
  [1619827500000, 'a4', 'b5'],
  [1619827560000, 'a6', 'b5'],
  [1619827620000, 'a7', 'b5']
];
console.log("Expected Result:", expectedResult);
console.log("Test passed:", JSON.stringify(mergedResult) === JSON.stringify(expectedResult));
