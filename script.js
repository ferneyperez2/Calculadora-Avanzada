let currentInput = document.getElementById('currentInput');
let previousInput = document.getElementById('previousInput');
let historyList = document.getElementById('historyList');

let firstOperand = null;
let operator = null;
let shouldResetDisplay = false;
let history = [];

function appendNumber(number) {
    if (shouldResetDisplay) {
        currentInput.value = number;
        shouldResetDisplay = false;
    } else if (currentInput.value === '0') {
        currentInput.value = number;
    } else {
        currentInput.value += number;
    }
}

function appendDecimal() {
    if (!currentInput.value.includes('.')) {
        currentInput.value += '.';
    }
}

function clearDisplay() {
    currentInput.value = '0';
    previousInput.textContent = '';
    firstOperand = null;
    operator = null;
    shouldResetDisplay = false;
}

function changeSign() {
    currentInput.value = parseFloat(currentInput.value) * -1;
}

function calculatePercentage() {
    currentInput.value = parseFloat(currentInput.value) / 100;
}

function operate(op) {
    if (operator && firstOperand !== null) {
        calculate();
    }
    firstOperand = parseFloat(currentInput.value);
    operator = op;
    previousInput.textContent = `${firstOperand} ${operator}`;
    shouldResetDisplay = true;
}

function calculate() {
    if (operator && firstOperand !== null) {
        const secondOperand = parseFloat(currentInput.value);
        let result;
        switch (operator) {
            case '+':
                result = firstOperand + secondOperand;
                break;
            case '-':
                result = firstOperand - secondOperand;
                break;
            case '*':
                result = firstOperand * secondOperand;
                break;
            case '/':
                if (secondOperand === 0) {
                    result = 'Error: División por cero';
                } else {
                    result = firstOperand / secondOperand;
                }
                break;
            case 'y^x':
                result = Math.pow(firstOperand, secondOperand);
                break;
            default:
                return;
        }
        currentInput.value = result;
        addToHistory(`${firstOperand} ${operator} ${secondOperand} = ${result}`);
        firstOperand = result;
        operator = null;
        shouldResetDisplay = true;
        previousInput.textContent = '';
    }
}

function calculateFunction(func) {
 const currentValue = parseFloat(currentInput.value);
 let result;
 let errorMessage = null;

 switch (func) {
     case 'sin':
         result = Math.sin(Math.PI * currentValue / 180);
         break;
     case 'cos':
         result = Math.cos(Math.PI * currentValue / 180);
         break;
     case 'tan':
         result = Math.tan(Math.PI * currentValue / 180);
         break;
     case 'log':
         if (currentValue <= 0) {
             errorMessage = 'Error: Logaritmo de número no positivo';
         } else {
             result = Math.log10(currentValue);
         }
         break;
     case 'ln':
         if (currentValue <= 0) {
             errorMessage = 'Error: Logaritmo natural de número no positivo';
         } else {
             result = Math.log(currentValue);
         }
         break;
     case 'exp':
         result = Math.exp(currentValue);
         break;
     default:
         return;
 }

 if (errorMessage) {
     currentInput.value = errorMessage;
     // Opcional: Limpiar el estado de la calculadora
     firstOperand = null;
     operator = null;
     shouldResetDisplay = true;
     previousInput.textContent = '';
 } else {
     currentInput.value = result;
     addToHistory(`${func}(${currentValue}) = ${result}`);
     shouldResetDisplay = true;
     previousInput.textContent = '';
     firstOperand = result;
     operator = null;
 }
}

function calculateSquareRoot() {
 const currentValue = parseFloat(currentInput.value);
 if (currentValue < 0) {
     currentInput.value = 'Error: Raíz cuadrada de número negativo';
     firstOperand = null;
     operator = null;
     shouldResetDisplay = true;
     previousInput.textContent = '';
 } else {
     const result = Math.sqrt(currentValue);
     currentInput.value = result;
     addToHistory(`√(${currentValue}) = ${result}`);
     shouldResetDisplay = true;
     previousInput.textContent = '';
     firstOperand = result;
     operator = null;
 }
}

function calculatePower() {
    if (firstOperand !== null) {
        calculate(); // Si ya hay una operación pendiente, la completa primero
    }
    firstOperand = parseFloat(currentInput.value);
    operator = 'y^x';
    previousInput.textContent = `${firstOperand} ^`;
    shouldResetDisplay = true;
}

function calculateSquareRoot() {
    const currentValue = parseFloat(currentInput.value);
    const result = Math.sqrt(currentValue);
    currentInput.value = result;
    addToHistory(`√(${currentValue}) = ${result}`);
    shouldResetDisplay = true;
    previousInput.textContent = '';
    firstOperand = result; // Para permitir encadenar operaciones
    operator = null;
}

function addToHistory(calculation) {
    history.push(calculation);
    const listItem = document.createElement('li');
    listItem.textContent = calculation;
    historyList.appendChild(listItem);
    // Opcional: Limitar el tamaño del historial
    // if (history.length > 10) {
    //     history.shift();
    //     historyList.removeChild(historyList.firstChild);
    // }
}