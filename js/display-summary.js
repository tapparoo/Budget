const renderTables = function(){
    incomes.forEach(pay => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><a href="/Add-Edit Income.html#${pay.id}">${pay.name}</a></td>
            <td>${pay.value}</td>
            <td>${pay.frequency}</td>`;
            document.querySelector('#payTable tbody').appendChild(row);
    });
    bills.forEach(bill => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><a href="/Bills.html#${bill.id}">${bill.name}</a></td>
            <td>${bill.amount}</td>
            <td>${bill.frequency}</td>`;
            document.querySelector('#billTable tbody').appendChild(row);
    });
}

renderTables();
 