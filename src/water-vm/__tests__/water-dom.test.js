import Water from '../index'

test('Water', () => {
  let $el = `<div>Water DOM</div>`
  let waterDom = new Water({
    el: $el
  })
  expect(waterDom.el === $el)
})