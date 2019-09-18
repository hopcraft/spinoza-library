import { AFO, IAfoFn } from '../defs'

interface IDataFn extends IAfoFn {}

// 构造函数参数对象的字段类型定义
interface ICtorOpts {
  el: string | null
  data: AFO | IDataFn
  methods: AFO
}

export default class WaterDOM {
  public el: string | null = null

  constructor(opts: ICtorOpts) {
    this.el = opts.el
  }
}


interface IParsedDOM {
  [propName: string]: any
}
export function parse(node: HTMLElement): IParsedDOM {
  return {
    name: 'Hopcraft',
    age: 30
  }
}