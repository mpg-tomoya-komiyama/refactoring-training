import test from 'ava'
import Calculator from '../src/calc'

// 足し算
test('1 + 2 =', t => {
  const calc = new Calculator()
  calc.onNumber('1')
  t.is(calc.showValue, '1')
  calc.onOperator('plus')
  calc.onNumber('2')
  t.is(calc.showValue, '2')
  calc.onEqual()
  t.is(calc.showValue, '3')
})

// 引き算
test('10 - 3 =', t => {
  const calc = new Calculator()
  calc.onNumber('1')
  t.is(calc.showValue, '1')
  calc.onNumber('0')
  t.is(calc.showValue, '10')
  calc.onOperator('minus')
  calc.onNumber('3')
  t.is(calc.showValue, '3')
  calc.onEqual()
  t.is(calc.showValue, '7')
})

// 掛け算
test('3 * 7 =', t => {
  const calc = new Calculator()
  calc.onNumber('3')
  t.is(calc.showValue, '3')
  calc.onOperator('multiplied')
  calc.onNumber('7')
  t.is(calc.showValue, '7')
  calc.onEqual()
  t.is(calc.showValue, '21')
})

// 割り算
test('10 / 4 =', t => {
  const calc = new Calculator()
  calc.onNumber('1')
  calc.onNumber('0')
  t.is(calc.showValue, '10')
  calc.onOperator('divided')
  calc.onNumber('4')
  t.is(calc.showValue, '4')
  calc.onEqual()
  t.is(calc.showValue, '2.5')
})

// イコール連打その1
test('1 + 1 = = =', t => {
  const calc = new Calculator()
  calc.onNumber('1')
  calc.onOperator('plus')
  calc.onNumber('1')
  calc.onEqual()
  t.is(calc.showValue, '2')
  calc.onEqual()
  t.is(calc.showValue, '3')
  calc.onEqual()
  t.is(calc.showValue, '4')
})

// イコール連打その2
test('1 * 2 = = =', t => {
  const calc = new Calculator()
  calc.onNumber('1')
  calc.onOperator('multiplied')
  calc.onNumber('2')
  calc.onEqual()
  t.is(calc.showValue, '2')
  calc.onEqual()
  t.is(calc.showValue, '4')
  calc.onEqual()
  t.is(calc.showValue, '8')
})

// クリアー
test('7 + 8 c 3 * 4 =', t => {
  const calc = new Calculator()
  calc.onNumber('7')
  calc.onOperator('plus')
  calc.onNumber('8')
  t.is(calc.showValue, '8')
  calc.onClear()
  t.is(calc.showValue, '0')
  calc.onNumber('3')
  t.is(calc.showValue, '3')
  calc.onOperator('multiplied')
  calc.onNumber('4')
  t.is(calc.showValue, '4')
  calc.onEqual()
  t.is(calc.showValue, '12')
})
