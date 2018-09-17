// Datepicker from jQueryUI
$( function() {
    $( "#firstPayday" ).datepicker({"dateFormat": "mm/dd/yy", "defaultDate":"1/1/2018"});
  } );

const switchIncomeDropdown = document.querySelector('#switchIncome');  
const submitButton = document.querySelector('#submitButton');
const deleteButton = document.querySelector('#deleteButton');

// Change hash and refresh form info
switchIncomeDropdown.addEventListener('change', function(e){
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
        incomes.splice(queryByID(location.hash.substring(1)), 1);
        saveIncome(incomes);
        window.location = 'index.html';
    }
})

const addOrEditIncome = function(){
    const incName = document.querySelector('#incomeName');
    const incVal = document.querySelector('#incomeValue');
    const incFreq = document.querySelector('#incomeFrequency');
    const firstPay = document.querySelector('#firstPayday');
    const index = queryByID(location.hash.substring(1));

    // Add income
    if (!location.hash){
        // If salary or name are blank, do nothing
        if (incName.value === "" || incVal.value === ""){ 
            return
        }

        // Default date value
        if (!firstPay.value){
            firstPay.value = '01/01/2018'
        }

        // Push new income to incomes[]
        incomes.push({
            name: incName.value,
            value: incVal.value,
            frequency: incFreq.value,
            id: uuidv4(), // Unique id
            firstPay: firstPay.value
        })
        location.assign('index.html')
    }
    // Edit income in incomes[]
    else {
        incomes[index].name = incName.value;
        incomes[index].value = incVal.value;
        incomes[index].frequency = incFreq.value;
        incomes[index].firstPay = firstPay.value;
        displayCurrentInfo();
    }
    // Update localStorage
    saveIncome(incomes);                
}

const displayCurrentInfo = function(){
    if(location.hash){
        const incName = document.querySelector('#incomeName');
        const incVal = document.querySelector('#incomeValue');
        const incFreq = document.querySelector('#incomeFrequency');
        const firstPay = document.querySelector('#firstPayday');
        const index = queryByID(location.hash.substring(1));

        // Populate form from existing incomes[] values
        incName.value = incomes[index].name;
        incVal.value = incomes[index].value;
        incFreq.value = incomes[index].frequency;
        firstPay.value = incomes[index].firstPay;
        refreshDropdown();
        refreshPaydays(listPaydates(incFreq.value, firstPay.value));
    }else {return}    
}

// Populate income selector (dropdown) and apply listener to refresh form values
const refreshDropdown = function(){
    // Clear existing 'option' elements
    switchIncomeDropdown.innerHTML = '';
    // Blank default selection
    switchIncomeDropdown.appendChild(document.createElement('option'));

    // Create a new 'option' element for each income in incomes[] and append to the dropdown
    incomes.forEach(function(income) {
        let option = document.createElement('option');
        option.setAttribute('value', income.id);
        option.textContent = income.name;

        // Highlight current income selection (if any)
        if (location.hash.substring(1) === income.id){
            option.setAttribute('selected', 'selected')
        }
        switchIncomeDropdown.appendChild(option);
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

// Populate income dropdown
refreshDropdown();

// Display current user income if hash is present, otherwise the form will be blank
displayCurrentInfo();
addOrEditIncome();

