class Calculator {
    constructor(calculatorScreen) {
        this.calculatorScreen = calculatorScreen;
        this.reset();
    }

    reset() {
        this.currentValue = '0';
        this.previousValue = '';
        this.operator = null;
        this.updateScreen();
    }

    appendNumber(number) {
        if (this.currentValue === '0') {
            this.currentValue = number;
        } else {
            this.currentValue += number;
        }
        this.updateScreen();
    }

    chooseOperator(operator) {
        if (this.currentValue === '') return;
        if (this.previousValue !== '') {
            this.calculate();
        }
        this.operator = operator;
        this.previousValue = this.currentValue;
        this.currentValue = '';
    }

    appendDecimal() {
        if (this.currentValue.includes('.')) return;
        this.currentValue += '.';
        this.updateScreen();
    }

    calculate() {
        let result;
        const prev = parseFloat(this.previousValue);
        const current = parseFloat(this.currentValue);
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = prev / current;
                break;
            default:
                return;
        }
        this.currentValue = result.toString();
        this.operator = null;
        this.previousValue = '';
        this.updateScreen();
    }

    updateScreen() {
        this.calculatorScreen.value = this.currentValue;
    }
}

const calculator = new Calculator(document.querySelector('.calculator-screen'));

document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.value;
        if (button.classList.contains('operator')) {
            calculator.chooseOperator(value);
        } else if (button.classList.contains('decimal')) {
            calculator.appendDecimal();
        } else if (button.classList.contains('all-clear')) {
            calculator.reset();
        } else if (button.classList.contains('equal-sign')) {
            calculator.calculate();
        } else {
            calculator.appendNumber(value);
        }
    });
});