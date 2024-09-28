function fetchVITData() {
    fetch('VIT.csv')
        .then(response => response.text())
        .then(csvContent => generateFormFromCSV(csvContent));
}

function generateFormFromCSV(csvContent) {
    const lines = csvContent.split('\n'); // Split by new lines
    const formContainer = document.getElementById('form-container');

    formContainer.innerHTML = ''; // Clear any existing content

    lines.forEach((line, index) => {
        const columns = line.split(','); // Split columns in each row (Column A = Label, Column B = Multiplier)
        if (columns.length === 2 && columns[0].trim() && columns[1].trim()) {
            const labelText = columns[0].trim(); // Label text from column A
            const multiplier = parseFloat(columns[1].trim()); // Multiplier from column B

            // Create label
            const label = document.createElement('label');
            label.innerHTML = labelText;
            label.setAttribute('for', 'input' + index);
            label.style.width = '150px';

            // Create input field and store multiplier as a data attribute
            const input = document.createElement('input');
            input.type = 'number';
            input.id = 'input' + index;
            input.name = 'input' + index;
            input.placeholder = '0.00';
            input.size = 6;
            input.setAttribute('data-multiplier', multiplier); // Store multiplier in data attribute

            // Create span to display the result
            const resultSpan = document.createElement('span');
            resultSpan.id = 'result' + index;
            resultSpan.innerHTML = ' = 0'; // Initial result

            // Append to form container
            formContainer.appendChild(label);
            formContainer.appendChild(document.createTextNode(" : "));
            formContainer.appendChild(input);
            formContainer.appendChild(resultSpan);
            formContainer.appendChild(document.createElement('br')); // Add a line break for spacing
        }
    });
}

function calculateVITResults() {
    const inputs = document.querySelectorAll('input[type="number"]');
    let totalSum = 0;

    // Loop through each input and calculate result
    inputs.forEach((input, index) => {
        const multiplier = parseFloat(input.getAttribute('data-multiplier')); // Retrieve multiplier from data attribute
        const inputValue = parseFloat(input.value);

        // Calculate the result and update the span
        const result = (isNaN(inputValue) ? 0 : inputValue) * (isNaN(multiplier) ? 0 : multiplier);
        document.getElementById('result' + index).innerHTML = ' = ' + result.toLocaleString('en-US', { minimumFractionDigits: 0 });

        // Add to total sum
        totalSum += result;
    });

    document.getElementById('resultTotal').innerHTML = 'Total VIT: ' + totalSum.toLocaleString('en-US', { minimumFractionDigits: 0 });
}

// When you click the button, do this:
document.getElementById("CalcBtnVIT").onclick = function () {
    calculateVITResults(); // Trigger the calculation when the button is clicked
};

// Run this function when the page loads to fetch and generate the form
window.onload = fetchVITData;
