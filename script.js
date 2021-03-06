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
  const output = displaynum.toString()
  numdisplay.textContent = output;
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

equal.addEventListener('click', () => {
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
  displaynum = Number(numdisplay.textContent)
  operand1 = displaynum;
  updateDisplay()
  if (!numdisplay.textContent.includes(".")) {
    document.getElementById(".").disabled = false;
  }
})

// add keyboard support  Should make event listeners up top into functions to reduce repeated code
document.addEventListener('keydown', button => {
  if ("0123456789.".includes(button.key)) {
    if (displaynum === 0 || nextnum) {
      if (button.key == ".") {
        numdisplay.textContent = "0" + button.key;
      } else {numdisplay.textContent = button.key;}
      displaynum = Number(button.key);
      nextnum = false;
    } else {
      numdisplay.textContent += button.key;
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
  }
  else if ("+-*/".includes(button.key)) {
    if (!operator) {
      operand1 = displaynum;
      console.log('operand1:', operand1)
    } else if (!nextnum) {
      equals()
    }
    nextnum = true;
    operator = button.key;
    document.getElementById(".").disabled = false;
    calcdisplay.textContent = `${operand1} ${operator}`
  }
  else if (button.key === "Enter") {
    if (!operand2) {
      operand2 = displaynum;
    }
    calcdisplay.textContent = `${operand1} ${operator} ${operand2} =  ${operate(operator, operand1, operand2)}`
    document.getElementById(".").disabled = false;
    equals()
  }
  else if (button.key === "Backspace") {
    numdisplay.textContent = numdisplay.textContent.slice(0,-1)
    displaynum = Number(numdisplay.textContent)
    operand1 = displaynum;
    updateDisplay()
    if (!numdisplay.textContent.includes(".")) {
      document.getElementById(".").disabled = false;
    }
  }
  else if (button.key === "c" || button.key === "Delete") {
    displaynum = 0;
    calcdisplay.textContent = ""
    operator = null;
    operand1 = null;
    operand2 = null;
    afterequals = false;
    nextnum = false;
    updateDisplay()
  }
})



