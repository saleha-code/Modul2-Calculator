const calculator = {
  displayValue: "0",
  firstNumber: null,
  waitForSecondNumber: false,
  operator: null,
};

function enterDigitOnScreen(digit) {
  const { displayValue, waitForSecondNumber } = calculator;

  if (waitForSecondNumber === true) {
    calculator.displayValue = digit;
    calculator.waitForSecondNumber = false;
  } else {
    calculator.displayValue =
      displayValue === "0" ? digit : displayValue + digit;
  }
}

function enterDecimal(decimal) {
  if (calculator.waitForSecondNumber === true) {
    calculator.displayValue = "0.";
    calculator.waitForSecondNumber = false;
    return;
  }

  if (!calculator.displayValue.includes(decimal)) {
    calculator.displayValue += decimal;
  }
}

function handleOperator(nextOperator) {
  const { firstNumber, displayValue, operator } = calculator;
  const inputValue = parseFloat(displayValue);

  if (operator && calculator.waitForSecondNumber) {
    calculator.operator = nextOperator;
    return;
  }

  //test for edge cases
  if (firstNumber == null && !isNaN(inputValue)) {
    calculator.firstNumber = inputValue;
  } else if (operator) {
    const result = calculate(firstNumber, inputValue, operator);

    calculator.displayValue = result;
    calculator.firstNumber = result;
  }

  calculator.waitForSecondNumber = true;
  calculator.operator = nextOperator;
}

function calculate(firstNumber, secondOperand, operator) {
  if (operator === "+") {
    return firstNumber + secondOperand;
  } else if (operator === "-") {
    return firstNumber - secondOperand;
  } else if (operator === "*") {
    return firstNumber * secondOperand;
  } else if (operator === "/") {
    return firstNumber / secondOperand;
  }

  return secondOperand;
}

function resetCalculator() {
  calculator.displayValue = "0";
  calculator.firstNumber = null;
  calculator.waitForSecondNumber = false;
  calculator.operator = null;
}

function updateDisplay() {
  const display = document.querySelector(".screen");
  display.value = calculator.displayValue;
}

updateDisplay();

const keys = document.querySelector(".buttons");

keys.addEventListener("click", (event) => {
  const { target } = event;

  //I search up data-* and figured out the way to use data-num
  const value = target.dataset.num;
  //alert("value =" + target.dataset.num);

  //check if a button is pressed, if not return and do no action
  if (!target.matches("button")) {
    //alert("not button?");
    return;
  }

  //check what is the value?
  if (
    value == "+" ||
    value == "-" ||
    value == "*" ||
    value == "/" ||
    value == "="
  ) {
    handleOperator(value);
  } else if (value == ".") {
    enterDecimal(value);
  } else if (value == "c") {
    resetCalculator();
  } else enterDigitOnScreen(value);

  updateDisplay();
});
