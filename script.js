// Select the display element
const display = document.getElementById('display');

// Variables to store current input and the expression
let currentInput = '';
let shouldResetScreen = false;

// Update display function
function updateDisplay() {
    display.textContent = currentInput || '0';
}

// Append number or decimal to input
function appendNumber(number) {
    if (shouldResetScreen) resetScreen();
    if (number === '.' && currentInput.includes('.')) return;
    currentInput += number;
    updateDisplay();
}

// Handle operator input
function appendOperator(operator) {
    if (shouldResetScreen) shouldResetScreen = false;
    currentInput += operator;
    updateDisplay();
}

// Clear function
function clear() {
    currentInput = '';
    updateDisplay();
}

// Reset screen after pressing "="
function resetScreen() {
    currentInput = '';
    shouldResetScreen = false;
}

// Perform calculation and update display
function calculate() {
    try {
        currentInput = eval(currentInput).toString();  // Use eval to compute expression
    } catch {
        currentInput = 'Error';
    }
    updateDisplay();
    shouldResetScreen = true;
}

// Event listeners for calculator buttons
document.querySelectorAll('.number').forEach(button => {
    button.addEventListener('click', () => appendNumber(button.dataset.number));
});

document.querySelectorAll('.operator').forEach(button => {
    button.addEventListener('click', () => appendOperator(button.dataset.operator));
});

document.getElementById('equal').addEventListener('click', calculate);
document.getElementById('clear').addEventListener('click', clear);

// ** Keyboard Input Handling ** 
window.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') {
        appendNumber(e.key);  // Handle number input
    } else if (['+', '-', '*', '/'].includes(e.key)) {
        appendOperator(e.key);  // Handle operators
    } else if (e.key === 'Enter') {
        calculate();  // Handle enter for equal
    } else if (e.key === 'Backspace') {
        currentInput = currentInput.slice(0, -1);  // Handle backspace
        updateDisplay();
    } else if (e.key === 'Escape') {
        clear();  // Handle clear on Escape key
    }
});// Dark mode feature
const darkModeToggle = document.getElementById("darkModeToggle");
darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  darkModeToggle.textContent = document.body.classList.contains("dark-mode") ? "☀️ Light Mode" : "🌙 Dark Mode";
});

// Initialize display to 0
updateDisplay();
