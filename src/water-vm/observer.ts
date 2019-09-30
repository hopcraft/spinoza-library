import { AFO } from '../defs'
import Dep from './dep'

export default class Observer {
  constructor(data: AFO) {
    this.observe(data)
  }

  observe(data: AFO) {
    if (!data || typeof data !== 'object') {
      return
    }

    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key])
      this.observe(data[key])
    })
  }

  defineReactive(obj: AFO, key: string, value: any) {
    let self = this
    let dep = new Dep()

    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,

      get() {
        Dep.target && dep.addSub(Dep.target)
        return value
      },

      set(newValue) {
        if (newValue != value) {
          self.observe(newValue)
          value = newValue
          dep.notify()
        }
      },
    })
  }
}
