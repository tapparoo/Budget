// Form vars from DOM
const incName = document.querySelector('#incomeName');
const incVal = document.querySelector('#incomeValue');
const incFreq = document.querySelector('#incomeFrequency');
const firstPay = document.querySelector('#firstPayday');
const incDropdown = document.querySelector('#switchIncome');  
const submitButton = document.querySelector('#submitButton');
const deleteButton = document.querySelector('#deleteButton');

// Change hash and refresh form info
incDropdown.addEventListener('change', function(e){
    location.hash = e.target.value;
    displayCurrentInfo();
})

// Add / Save changes
submitButton.addEventListener('click', function(e){
    e.preventDefault();
    addOrEditIncome();
})

// Delete from incomes[] and return to index.html
deleteButton.addEventListener('click', function(e){
    if (confirm('Delete this income?')){
        incomes.splice(queryByID('income', location.hash.substring(1)), 1);
        saveIncome(incomes);
        window.location = 'index.html';
    }
})

const addOrEditIncome = function(){
    const index = queryByID('income', location.hash.substring(1));
    const re = /(0[1-9]|1[0-2])\/(0[1-9]|1[0-9]|2[0-9]|3[0-1])\/(1\d{3}|2\d{3})/g;
    
    // Do nothing if blank
    if (incName.value === "" || !incVal.value) { 
        return
    }
    // Check for number in value, if incorrect then do nothing
    if (isNaN(incVal.value)){
        incVal.value = '***Invalid Number***';
        return;
    }

    // Push new income to incomes[]
    if (!location.hash){   
        incomes.push(new Income(incName.value, incVal.value, incFreq.value, firstPay.value));
    }
    // Edit income in incomes[]
    else {
        incomes[index].name = incName.value;
        incomes[index].value = incVal.value;
        incomes[index].frequency = incFreq.value;
        incomes[index].firstPay = firstPay.value.match(re) ? firstPay.value : '01/01/2018';
        displayCurrentInfo();
    }
    // Update localStorage
    saveIncome(incomes);                
}

const displayCurrentInfo = function(){
    if(location.hash){
        const index = queryByID('income', location.hash.substring(1));

        // Populate form from existing incomes[] values
        incName.value = incomes[index].name;
        incVal.value = incomes[index].value;
        incFreq.value = incomes[index].frequency;
        firstPay.value = incomes[index].firstPay;
        refreshPaydays(listPaydates(incFreq.value, firstPay.value));
    }
    refreshDropdown();  
}

// Populate income selector (dropdown)
const refreshDropdown = function(){
    // Clear existing 'option' elements
    incDropdown.innerHTML = '';
    // Blank default selection
    incDropdown.appendChild(document.createElement('option'));

    // Create a new 'option' element for each income in incomes[] and append to the dropdown
    incomes.forEach(function(income) {
        let option = document.createElement('option');
        option.setAttribute('value', income.id);
        option.textContent = income.name;

        // Highlight current income selection (if any)
        if (location.hash.substring(1) === income.id){
            option.setAttribute('selected', 'selected')
        }
        incDropdown.appendChild(option);
    });
}

// Refresh list of paydays in DOM
const refreshPaydays = function(payDates){
    const div = document.querySelector('#displayPaydays');
    div.innerHTML = '';
    payDates.forEach(function(pay){
        div.innerHTML += `${pay}<br/>`
    });
}

// Display current user income if hash is present, otherwise the form will be blank
displayCurrentInfo();
addOrEditIncome();

