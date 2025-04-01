function flattenObject(obj, prefix = '', result = {}) {
  // 遍历对象的所有键
  for (const key in obj) {
    // 确保只处理对象自身的属性，不处理原型链上的属性
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      // 构建当前键的完整路径
      const newKey = prefix ? `${prefix}.${key}` : key;
      
      // 如果当前值是对象且不是数组或null，则递归处理
      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        // 递归调用，将当前路径作为前缀传递
        flattenObject(obj[key], newKey, result);
      } else {
        // 如果是基本类型、数组或null，则直接添加到结果对象中
        result[newKey] = obj[key];
      }
    }
  }
  
  return result;
}

// 测试示例
const obj = {
  a: 1,
  b: {
    c: 2,
    d: {
      e: 3,
      f: 4,
    },
  },
  g: 5,
};

const flattened = flattenObject(obj);
console.log(flattened);

// 输出:
// { 'a': 1, 'b.c': 2, 'b.d.e': 3, 'b.d.f': 4, 'g': 5 }
