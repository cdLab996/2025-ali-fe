
// #### 题目：将嵌套对象转换为特定格式的数组

// 你需要实现一个 `convertFn` 函数，将一个嵌套对象转换为特定格式的二维数组。输入对象包含多个主键（如 `a`, `b`, `c`），每个主键对应一个子对象，子对象包含若干键值对（如 `key1: 'a1'`）。输出数组的格式如下：
// - 第一行：所有子键（`key1`, `key2`, ...）的列表，按字母顺序排序。
// - 后续每行：形如 `[主键, [值1, 值2, ...]]`，其中值的顺序对应第一行的子键顺序。如果某个子键在该主键下没有值，则用 `0` 填充。

// #### 输入输出示例

// **示例 1**  
// **输入**：
// ```javascript
// {
//   a: { key1: 'a1', key2: 'a2', key3: 'a3' },
//   b: { key1: 'b1', key2: 'b2', key3: 'b3' },
//   c: { key1: 'c1', key2: 'c2', key3: 'c3' }
// }
// ```
// **输出**：
// ```javascript
// [
//   ['key1', 'key2', 'key3'],           // 子键列表
//   ['a', ['a1', 'a2', 'a3']],         // 主键 a 的值
//   ['b', ['b1', 'b2', 'b3']],         // 主键 b 的值
//   ['c', ['c1', 'c2', 'c3']]          // 主键 c 的值
// ]
// ```

// **示例 2**  
// **输入**：
// ```javascript
// {
//   a: { key1: 'a1', key3: 'a3', key4: 'a4' },
//   b: { key1: 'b1', key2: 'b2', key3: 'b3', key5: 'b5' },
//   c: { key1: 'c1', key2: 'c2', key3: 'c3', key4: 'c4' }
// }
// ```
// **输出**：
// ```javascript
// [
//   ['key1', 'key2', 'key3', 'key4', 'key5'], // 子键列表
//   ['a', ['a1', 0, 'a3', 'a4', 0]],        // 主键 a 的值，缺失 key2 和 key5 用 0 填充
//   ['b', ['b1', 'b2', 'b3', 0, 'b5']],     // 主键 b 的值，缺失 key4 用 0 填充
//   ['c', ['c1', 'c2', 'c3', 'c4', 0]]      // 主键 c 的值，缺失 key5 用 0 填充
// ]
// ```

// #### 要求
// 1. 实现 `convertFn` 函数，完成上述转换。
// 2. 验证输出结果：`JSON.stringify(convertFn(input))` 应与预期输出一致。


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
