import { Spinoza } from '../index'

const AINeuroX = 'AINeuroX'

test('Spinoza', () => {
  expect(Spinoza('Hopcraft')).toBe(`Spinoza ${AINeuroX} Hopcraft`)
})

test('Spinoza Add', () => {
  const ADDER = 1
  expect(Spinoza('Hopcraft' + ADDER)).toBe(`Spinoza ${AINeuroX} Hopcraft` + ADDER)
})