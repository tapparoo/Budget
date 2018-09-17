// Populate incomes[] from localStorage
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

let incomes = getIncomes(); 

// Save to localStorage 
// ***need to add option to export/save to file
const saveIncome = function(incomes){
    localStorage.setItem('incomes', JSON.stringify(incomes));
}

// Return index of unique ID in incomes[]
const queryByID = function(desiredID){
    return incomes.findIndex(payday => payday.id === desiredID)
}

// Return array of all paydays for selected income
const listPaydates = function(freq, firstPayday){

    // Check if date matches 01/01/2018 format, if not: create default date
    const re = /(0[1-9]|1[0-2])\/(0[1-9]|1[1-9]|2[1-9]|3[0-1])\/(1\d{3}|2\d{3})/g;
    const firstPayDay = firstPayday.match(re);
    const d = !firstPayDay ? new Date('01/01/2018')  : new Date(firstPayday);

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
