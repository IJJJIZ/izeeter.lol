// Function to calculate remaining amount after credit card and checking inputs
function calculateRemaining() {
    const paycheck = parseFloat(document.getElementById('paycheck').value) || 0;
    const creditCard = parseFloat(document.getElementById('creditCard').value) || 0;
    const checking = parseFloat(document.getElementById('checking').value) || 0;
    const requiredChecking = parseFloat(document.getElementById('requiredChecking').value) || 0;

    const remaining = paycheck - creditCard;
    const remainingAfterChecking = remaining - (requiredChecking - checking);

    document.getElementById('remaining').innerText = remainingAfterChecking.toFixed(2);
}

// Function to dynamically add new savings fields with a name input
function addSavingsField(name = "", percentage = 0) {
    const savingsContainer = document.getElementById('savingsContainer');
    const fieldCount = savingsContainer.childElementCount;
    const newField = document.createElement('div');
    newField.innerHTML = `
        <label for="savingsName${fieldCount}">Savings ${fieldCount + 1} Name: </label>
        <input type="text" id="savingsName${fieldCount}" name="savingsName" value="${name}" placeholder="Enter name">
        <label for="savings${fieldCount}">Savings ${fieldCount + 1} Percentage: </label>
        <input type="number" id="savings${fieldCount}" name="savings" value="${percentage}" min="0" max="100">%
    `;
    savingsContainer.appendChild(newField);
}

// Function to remove the last savings field
function removeSavingsField() {
    const savingsContainer = document.getElementById('savingsContainer');
    if (savingsContainer.childElementCount > 0) {
        savingsContainer.removeChild(savingsContainer.lastElementChild);
    }
}

// Function to calculate how much each savings field should get
function calculateSavings() {
    const remainingAmount = parseFloat(document.getElementById('remaining').innerText) || 0;
    const savingsFields = document.querySelectorAll('[name="savings"]');
    const savingsNames = document.querySelectorAll('[name="savingsName"]');
    const calculatedSavingsContainer = document.getElementById('calculatedSavingsContainer');

    calculatedSavingsContainer.innerHTML = ''; // Clear previous results

    let totalPercentage = 0;

    savingsFields.forEach((field, index) => {
        const name = savingsNames[index].value || `Savings ${index + 1}`;
        const percentage = parseFloat(field.value) || 0;

        totalPercentage += percentage;

        const amount = (remainingAmount * (percentage / 100)).toFixed(2);
        const result = document.createElement('p');
        result.textContent = `${name}: $${amount}`;
        calculatedSavingsContainer.appendChild(result);
    });

    // Warn if the percentages don't add up to 100%
    if (totalPercentage > 100) {
        const warning = document.createElement('p');
        warning.style.color = 'red';
        warning.textContent = 'Warning: Percentages exceed 100%.';
        calculatedSavingsContainer.appendChild(warning);
    } else if (totalPercentage < 100) {
        const warning = document.createElement('p');
        warning.style.color = 'red';
        warning.textContent = 'Note: Percentages total less than 100%.';
        calculatedSavingsContainer.appendChild(warning);
    }
}

// Function to download the data as a .txt file
function downloadData() {
    const paycheck = document.getElementById('paycheck').value || 0;
    const creditCard = document.getElementById('creditCard').value || 0;
    const checking = document.getElementById('checking').value || 0;
    const requiredChecking = document.getElementById('requiredChecking').value || 0;
    const remaining = document.getElementById('remaining').innerText || 0;

    let data = `Paycheck: $${paycheck}\nCredit Card Owed: $${creditCard}\nChecking Balance: $${checking}\nRequired Checking Balance: $${requiredChecking}\nRemaining after payments: $${remaining}\n\nSavings Fields:\n`;

    const savingsFields = document.querySelectorAll('[name="savings"]');
    const savingsNames = document.querySelectorAll('[name="savingsName"]');

    savingsFields.forEach((field, index) => {
        const name = savingsNames[index].value || `Savings ${index + 1}`;
        const percentage = parseFloat(field.value) || 0;
        const amount = (remaining * (percentage / 100)).toFixed(2);

        data += `${name}: ${percentage}% -> $${amount}\n`;
    });

    const blob = new Blob([data], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'financial_data.txt';
    link.click();
}

// Function to load data from a .txt file
function loadData(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const lines = e.target.result.split('\n');
        let mode = '';  // Track whether we're in the basic info or savings fields

        lines.forEach((line) => {
            line = line.trim();
            if (line.startsWith('Paycheck')) {
                document.getElementById('paycheck').value = line.split('$')[1];
            } else if (line.startsWith('Credit Card Owed')) {
                document.getElementById('creditCard').value = line.split('$')[1];
            } else if (line.startsWith('Checking Balance')) {
                document.getElementById('checking').value = line.split('$')[1];
            } else if (line.startsWith('Required Checking Balance')) {
                document.getElementById('requiredChecking').value = line.split('$')[1];
            } else if (line.startsWith('Remaining after payments')) {
                document.getElementById('remaining').innerText = line.split('$')[1];
            } else if (line.startsWith('Savings Fields')) {
                mode = 'savings'; // Switch to savings fields mode
            } else if (mode === 'savings' && line) {
                const [nameAndPercentage, amount] = line.split('->');
                const [name, percentage] = nameAndPercentage.split(':');
                addSavingsField(name.trim(), parseFloat(percentage.trim().replace('%', '')));
            }
        });

        calculateRemaining();
    };

    reader.readAsText(file);
}

// Add event listeners for the input fields to trigger the calculation function
document.getElementById('paycheck').addEventListener('input', calculateRemaining);
document.getElementById('creditCard').addEventListener('input', calculateRemaining);
document.getElementById('checking').addEventListener('input', calculateRemaining);
document.getElementById('requiredChecking').addEventListener('input', calculateRemaining);
