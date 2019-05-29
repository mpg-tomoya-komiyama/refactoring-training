export default class Calculator {
  static get OPERATORS() {
    return {
      '/': { key: 'divided',    ope: (x, y) => x / y},
      '*': { key: 'multiplied', ope: (x, y) => x * y},
      '-': { key: 'minus',      ope: (x, y) => x - y},
      '+': { key: 'plus',       ope: (x, y) => x + y}
    }
  }

  constructor() {
    this.value = 0
    this.type = ''
    this.tempValue = 0
  }

  bind(container) {
    this.result = container.querySelector('#js-calc-result')
    this.clear = container.querySelector('#js-calc-clear')
    this.equal = container.querySelector('#js-calc-equal')
    this.numberButtons = []
    for (let i = 0; i < 10; i++) {
      this.numberButtons.push(document.querySelector(`#js-calc-${i}`))
    }

    this.addEvent()
    this.bindKey()
  }

  addEvent() {
    this.numberButtons.forEach(($btn, i) => {
      $btn.addEventListener('click', (e) => {
        e.preventDefault()
        this.onNumber(`${i}`)
      })
    })

    Object.values(Calculator.OPERATORS).forEach(ope => {
      document.getElementById(`js-calc-${ope.key}`).addEventListener('click', (e) => {
        e.preventDefault()
        this.onOperator(ope)
      })
    })

    this.equal.addEventListener('click', (e) => {
      e.preventDefault()
      this.onEqual()
    })

    this.clear.addEventListener('click', (e) => {
      e.preventDefault()
      this.onClear()
    })
  }

  bindKey() {
    document.addEventListener('keyup', (e) => {
      if (e.key.match(/[0-9]/)) {
        this.onNumber(e.key)
      }

      if (e.key in Calculator.OPERATORS) {
        this.onOperator(Calculator.OPERATORS[e.key])
      }

      if (e.key === '=' || e.key === 'Enter') {
        this.onEqual()
      }

      if (e.key === 'c') {
        this.onClear()
      }
    })
  }

  setResult(val) {
    if (this.value !== 0) {
      this.value = parseFloat(this.value + val)
    } else {
      this.value = parseFloat(val)
    }
    this.result.innerHTML = String(parseFloat(this.value, 10))
  }

  setType(ope, val) {
    if (this.type) {
      this.tempValue = this.calc()
    } else {
      this.tempValue = val
    }
    this.type = ope
    console.log(ope.key, val);
    this.value = 0
  }

  calc() {
    var resultValue = this.type ? this.type.ope(this.tempValue, this.value) : this.tempValue
    this.result.innerHTML = String(resultValue)
    return resultValue
  }

  onNumber(number) {
    // number is String
    console.log(number)
    this.setResult(number)
  }

  onOperator(ope) {
    console.log(ope.key)
    this.setType(ope, this.value)
  }

  onEqual() {
    console.log('equal')
    this.tempValue = this.calc()
    this.value = 0
  }

  onClear() {
    console.log('clear')
    this.value = 0
    this.type = ''
    this.setResult(this.value)
  }
}
