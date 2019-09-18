
// Arbitary Fields Object: 包含任意字段的对象类型定义
export interface AFO {
  [propName: string]: any
}

// 返回 AFO 格式对象的函数类型
export interface IAfoFn {
  (): AFO
}