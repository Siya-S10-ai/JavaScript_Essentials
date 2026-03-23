function performOperation() {
    let a = parseInt(document.getElementById("input1").value);
    let b = parseInt(document.getElementById("input2").value);
    // Check if inputs are valid numbers
    if(!isNaN(a) && !isNaN(b)) {
        // perform the operation
        let result = multiply(a,b);

        // Display the result
        displayResult(result);
    } else {
        displayResult("Please enter valid numbers");
    }
}

function multiply(a,b) {
    // Introduce a debugger statement to pause execution
    debugger;

    // Multiply the numbers
    return a * b;
}

function displayResult(result) {
    // Display the result in the paragraph element
    const resultElement = document.getElementById("result");
    resultElement.textContent = `The result is: ${result}`;
}