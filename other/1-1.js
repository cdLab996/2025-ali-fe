/**
 * 将对象转换为特定格式的数组
 * @param {Object} obj 输入对象
 * @returns {Array} 转换后的数组格式
 */
function convertFn(obj) {
  const keys = Object.keys(obj);

  const allSubKeys = new Set();
  keys.forEach(key => {
    Object.keys(obj[key]).forEach(subKey => {
      allSubKeys.add(subKey);
    });
  });

  const subKeysArray = Array.from(allSubKeys).sort();

  const result = [subKeysArray];

  keys.forEach(key => {
    const values = [];
    subKeysArray.forEach(subKey => {
      values.push(obj[key][subKey] !== undefined ? obj[key][subKey] : 0);
    });
    result.push([key, values]);
  });

  return result;
}

// 运行示例 1
const input1 = {
  a: { key1: 'a1', key2: 'a2', key3: 'a3' },
  b: { key1: 'b1', key2: 'b2', key3: 'b3' },
  c: { key1: 'c1', key2: 'c2', key3: 'c3' },
};
const output1 = convertFn(input1);
console.log("Example 1:", JSON.stringify(output1));
console.log("Expected 1:", JSON.stringify([["key1", "key2", "key3"], ["a", ["a1", "a2", "a3"]], ["b", ["b1", "b2", "b3"]], ["c", ["c1", "c2", "c3"]]]));
console.log("Test 1 passed:", JSON.stringify(output1) === JSON.stringify([["key1", "key2", "key3"], ["a", ["a1", "a2", "a3"]], ["b", ["b1", "b2", "b3"]], ["c", ["c1", "c2", "c3"]]]));

// 运行示例 2
const input2 = {
  a: { key1: 'a1', key3: 'a3', key4: 'a4' },
  b: { key1: 'b1', key2: 'b2', key3: 'b3', key5: 'b5' },
  c: { key1: 'c1', key2: 'c2', key3: 'c3', key4: 'c4' },
};
const output2 = convertFn(input2);
console.log("\nExample 2:", JSON.stringify(output2));
console.log("Expected 2:", JSON.stringify([["key1", "key2", "key3", "key4", "key5"], ["a", ["a1", 0, "a3", "a4", 0]], ["b", ["b1", "b2", "b3", 0, "b5"]], ["c", ["c1", "c2", "c3", "c4", 0]]]));
console.log("Test 2 passed:", JSON.stringify(output2) === JSON.stringify([["key1", "key2", "key3", "key4", "key5"], ["a", ["a1", 0, "a3", "a4", 0]], ["b", ["b1", "b2", "b3", 0, "b5"]], ["c", ["c1", "c2", "c3", "c4", 0]]]));
