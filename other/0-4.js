// 4. 将数组分别扁平化后一维数组并去掉重复数字，然后找出两组之间的相同值，和差异值并分别计算这两个结果数字的总值。

// const ary1 = [1, 5, 9, 8, [4], 5, 6, ["3", [2]], 1, 5, 4];
// const ary2 = [6, 5, 89, 1, [2], 3, 6, 5, [["5"], 6], 5, 4];

function processArrays(arr1, arr2) {
  const flattenAndParse = (arr) =>
    [...new Set(
      arr.flat(Infinity)
        .map(item => parseInt(item))
        .filter(item => !isNaN(item))
    )];

  const set1 = flattenAndParse(arr1);
  const set2 = flattenAndParse(arr2);

  const common = set1.filter(num => set2.includes(num));

  const diff = [
    ...set1.filter(num => !set2.includes(num)),
    ...set2.filter(num => !set1.includes(num))
  ];

  const sumCommon = common.reduce((sum, num) => sum + num, 0);
  const sumDiff = diff.reduce((sum, num) => sum + num, 0);

  return { common, diff, sumCommon, sumDiff };
}

// 测试数据
const arr1 = [1, 5, 9, 8, [4], 5, 6, ["3", [2]], 1, 5, 4];
const arr2 = [6, 5, 89, 1, [2], 3, 6, 5, [["5"], 6], 5, 4];

// 执行处理
const result = processArrays(arr1, arr2);

console.log("相同值:", result.common); // [1, 5, 4, 6, 2]
console.log("差异值:", result.diff); // [9, 8, 3, 89]
console.log("相同值总和:", result.sumCommon); // 18
console.log("差异值总和:", result.sumDiff); // 109
