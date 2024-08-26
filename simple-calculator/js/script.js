const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");

let firstOperand = "";
let secondOperand = "";
let currentOperator = null;
let shouldResetDisplay = false;

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => {
    if (b === 0) return "Cannot divide by 0";
    return a / b;
};

const operate = (operator, a, b) => {
    a = parseFloat(a);
    b = parseFloat(b);
    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
        default:
            return null;
    }
};

const clear = () => {
    firstOperand = "";
    secondOperand = "";
    currentOperator = null;
    shouldResetDisplay = false;
    display.value = "";
};

const deleteLast = () => {
    display.value = display.value.toString().slice(0, -1);
};

const appendNumber = (number) => {
    if (shouldResetDisplay) {
        resetDisplay();
        shouldResetDisplay = false;
    }
    display.value += number;
};

const chooseOperator = (operator) => {
    if (currentOperator !== null) {
        calculate();
    }
    firstOperand = display.value;
    currentOperator = operator;
    display.value += ` ${operator} `;
    shouldResetDisplay = false; // Allow appending numbers after operator
};

const calculate = () => {
    if (currentOperator === null || shouldResetDisplay) return;
    const [firstNum, operator, secondNum] = display.value.split(" ");
    if (operator === "/" && secondNum === "0") {
        display.value = "Cannot divide by 0";
        return;
    }
    display.value = roundResult(operate(operator, firstNum, secondNum));
    firstOperand = display.value;
    currentOperator = null;
    shouldResetDisplay = true; // Ready for a new calculation
};

const roundResult = (number) => {
    return Math.round(number * 1000) / 1000;
};

const resetDisplay = () => {
    display.value = "";
};

// Event listeners for buttons
buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
        const value = e.target.dataset.value;
        if (!isNaN(value) || value === ".") {
            appendNumber(value);
        } else if (value === "AC") {
            clear();
        } else if (value === "DEL") {
            deleteLast();
        } else if (value === "=") {
            calculate();
        } else {
            chooseOperator(value);
        }
    });
});
