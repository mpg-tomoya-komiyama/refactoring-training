export default class Calculator {
  static get OPERATORS() {
    return {
      divided:    (x, y) => x / y,
      multiplied: (x, y) => x * y,
      minus:      (x, y) => x - y,
      plus:       (x, y) => x + y
    }
  }

  static get KEY_OPERATOR_MAP() {
    return {
      '/': 'divided',
      '*': 'multiplied',
      '-': 'minus',
      '+': 'plus'
    }
  }

  constructor(initValue = 0, onCalc = () => {}) {
    // 入力中の値
    this.value = initValue
    // 内部的な現在の値
    this.tempValue = initValue
    // 現在指定されている演算子
    this.type = null
    this.onCalc = onCalc
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
    this.applyResult(this.value)
  }

  addEvent() {
    this.numberButtons.forEach(($btn, i) => {
      $btn.addEventListener('click', (e) => {
        e.preventDefault()
        this.onNumber(`${i}`)
      })
    })

    Object.keys(Calculator.OPERATORS).forEach(key => {
      document.getElementById(`js-calc-${key}`).addEventListener('click', (e) => {
        e.preventDefault()
        this.onOperator(key)
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

      if (e.key in Calculator.KEY_OPERATOR_MAP) {
        this.onOperator(Calculator.KEY_OPERATOR_MAP[e.key])
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
    this.applyResult(String(parseFloat(this.value, 10)))
  }

  setType(ope, val) {
    if (this.type) {
      this.tempValue = this.calc()
    } else {
      this.tempValue = val
    }
    this.type = ope
    this.value = 0
  }

  calc() {
    var resultValue = this.type ? this.type(this.tempValue, this.value) : this.tempValue
    this.applyResult(String(resultValue))
    this.onCalc(resultValue)
    return resultValue
  }

  applyResult(val) {
    if (this.result) {
      this.result.innerHTML = val
    } else {
      this.showValue = val
    }
  }

  onNumber(number) {
    // number is String
    console.log(number)
    this.setResult(number)
  }

  onOperator(key) {
    console.log(key)
    this.setType(Calculator.OPERATORS[key], this.value)
  }

  onEqual() {
    console.log('equal')
    this.tempValue = this.calc()
  }

  onClear() {
    console.log('clear')
    this.value = 0
    this.type = ''
    this.setResult(this.value)
  }
}
