document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.button');
    
    let currentInput = '';
    let previousInput = '';
    let operator = '';
    let result = null;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const type = button.dataset.type;
            const value = button.dataset.value;
            
            if (type === 'number' || type === 'operator' || type === 'equal' || type === 'clear') {
                handleInput(type, value);
            }
        });
    });

    function handleInput(type, value) {
        switch (type) {
            case 'number':
                if (currentInput === '0' && value !== '.') {
                    currentInput = value;
                } else {
                    currentInput += value;
                }
                display.textContent = currentInput;
                break;
            case 'operator':
                if (operator && previousInput && currentInput) {
                    result = calculate(previousInput, currentInput, operator);
                    display.textContent = result;
                    previousInput = result;
                } else {
                    previousInput = currentInput;
                }
                currentInput = '';
                operator = value;
                break;
            case 'equal':
                if (operator && previousInput && currentInput) {
                    result = calculate(previousInput, currentInput, operator);
                    display.textContent = result;
                    currentInput = result;
                    operator = '';
                    previousInput = '';
                }
                break;
            case 'clear':
                currentInput = '';
                previousInput = '';
                operator = '';
                result = null;
                display.textContent = '0';
                break;
        }
    }

    function calculate(num1, num2, operator) {
        const a = parseFloat(num1);
        const b = parseFloat(num2);
        switch (operator) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case '*':
                return a * b;
            case '/':
                return a / b;
            default:
                return 0;
        }
    }
});
