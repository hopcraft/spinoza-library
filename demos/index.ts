
import { WaterDOM } from '../src/index'

let waterDom = new WaterDOM({
  el: '<div>Water DOM</div>',
  data: {},
  methods: {}
})

let $app = document.querySelector('#app') as HTMLInputElement

if ($app) {
  console.log(waterDom.el)
}