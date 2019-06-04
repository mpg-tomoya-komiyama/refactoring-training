import Calculator from './calc'

let result = 0

const url = window.location.search
const resultMatch = url.match(/result=(.*)/)
if (resultMatch) {
  result = parseFloat(resultMatch[1])
  console.log(result)
}

function saveResultInQuery (val) {
  window.history.replaceState({ path: `./?result=${val}` }, '', `./?result=${val}`)
}

const calculator = new Calculator(result, saveResultInQuery)
calculator.bind(document.querySelector('.calc'))

