import Watcher from './watcher'

export default class Dep {
  public static target: Watcher | null = null
  public subs: Watcher[]

  constructor() {
    this.subs = []
  }

  addSub(watcher: Watcher) {
    this.subs.push(watcher)
  }

  notify() {
    this.subs.forEach(watcher => {
      watcher.update()
    })
  }
}
