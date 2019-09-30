import { AFO, IAfoFn, isIAfoFn } from '../defs'
import { hasKey } from './utils'
import Compiler from './compiler'
import Observer from './observer'
import { is } from '@babel/types'

interface IDataFn extends IAfoFn {}

type DataProps = AFO | IDataFn

interface ICtorOpts {
  el: string
  data: DataProps
  methods: AFO
}

export default class Water {
  public $el: string | null = null
  public $data: DataProps = {}

  constructor(opts: ICtorOpts) {
    this.$el = opts.el

    this.$data =  opts.data
    
    if (this.$data) {
      new Observer(this.$data)
      this.proxyData(this.$data)
    }

    if (this.$el) {
      new Compiler(this.$el, this)
    }
  }

  proxyData(data: any) {
    Object.keys(data).forEach((key: string) => {
      Object.defineProperty(this, key, {
        get() {
          return data[key]
        },
        set(newValue) {
          data[key] = newValue
        },
      })
    })
  }
}
