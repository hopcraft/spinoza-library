
import WaterDOM from '../src/water-dom'

let waterDom = new WaterDOM('<div>Water DOM</div>')
let $elem = document.createElement('div')
let $text = document.createTextNode(waterDom.$el)
let $fragment = new DocumentFragment() 
let $app = document.querySelector('#app') as HTMLInputElement

if ($app) {
  $app.appendChild(
    $fragment.appendChild(
      $elem.appendChild($text)
    )
  )
  $app.style.backgroundColor = 'green'
}
