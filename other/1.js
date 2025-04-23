function fn(start, step) {
  if (start < 1 || step < 1 || !Number.isInteger(start) || !Number.isInteger(step)) {
    throw new Error("输入必须为正整数");
  }

  let result = 1;
  for (let i = start; i >= 1; i -= step) {
    result *= i;
  }
  return result;
}

// 测试示例
console.log(fn(10, 2));
// 10 * 8 * 6 * 4 * 2 * 1 = 3840

console.log(fn(100, 20));
// 100 * 80 * 60 * 40 * 20 * 1 = 384000000
