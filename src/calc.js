const numberButtons = []
const operators = [
  { key: 'divided', ope: (x, y) => x / y},
  { key: 'multiplied', ope: (x, y) => x * y},
  { key: 'minus', ope: (x, y) => x - y},
  { key: 'plus', ope: (x, y) => x + y}
]

for (let i = 0; i < 10; i++) {
  numberButtons.push(document.getElementById(`js-calc-${i}`))
}

const result = document.getElementById('js-calc-result')
const clear = document.getElementById('js-calc-clear')
const equal = document.getElementById('js-calc-equal')

var value = 0
var type = ''
var tempValue = 0

function setResult(val) {
  if (value !== 0) {
    value = parseFloat(value + val)
  } else {
    value = parseFloat(val)
  }
  result.innerHTML = String(parseFloat(value, 10))
}

function setType(ope, val) {
  if (type) {
    tempValue = calc()
  } else {
    tempValue = val
  }
  type = ope
  console.log(ope.key, val);
  value = 0
}

function calc() {
  var resultValue = type ? type.ope(tempValue, value) : tempValue
  result.innerHTML = String(resultValue)
  return resultValue
}

clear.addEventListener('click', (e) => {
  e.preventDefault()
  console.log('clear')
  value = 0
  type = ''
  setResult(value)
})

numberButtons.forEach(($btn, i) => {
  $btn.addEventListener('click', (e) => {
    e.preventDefault()
    console.log(i)
    setResult(`${i}`)
  })
})


operators.forEach(ope => {
  document.getElementById(`js-calc-${ope.key}`).addEventListener('click', (e) => {
    e.preventDefault()
    console.log(ope.key)
    setType(ope, value)
  })
})

equal.addEventListener('click', (e) => {
  e.preventDefault()
  console.log('equal')
  tempValue = calc()
  value = 0
})
