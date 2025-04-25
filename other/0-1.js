// 1. 定义一个计算连乘积的函数，传入一个正整数，返回连乘数结果。连乘数指从小到大能够整除这个数的数字的乘积。

//    fn(10, 2)的计算过程为 10*8*6*4*2*1 = 3840
//    fn(100, 20)的计算过程为 100*80*60*40*20*1 = 3840000000

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
