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

clear.addEventListener('click', () => {
  displaynum = 0;
  operator = null;
  operand1 = null;
  operand2 = null;
  afterequals = false;
  nextnum = false;
  updateDisplay()
})

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
  }
  updateDisplay()
}))

operators.forEach(button => button.addEventListener("click", () => {
  if (!operator) {
    operand1 = displaynum;
  } else if (!nextnum) {
    operand2 = displaynum;
    operand1 = operate(operator, operand1, operand2);
    displaynum = operand1;
    updateDisplay()
  }
  nextnum = true;
  operator = button.id;
}))



equal.addEventListener('click', () => {
  console.log(operand1, operator, operand2, displaynum)
  if (operator && operand2) {  
      
    nextnum = true;
    displaynum = operate(operator, operand1, operand2);
    operand1 = displaynum;
    updateDisplay()
  } 
})




