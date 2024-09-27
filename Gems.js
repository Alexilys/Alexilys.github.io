

function fetchLabels() {
    fetch('Gem_stacks.csv')
        .then(response => response.text())
        .then(csvContent => generateFormFromCSV(csvContent));
}

function generateFormFromCSV(csvContent) {
    const lines = csvContent.split('\n'); // Split by new lines
    const formContainer = document.getElementById('form-container');

    formContainer.innerHTML = ''; // Clear any existing content

    // Loop through each line in the CSV
    lines.forEach((line, index) => {
        if (line.trim()) { // Ignore empty lines
            // Create label
            const labelGems = document.createElement('labelGems');
            labelGems.innerHTML = line.trim();
            labelGems.setAttribute('for', 'input' + index);

            // Create input field
            const input = document.createElement('input');
            input.type = 'number';
            input.id = 'input' + index;
            input.name = 'input' + index;
            input.placeholder = '0.00';
    

             // Create span to display the result
             const resultSpan = document.createElement('span');
             resultSpan.id = 'result' + index;
             resultSpan.classList.add('result'); // Add the class
             resultSpan.innerHTML = ' = 0'; // Initial result

            // Append to form container
            formContainer.appendChild(labelGems);
            formContainer.appendChild(document.createTextNode(" : ")); // Add colon
            formContainer.appendChild(input);
            formContainer.appendChild(resultSpan);
            formContainer.appendChild(document.createElement('br')); // Add a line break for spacing

        }
    });

     // Add the "Other" field at the end
     const otherLabel = document.createElement('labelOther');
     otherLabel.innerHTML = 'Other';
     const otherInput = document.createElement('input');
     otherInput.type = 'number';
     otherInput.id = 'inputOther';
     otherInput.name = 'inputOther';
     otherInput.placeholder = '0.00';
 
     const otherResultSpan = document.createElement('span');
     otherResultSpan.id = 'resultOther';
     otherResultSpan.classList.add('result');
     otherResultSpan.innerHTML = ' = 0';
 
     formContainer.appendChild(otherLabel);
     formContainer.appendChild(document.createTextNode(" : "));
     formContainer.appendChild(otherInput);
     formContainer.appendChild(otherResultSpan);
     formContainer.appendChild(document.createElement('br'));

     
}

function calculateResults() {
    const inputs = document.querySelectorAll('input[type="number"]');
    let totalSum = 0;

    // Loop through each input and calculate result
    inputs.forEach((input, index) => {
        const labelGems = input.previousSibling.previousSibling.textContent.trim(); // Get the label value
        const labelValue = (labelGems === 'Other') ? 1 : parseFloat(labelGems); // For "Other", use 1 as the multiplier
        const inputValue = parseFloat(input.value);

        // Calculate the result and update the span
        const result = (isNaN(inputValue) ? 0 : inputValue) * (isNaN(labelValue) ? 0 : labelValue);
        document.getElementById('result' + (index === inputs.length - 1 ? 'Other' : index)).innerHTML = ' = ' + result.toFixed(0);

        // Add to total sum
        totalSum += result;
    });

    document.getElementById('resultGems').innerHTML = 'Total gems: ' + totalSum.toLocaleString();

}

//When you click the button, do this:	
document.getElementById("CalcBtnGems").onclick = function(){
    calculateResults(); // Trigger the calculation when the button is clicked

}

// Run this function when the page loads to fetch and generate the form
window.onload = fetchLabels;




//  // Add event listener to update result when input changes
//  input.addEventListener('input', function() {
//     updateResult(labelValue, input.value, resultSpan);
// });