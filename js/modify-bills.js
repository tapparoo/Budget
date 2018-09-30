// Form vars from DOM
const billName = document.querySelector('#billName');
const billAmt = document.querySelector('#billAmount');
const billFreq = document.querySelector('#billFrequency');
const firstDueDate = document.querySelector('#firstDueDate');
const billDropdown = document.querySelector('#switchBill');  
const submitButton = document.querySelector('#submitButton');
const deleteButton = document.querySelector('#deleteButton');

// Change hash and refresh form info
billDropdown.addEventListener('change', function(e){
    location.hash = e.target.value;
    displayCurrentInfo();
})

// Add / Save changes
submitButton.addEventListener('click', function(e){
    e.preventDefault();
    addOrEditBill();
})

// Delete from bills[] and return to index.html
deleteButton.addEventListener('click', function(e){
    if (confirm('Delete this bill?')){
        bills.splice(queryByID('bill', location.hash.substring(1)), 1);
        saveBills(bills);
    }
})

const addOrEditBill = function(){
    const index = queryByID('bill', location.hash.substring(1));
    const re = /(0[1-9]|1[0-2])\/(0[1-9]|1[0-9]|2[0-9]|3[0-1])\/(1\d{3}|2\d{3})/g;
    
    // Do nothing if blank
    if (billName.value === "" || !billAmt.value) { 
        return
    }
    // Check for number in value, if incorrect then do nothing
    if (isNaN(billAmt.value)){
        billAmt.value = '***Invalid Number***';
        return;
    }

    // Push new bill to bills[]
    if (!location.hash){   
        bills.push(new Bill(billName.value, billAmt.value, billFreq.value, firstDueDate.value));
    }
    // Edit bill in bills[]
    else {
        bills[index].name = billName.value;
        bills[index].amount = billAmt.value;
        bills[index].frequency = billFreq.value;
        bills[index].firstDue = firstDueDate.value.match(re) ? firstDueDate.value : '01/01/2018';
        displayCurrentInfo();
    }
    // Update localStorage
    saveBills(bills);    
    refreshBillSummary();
}

const displayCurrentInfo = function(){
    if(location.hash){
        const index = queryByID('bill', location.hash.substring(1));

        // Populate form from existing bills[] values
        billName.value = bills[index].name;
        billAmt.value = bills[index].amount;
        billFreq.value = bills[index].frequency;
        firstDueDate.value = bills[index].firstDue;
    }
    refreshDropdown();
    refreshBillSummary();
}

// Populate bill selector (dropdown)
const refreshDropdown = function(){
    // Clear existing 'option' elements
    billDropdown.innerHTML = '';
    // Blank default selection
    billDropdown.appendChild(document.createElement('option'));

    // Create a new 'option' element for each bill in bills[] and append to the dropdown
    bills.forEach(function(bill) {
        let option = document.createElement('option');
        option.setAttribute('value', bill.id);
        option.textContent = bill.name;

        // Highlight current bill selection (if any)
        if (location.hash.substring(1) === bill.id){
            option.setAttribute('selected', 'selected')
        }
        billDropdown.appendChild(option);
    });
}

// Refresh list of bills in DOM
const refreshBillSummary = function(){
    const div = document.querySelector('#billsDiv');
    div.innerHTML = '';
    bills.forEach(function(bill){
        div.innerHTML += `Bill: ${bill.name} / Amount: ${bill.amount} / Frequency: ${bill.frequency} / First Due Date: ${bill.firstDue}<br/>`
    });
}

// Display current bill income if hash is present, otherwise the form will be blank
displayCurrentInfo();
addOrEditBill();