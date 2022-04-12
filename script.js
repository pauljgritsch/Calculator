const display = document.querySelector('#display')
const numbers = document.querySelectorAll('.number')
const operators = document.querySelectorAll('.operator')
const equal = document.querySelector('.equals')
const clear = document.querySelector('#c')
let operator = null;
let operand1 = 0;
let operand2;
let displaynum = 0;

let afterequals = false;
let nextnum = false;
const numsandops = document.querySelectorAll(".number, .operator")

function updateDisplay() {
  display.textContent = displaynum.toString();
}

updateDisplay()


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

// Add logic for number buttons
numbers.forEach(button => button.addEventListener("click", () => {
  if (displaynum = 0 || nextnum) {
    displaynum = Number(button.id);
    nextnum = false;
  } else {
    display.textContent += button.id;
    displaynum = Number(display.textContent)
  }
  if (operand1) {
    operand2 = displaynum;
    console.log('operand2:', operand2)
  }
  updateDisplay()
}))

// Add logic for operator buttons
operators.forEach(button => button.addEventListener("click", () => {
  if (!operator) {
    operand1 = displaynum;
    console.log('operand1:', operand1)
  } else if (!nextnum) {
    operand1 = operate(operator, operand1, operand2);
    displaynum = operand1;
    updateDisplay()
  }
  nextnum = true;
  operator = button.id;
}))

// Logic for equal button
equal.addEventListener('click', () => {
  if (operator && operand2) {
    nextnum = true;
    displaynum = operate(operator, operand1, operand2);
    operand1 = displaynum;
    updateDisplay()
  }
  
  // Easter egg if division by 0 is tried
  if (operator === "/" && operand2 === 0) {
    display.textContent = "DON'T DO THAT"
  }

  console.log('operand1:', operand1, 'operator:', operator, 'operand2:', operand2, 'displaynum:', displaynum)
})

// logic for clear button
clear.addEventListener('click', () => {
  displaynum = 0;
  operator = null;
  operand1 = null;
  operand2 = null;
  afterequals = false;
  nextnum = false;
  updateDisplay()
})




