import test from 'ava'
import Calculator from '../src/calc'

test('hoge', t => {
  const calculator = new Calculator()
  console.log(calculator)
  t.pass()
})
