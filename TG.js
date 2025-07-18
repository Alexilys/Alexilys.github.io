function fetchLabels() {
    fetch('Multipliers.csv')
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
            const labelTG = document.createElement('labelTG');
            labelTG.innerHTML = line.trim();
            labelTG.setAttribute('for', 'input1' + index);

            // Create input field
            const input = document.createElement('input1');
            input.type = 'number';
            input.id = 'input1' + index;
            input.name = 'input1' + index;
            input.placeholder = '0.00';
    

             // Create span to display the result
             const resultSpan = document.createElement('span');
             resultSpan.id = 'result' + index;
             resultSpan.classList.add('result'); // Add the class
             resultSpan.innerHTML = ' = 0'; // Initial result

            // Append to form container
            formContainer.appendChild(labelTG);
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