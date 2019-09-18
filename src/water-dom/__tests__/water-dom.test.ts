
import WaterDOM from '../index'

test('WaterDOM', () => {
  let $el = `<div>Water DOM</div>`
  let waterDom = new WaterDOM($el)
  expect(waterDom.$el === $el)
})