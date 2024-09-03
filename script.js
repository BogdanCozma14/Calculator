function add(a, b) {
    return a + b;
}
function subtract(a,b){
    return a - b;
}
function multiply(a,b) {
    return a * b;
}
function divide(a,b) {
    if (b == 0) return "Error. Can't divide to 0";
    return a / b;
}


let firstNumber = null;
let secondNumber = null;
let operator = null;
let operatorUsed = false;

function operate(operator, firstNumber, secondNumber){
    firstNumber = parseFloat(firstNumber);
    secondNumber = parseFloat(secondNumber);
    let result;
    switch(operator) {
        case "+":
            result =  add(firstNumber, secondNumber);
            break;
        case "-":
            result = subtract(firstNumber, secondNumber);
            break;
        case "x":
            result =  multiply(firstNumber, secondNumber);
            break;
        case "/":
            result = divide(firstNumber, secondNumber);
            break;
        // rounding the result to only 2 decimals 
    }
    if (Number.isInteger(result)) return result;
    return result.toFixed(2);
}
// display value
let displayValue = "0"; // its start value is 0, it will be an int
document.addEventListener("DOMContentLoaded", () => {
    // the display input
    const display = document.querySelector(".result-container");
    display.value = displayValue;
    // digit buttons
    const digitButtons = document.querySelectorAll(".digitButton");
    // event listener for adding the numbers pressed into the display
    digitButtons.forEach(function(button) {
        button.addEventListener("click", function()  {
            if(display.value === "0") {
                display.value = button.value;
                firstNumber = parseInt(display.value);
            }
            else if(firstNumber && operatorUsed === false) {
                display.value += button.value;
                firstNumber = parseInt(display.value);
            }
            else if(operatorUsed === true) {
                if (secondNumber === null) {
                    secondNumber = parseInt(button.value);   
                }
                else {
                    secondNumber = secondNumber * 10 + parseInt(button.value);
                }
                display.value += button.value;
            }
            console.log(`first number: "${firstNumber}"`);
            console.log(`second number: "${secondNumber}"`);
            });
        });
    // event listener for the operation buttons
    const operationButtons = document.querySelectorAll(".operator");
    operationButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            if(operatorUsed === false) {
                operatorUsed = true;
                display.value += button.value;
                operator = button.value;
            }
            else {
                let result = operate(operator, firstNumber, secondNumber);
                firstNumber = parseInt(result);
                display.value = `${result}${button.value}`;
                secondNumber = null;
                // we update the operator to the last one pressed
                operator = button.value;
            }
        });
    });

    const equalButton = document.querySelector(".EqualButton");
    equalButton.addEventListener("click", function() {
        if(firstNumber !== null && secondNumber !== null && operator) {
            let result = operate(operator, firstNumber, secondNumber);
            display.value = result;
            firstNumber = parseInt(result);
            secondNumber = null;
            operatorUsed = false;
            operator = null;
        }
    })

    // event listener for clear button (deleting all the numbers in the input)
    const ClearButton = document.querySelector(".ClearButton");
    ClearButton.addEventListener("click", function() {
        display.value = "0";
        firstNumber = null;
        secondNumber = null;
        operator = null;
        operatorUsed = false;
    });
})