// Populate incomes[] and bills[] from localStorage
// ***need to add option to import from file
const getIncomes = function(){
    const incomes = localStorage.getItem('incomes');
    try{
        return incomes ? JSON.parse(incomes) : []
    }catch(e){
        console.log(e);
        return [];
    }
}

const getBills = function(){
    const bills = localStorage.getItem('bills');
    try{
        return bills ? JSON.parse(bills) : []
    }catch(e){
        console.log(e);
        return [];
    }
}

let incomes = getIncomes(); 
let bills = getBills();

// Save to localStorage 
// ***need to add option to export/save to file
const saveIncome = function(incomes){
    localStorage.setItem('incomes', JSON.stringify(incomes));
}

const saveBills = function(bills){
    localStorage.setItem('bills', JSON.stringify(bills));
}

// Return index of unique ID in incomes[]
const queryByID = function(recordType, desiredID){
    if (recordType === 'income'){
        return incomes.findIndex(payday => payday.id === desiredID)
    }else{
        return bills.findIndex(bill => bill.id === desiredID)
    }
}

// Return array of all paydays for selected income
const listPaydates = function(freq, firstPayday){

    // Check if date matches 01/01/2018 format, if not: create default date
    const re = /(0[1-9]|1[0-2])\/(0[1-9]|1[0-9]|2[0-9]|3[0-1])\/(1\d{3}|2\d{3})/g;
    const firstPayDay = firstPayday.match(re);
    const d = !firstPayDay ? new Date('01/01/2018') : new Date(firstPayday);

    // 'YEAR' is only used during comparisons in the while loops after incrementing the date. 
    //  Checks if we've entered a new year and if so, exit the loop
    const YEAR = d.getFullYear(); 
    let payDates = [];

    if (freq === 'Bi-Monthly'){
        while (d.getFullYear() === YEAR){
            // Push current date to array
            payDates.push(d.toDateString())

            if (d.getDate() === 1){
                // Set date to 15th for next iteration
                d.setDate(15);
            }else{
                // Increment month and reset date to 1st for next iteration
                d.setMonth(d.getMonth() + 1); 
                d.setDate(1);
            }
        }
    }

    if (freq === 'Every Other Week'){
        while (d.getFullYear() === YEAR){
            // Push current date to array
            payDates.push(d.toDateString()) 

            // Add 14 days for next iteration
            d.setDate(d.getDate() + 14); 
        }
    }
    return payDates;
}

const Income = function(name, value, frequency, firstPay){
    this.name = name;
    this.value = value;
    this.frequency = frequency;
    this.id = uuidv4();
    this.firstPay = firstPay;
}
Income.prototype.setName = function(name){
    this.name = name;
}
Income.prototype.setValue = function(value){
    this.value = value;
}
Income.prototype.setFrequency = function(frequency){
    this.frequency = frequency;
}
Income.prototype.setFirstPay = function(firstPay){
    this.firstPay = firstPay;
}

const Bill = function(name, amt, frequency, firstDue){
    this.name = name;
    this.amount = amt;
    this.frequency = frequency;
    this.id = uuidv4();
    this.firstDue = firstDue;
}
Bill.prototype.setName = function(name){
    this.name = name;
}
Bill.prototype.setAmount = function(amount){
    this.amount = amount;
}
Bill.prototype.setFrequency = function(frequency){
    this.frequency = frequency;
}
Bill.prototype.setFirstDue = function(firstDue){
    this.firstDue = firstDue;
}

// Datepicker from jQueryUI
$( function() {
    $( "#firstPayday" ).datepicker({"dateFormat": "mm/dd/yy", "defaultDate":"1/1/2018"});
  } );

$( function() {
    $( "#firstDueDate" ).datepicker({"dateFormat": "mm/dd/yy", "defaultDate":"1/1/2018"});
  } );  
