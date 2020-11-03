const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const allclearButton = document.querySelector('[data-all-clear]')
const deleteButton = document.querySelector('[data-delete]')
const previousOperand = document.querySelector('[data-previous-operand]')
const currentOperand = document.querySelector('[data-current-operand]')

// Iterates over the buttons and adds the events('clicking')
// adds the value of the button to the current display 
// checks if the current display has the .(dot-separator) and breaks the function if it has
for (const button of numberButtons) {
    button.addEventListener('click', (event) => {
        if (button.textContent == '.' && currentOperand.textContent.includes('.')) return;

        currentOperand.textContent += button.textContent;


    })
}

// Iterates over the operations and push the operation to the end of the string
// changes the previous display after clicking to the current display and erases values
// from the current display 
for (const operation of operationButtons) {
    operation.addEventListener('click', (event) => {

        if (previousOperand.textContent == '') {

            currentOperand.textContent += ' ' + operation.textContent;
            previousOperand.textContent = currentOperand.textContent;
            currentOperand.textContent = '';

        } else {
            
            computations();
        }

    })
}

// Gets the event on the all clear button removes all the values from the screen
allclearButton.addEventListener('click', AllClear)



// Deletes the values one by one. Checks the length of the current screen 
// if it's not empty slices (deletes) the last value from the string.
// If the previous screen is not empty slices the value from the previous screen
// and assigns this value to the current string.
deleteButton.addEventListener('click', (event) => {
    let lengthCurrent = currentOperand.textContent.length
    let sliced;

    if (currentOperand.textContent.length !== 0) {

        sliced = currentOperand.textContent.slice(0, lengthCurrent - 1);

        currentOperand.textContent = sliced;

    } else {
        currentOperand.textContent = previousOperand.textContent
        previousOperand.textContent = '';
    }
})

equalsButton.addEventListener('click', computations)

function computations() {
    let value;
    const prev = parseFloat(previousOperand.textContent);
    const curr = parseFloat(currentOperand.textContent);

    // ÷ index: 0
    // * index: 1
    // + index: 2
    // - index: 3

    if (previousOperand.textContent.includes(operationButtons[0].textContent)) {
        value = prev / curr;
    } else if (previousOperand.textContent.includes(operationButtons[1].textContent)) {
        value = prev * curr;
    } else if (previousOperand.textContent.includes(operationButtons[2].textContent)) {
        value = prev + curr;
    } else if (previousOperand.textContent.includes(operationButtons[3].textContent)) {
        value = prev - curr;
    }

    currentOperand.textContent = value;
    previousOperand.textContent = '';

}


function AllClear() {
    currentOperand.textContent = null;
    previousOperand.textContent = null;
}