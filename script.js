const display = document.querySelector('#display')
const numbers = document.querySelectorAll('.number')
const operators = document.querySelectorAll('.operator')
const equal = document.querySelector('.equals')
let operator;
let operand1 = 0;
let operand2 = 0;
const numsandops = document.querySelectorAll(".number, .operator")

document.getElementById('c').addEventListener('click', () => display.textContent = '')

/*
numbers.forEach(number => number.addEventListener('click', () => {
  display.textContent += number.id
}))

operators.forEach(button => button.addEventListener('click', () => {
  operator = button.id;
  console.log(operator)
  operand1 = +display.textContent;
  display.textContent = 'operator';
}))

equal.addEventListener('click', () => {
  operand2 = +display.textContent
  switch(operator) {
    case ("+"):
      display.textContent = operand1 + operand2;
      break;
    case ("-"):
      display.textContent = operand1 - operand2;
      break;
    case ("*"):
      display.textContent = operand1 * operand2;
      break;
    case ("/"):
      display.textContent = operand1 / operand2
      break;
    default:
      operand1 = display.textContent
  }
})
*/

/* calculator functions */
function add(num1, num2) {
  return num1 + num2
}

function subtract(num1, num2) {
  return num1 - num2
}

function multiply(num1, num2) {
  return num1 * num2
}

function divide(num1, num2) {
  return num1 / num2
}

/*operator function*/
function operate(operator, num1, num2) {
  switch(operator) {
    case ("+"):
      return add(num1, num2)
      break;
    case ("-"):
      return subtract(num1, num2)
      break;
    case ("*"):
      return multiply(num1, num2)
      break;
    case ("/"):
      return divide(num1, num2)
      break;
  }
}

numsandops.forEach(button => button.addEventListener('click', () => {
  display.textContent += button.id;
}))

equal.addEventListener('click', () => {
  display.textContent = loopcalc(display.textContent)
})

function r(string) {
  let regex = /(\d*)([+\-*\/])(\d*)/
  let matches = string.match(regex)
  console.log(matches)
  if (matches[1]) {
    operand1 = Number(matches[1])
  }
  if (matches[3]) {
    operand2 = Number(matches[3])
  }
  switch (matches[2]) {
    case '+':
      return operand1 + operand2;
    case '-':
      return operand1 - operand2;
    case '*':
      return operand1 * operand2;
    case '/':
      return operand1 / operand2;
  }
}

function loopcalc(string) {
  let sections = [];
  let operand;
  let tempstring = '';
  for (let char of string) {
    if (/[\d.]/.test(char)) {
      tempstring += char;
    } else {
      sections.push(tempstring);
      sections.push(char);
      tempstring = ''
    }
  }
  sections.push(tempstring)

  let result = +sections[0];
  console.log(sections)
  for (section of sections) {
    if (!Number(section)) {
      // console.log(section)
      operand = section;
      continue
      }
    
    if (operand == "+") {
      result += +section;
    } else if (operand == "-") {
      result -= section;
    } else if (operand == "*") {
      result *= section;
    } else if (operand == "/") {
      result /= section;
    }
    }
    return result;
  }

