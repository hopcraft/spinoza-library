import Water from './index'
import { EXPR_RE, DOMUpdaterType } from './defs'
import { hasKey, isElementNode, isDirective, parser, domUpdater } from './utils'
import Watcher from './watcher'

export default class Compiler {
  public el: HTMLElement
  public vm: Water

  constructor(el: any, vm: Water) {
    this.el = isElementNode(el)
      ? el
      : (document.querySelector(el) as HTMLElement)

    this.vm = vm

    if (this.el) {
      let fragment = this.fragmentize(this.el)
      this.compile(fragment)
      this.el.appendChild(fragment)
    }
  }

  compile(fragment: DocumentFragment) {
    let childNodes = fragment.childNodes
    Array.from(childNodes).forEach((node: any) => {
      if (isElementNode(node)) {
        this.compileElementNode(node)
        this.compile(node)
      } else {
        this.compileTextNode(node)
      }
    })
  }

  compileElementNode(node: HTMLElement) {
    let attrs = node.attributes
    Array.from(attrs).forEach(attr => {
      let attrName = attr.name
      if (isDirective(attrName)) {
        let expr = attr.value
        let [, type] = attrName.split('-')
        if (hasKey(render, type)) {
          render[type](node, this.vm, expr)
        }
      }
    })
  }

  compileTextNode(node: HTMLElement) {
    let expr: string = node.textContent || ''
    if (EXPR_RE.test(expr)) {
      render['text'](node, this.vm, expr)
    }
  }

  fragmentize(el: HTMLElement) {
    let fragment = document.createDocumentFragment()
    let firstChild
    while ((firstChild = el.firstChild)) {
      fragment.appendChild(firstChild)
    }
    return fragment
  }
}

export const render = {
  text(node: string | HTMLElement, vm: any, expr: string) {
    let update = domUpdater[DOMUpdaterType.TEXT]
    let value = parser.parseExpr(vm, expr)

    expr.replace(EXPR_RE, (...args): any => {
      new Watcher(vm, args[1], (newValue: any) => {
        update && update(node as HTMLElement, parser.parseExpr(vm, expr))
      })
    })

    update && update(node as HTMLElement, value)
  },

  model(node: string | HTMLElement, vm: any, expr: string) {
    let update = domUpdater[DOMUpdaterType.MODEL]

    new Watcher(vm, expr, (newValue: any) => {
      update && update(node as HTMLInputElement, newValue)
    })

    let element =  node as HTMLElement
    element.addEventListener('input', (e: any) => {
      let newValue = e.target.value
      parser.setFieldValue(vm, expr, newValue)
    })

    update && update(node as HTMLInputElement, parser.parseFieldValue(vm, expr))
  },
}
