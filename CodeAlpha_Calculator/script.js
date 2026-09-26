const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';

function updateDisplay() {
  display.value = currentInput;
}

function handleNumber(value) {
  currentInput += value;
  updateDisplay();
}

function handleOperator(value) {
  if (currentInput === '') return;
  const lastChar = currentInput[currentInput.length - 1];
  if (['+', '-', '*', '/'].includes(lastChar)) {
    currentInput = currentInput.slice(0, -1);
  }
  currentInput += value;
  updateDisplay();
}

function handleClear() {
  currentInput = '';
  updateDisplay();
}

function handleDelete() {
  currentInput = currentInput.slice(0, -1);
  updateDisplay();
}

function handleEquals() {
  try {
    let result = eval(currentInput);
    if (result === undefined || isNaN(result)) {
      result = 'Error';
    }
    currentInput = result.toString();
    updateDisplay();
  } catch (error) {
    currentInput = 'Error';
    updateDisplay();
  }
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.getAttribute('data-value');
    const action = button.getAttribute('data-action');

    if (value !== null) {
      if (['+', '-', '*', '/'].includes(value)) {
        handleOperator(value);
      } else {
        handleNumber(value);
      }
    } else if (action === 'clear') {
      handleClear();
    } else if (action === 'delete') {
      handleDelete();
    } else if (action === 'equals') {
      handleEquals();
    }
  });
});

document.addEventListener('keydown', (e) => {
  if (e.key >= '0' && e.key <= '9') {
    handleNumber(e.key);
  } else if (['+', '-', '*', '/'].includes(e.key)) {
    handleOperator(e.key);
  } else if (e.key === '.') {
    handleNumber('.');
  } else if (e.key === 'Enter' || e.key === '=') {
    handleEquals();
  } else if (e.key === 'Backspace') {
    handleDelete();
  } else if (e.key === 'Escape') {
    handleClear();
  }
});