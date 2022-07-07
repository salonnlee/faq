function cloneDeep(target, map = new Map()) {
  if (typeof target !== "object" || target === null) {
    // 如果是值类型, 直接返回
    return target;
  }

  let clonedTarget = Array.isArray(target) /* 考虑数组 */ ? [] : {};

  // 考虑循环引用
  if (map.get(target)) {
    return map.get(target);
  }
  map.set(target, clonedTarget);

  for (const key in target) {
    // 考虑对象原型链属性
    if (target.hasOwnProperty(key)) {
      clonedTarget[key] = cloneDeep(target[key], map);
    }
  }
  return clonedTarget;
}
