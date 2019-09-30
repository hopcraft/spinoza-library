import { DIRECTIVE_PREFIX, EXPR_RE, DOMUpdaterType } from './defs'

export function hasKey<O>(obj: O, key: keyof any): key is keyof O {
  return key in obj
}

export function isElementNode(node: string | HTMLElement) {
  if (typeof node === 'string') {
    return false
  } else {
    return node.nodeType === 1
  }
}

export function isDirective(name: string): boolean {
  return name.includes(DIRECTIVE_PREFIX)
}

export const domUpdater = {
  [DOMUpdaterType.TEXT](node: HTMLElement, value: string) {
    node.textContent = value
  },

  [DOMUpdaterType.MODEL](node: HTMLInputElement, value: string) {
    node.value = value
  },
}

export const parser = {
  parseExpr(vm: any, expr: string) {
    return expr.replace(EXPR_RE, (...args) => {
      return this.parseFieldValue(vm, args[1])
    })
  },

  parseFieldValue(vm: any, expr: string) {
    let exprs = expr.split('.')
    return exprs.reduce((prev: any, next: string) => {
      return prev[next.trim()]
    }, vm.$data)
  },

  setFieldValue(vm: any, expr: string, value: any) {
    let exprs = expr.split('.')
    return exprs.reduce((prev: any, next: string, currentIdx: number) => {
      let trimNext = next.trim()
      if (currentIdx === exprs.length - 1) {
        return (prev[trimNext] = value)
      }
      return prev[trimNext]
    }, vm.$data)
  },
}
