const renderIncomeTable = function(){
    const payTableBody = document.querySelector('#payTable tbody');
    
    incomes.forEach(pay => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><a href="https://tapparoo.github.io/Budget/Add-Edit Income.html#${pay.id}">${pay.name}</a></td>
            <td>${pay.value}</td>
            <td>${pay.frequency}</td>`;        
        payTableBody.appendChild(row);
    });
}

renderIncomeTable();
 
