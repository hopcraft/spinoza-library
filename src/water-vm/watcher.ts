import { EXPR_RE } from './defs'
import { hasKey, isElementNode, isDirective, parser } from './utils'
import Dep from './dep'

export default class Watcher {
  public vm: any
  public expr: string
  public cb: Function
  public value: any

  constructor(vm: any, expr: string, cb: Function) {
    this.vm = vm
    this.expr = expr
    this.cb = cb
    this.value = this.get()
  }

  get() {
    Dep.target = this
    let value = parser.parseFieldValue(this.vm, this.expr)
    Dep.target = null
    return value
  }

  update() {
    let newValue = parser.parseFieldValue(this.vm, this.expr)
    let oldValue = this.value
    if (newValue != oldValue) {
      this.cb(newValue)
    }
  }
}
