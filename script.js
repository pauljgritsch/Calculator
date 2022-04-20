const numdisplay = document.querySelector('#numdisplay')
const calcdisplay = document.querySelector('#calcdisplay')
const numbers = document.querySelectorAll('.number')
const operators = document.querySelectorAll('.operator')
const equal = document.querySelector('.equals')
const clear = document.querySelector('#c')
const backspace = document.querySelector("#backspace")

let operator = null;
let operand1 = 0;
let operand2;
let displaynum = 0;

let afterequals = false;
let nextnum = false;
const numsandops = document.querySelectorAll(".number, .operator")

function updateDisplay() {
  numdisplay.textContent = displaynum.toString();
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
  if (displaynum === 0 || nextnum) {
    if (button.id == ".") {
      numdisplay.textContent = "0" + button.id;
    } else {numdisplay.textContent = button.id;}
    displaynum = Number(button.id);
    nextnum = false;
  } else {
    numdisplay.textContent += button.id;
    displaynum = Number(numdisplay.textContent)
    console.log(displaynum)
  }
  if (operand1) {
    operand2 = displaynum;
    console.log('operand2:', operand2)
  }
  if (numdisplay.textContent.includes(".")) {
    document.getElementById(".").disabled = true;
  }
}))

// Add logic for operator buttons
operators.forEach(button => button.addEventListener("click", () => {
  if (!operator) {
    operand1 = displaynum;
    console.log('operand1:', operand1)
  } else if (!nextnum) {
    // operand1 = operate(operator, operand1, operand2);
    // displaynum = operand1;
    // updateDisplay()
    equals()
  }
  nextnum = true;
  operator = button.id;
  document.getElementById(".").disabled = false;
  calcdisplay.textContent = `${operand1} ${operator}`
}))


// Logic for equal button
function equals() {
  if (operator && operand2) {
    nextnum = true;
    displaynum = operate(operator, operand1, operand2);
    operand1 = displaynum;
    updateDisplay()
  }
  
  // Easter egg if division by 0 is tried
  if (operator === "/" && operand2 === 0) {
    numdisplay.textContent = "DON'T DO THAT"
  }
  console.log('operand1:', operand1, 'operator:', operator, 'operand2:', operand2, 'displaynum:', displaynum)
}

equal.addEventListener('click', () =>{
  if (!operand2) {
    operand2 = displaynum;
  }
  calcdisplay.textContent = `${operand1} ${operator} ${operand2} =  ${operate(operator, operand1, operand2)}`
  document.getElementById(".").disabled = false;
  equals()
})

// logic for clear button
clear.addEventListener('click', () => {
  displaynum = 0;
  calcdisplay.textContent = ""
  operator = null;
  operand1 = null;
  operand2 = null;
  afterequals = false;
  nextnum = false;
  updateDisplay()
})

//backspace button
backspace.addEventListener('click', () => {
  numdisplay.textContent = numdisplay.textContent.slice(0,-1)
  if (!numdisplay.textContent) {
    numdisplay.textContent = "0"
  }
  displaynum = Number(numdisplay.textContent)
  operand1 = displaynum;
  updateDisplay()
})






