
const incomes = [{
    name: 'adam',
    amount: 2500,
    paydays: {
        '1': [1, 15], 
        '2': [1, 15],
        '3': [1, 15],
        '4': [1, 15],
        '5': [1, 15],
        '6': [1, 15],
        '7': [1, 15],
        '8': [1, 15],
        '9': [1, 15],
        '10': [1, 15],
        '11': [1, 15],
        '12': [1, 15]
    }
},{
    name: 'bobbie',
    amount: 1900,
    paydays: {
        1: [12, 26],
        2: [9, 23], 
        3: [9, 23], 
        4: [6, 20], 
        5: [4, 18],
        6: [1, 15, 29], 
        7: [13, 27],
        8: [10, 24], 
        9: [7, 21], 
        10: [5, 19],
        11: [2, 16, 30], 
        12: [14, 28]
    }
}];
const bills = [{
    name: 'cable',
    amount: 125,
    due: 1
},{
    name: 'phone',
    amount: 150,
    due: 15
},{
    name: 'internet',
    amount: 75,
    due: 22
},{
    name: 'credit card', 
    amount: 350,
    due: 14
},{
    name: 'car',
    amount: 300,
    due: 22 
},{
    name: 'mortgage',
    amount: 1900,
    due: 1
},{
    name: 'insurance',
    amount: 300,
    due: 5
}]
const allPaydays = {
    '1': [],
    '2': [],
    '3': [],
    '4': [],
    '5': [],
    '6': [],
    '7': [],
    '8': [],
    '9': [],
    '10': [],
    '11': [],
    '12': []
};

let moneySetAside = 950;

const loadPaydays = function (){
    // List of keys/months in allPaydays[]
    const keys = Object.keys(allPaydays);

    // Iterate through incomes
    for (let income of incomes){
        // Iterate through paydays of each income & push to allPaydays[]
        for (let key of keys){
            income.paydays[key].forEach(element => {
                allPaydays[key].push(
                    {
                        day: `${element}`,
                        remaining: `${income.amount}`
                    }
                )
            })
        }
    }
    // Sort paydays inside each month of allPaydays[], because...?
    for (let month in allPaydays){
        allPaydays[month].sort((a, b) => a.day - b.day)
    }
}

const distributeBills = function(){
    
}

loadPaydays();
console.log(allPaydays)