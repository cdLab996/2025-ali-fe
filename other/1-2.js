// 如何合并两个时间序列数据表（table1 和 table2），并生成一个合并后的结果表。具体来说，这两个表在不同的时间点有更新，我们需要根据这些时间点来合并它们的值。如果某个时间点只有一个表有更新，则使用该表的最新值来填充另一个表的值。
// const getTimeStamp = time => Date.parse(`01 May 2021 ${time} GMT`);
// const table1 = [
//     {date: getTimeStamp('00:00:00'), value: 'a0'},
//     {date: getTimeStamp('00:02:00'), value: 'a2'},
//     {date: getTimeStamp('00:04:00'), value: 'a4'},
//     {date: getTimeStamp('00:06:00'), value: 'a6'},
//     {date: getTimeStamp('00:07:00'), value: 'a7'}
//   ];

//   const table2 = [
//     {date: getTimeStamp('00:00:00'), value: 'b0'},
//     {date: getTimeStamp('00:03:00'), value: 'b3'},
//     {date: getTimeStamp('00:04:00'), value: 'b4'},
//     {date: getTimeStamp('00:05:00'), value: 'b5'},
//   ];
// // 期待的结果
//     const expectedResult = [
//       [getTimeStamp('00:00:00'), 'a0', 'b0'],
//       [getTimeStamp('00:02:00'), 'a2', 'b0'],
//       ..... ]
// 控制台打印出的期待结果：[
//   [ 1619827200000, 'a0', 'b0' ],
//   [ 1619827320000, 'a2', 'b0' ],
//   [ 1619827380000, 'a2', 'b3' ],
//   [ 1619827440000, 'a4', 'b4' ],
//   [ 1619827500000, 'a4', 'b5' ],
//   [ 1619827560000, 'a6', 'b5' ],
//   [ 1619827620000, 'a7', 'b5' ]
// ]

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
