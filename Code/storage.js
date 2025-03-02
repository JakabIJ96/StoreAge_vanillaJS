class Item{
    constructor(id, name, amount){
        this.id = id;
        this.name = name;
        this.amount = amount;
    }
};

var storageItems = [
    new Item(0, "Red polo", 12),
    new Item(1, "Blue polo", 28),
    new Item(2, "Green polo", 6),
    new Item(3, "Yellow polo", 17)
];

const TableRowIdString = "storageTable";
const AmountColumnName = "Amount";

loadConstants();
loadUpTableWithElements();



function loadConstants()
{
    document.getElementById("itemTableHeaderAmountCell").innerText = AmountColumnName;
}


function loadUpTableWithElements()
{
    let tableElement = document.getElementById("itemTable");
    let count = 0;

    for(let item of storageItems){
        let newTableRow = document.createElement("tr");

        let newTableRowId = `${TableRowIdString + count}`;
        newTableRow.id = newTableRowId;
        newTableRow.innerHTML = `
            <td>${item.name}</td>
            <td>${item.amount}</td>
            <td><button onclick="deleteStorageItem('${newTableRowId}')">Delete</button></td>
            <td><button onclick="editRow('${newTableRowId}')">Edit</button></td>
        `;

        tableElement.appendChild(newTableRow);
        count += 1;
    }
}


function itemAddForm() {
    console.log("Item add form clicked");

    let newForm = document.createElement("form");
    newForm.innerHTML = `
        <label for="newNameInput">Item Name</label>
        <input type="text" id="newNameInput">

        <label for="newAmountInput">Item's amount in stock</label>
        <input type="text" id="newAmountInput">

        <button type="submit">Add items</button>
    `;

    newForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Do not reload the page

        let nameValue = document.getElementById("newNameInput").value;
        let amountValue = document.getElementById("newAmountInput").value;

        if (!nameValue.trim() || !amountValue.trim()) {
            alert("Please fill both fields!");
            return;
        }

        if(!Number(amountValue)){
            alert(`Please use number in ${AmountColumnName} field!`);
            return;
        }

        let tableElement = document.getElementById("itemTable");
        let tableRowId = Number(tableElement.lastChild.id.at(-1)) + 1;

        let newTableRow = document.createElement("tr");

        newTableRow.innerHTML = `
            <td>${nameValue}</td>
            <td>${amountValue}</td>
            <td><button onclick="deleteStorageItem('${TableRowIdString + tableRowId}')">Delete</button></td>
            <td><button onclick="editRow('${TableRowIdString + tableRowId}')">Edit</button></td>
        `;

        newTableRow.id = `${TableRowIdString + tableRowId}`;

        tableElement.appendChild(newTableRow);
        document.getElementById("body").removeChild(newForm);
    });

    document.getElementById("body").appendChild(newForm);
}


function deleteStorageItem(elementId){
    let tableElement = document.getElementById("itemTable");

    tableElement.removeChild(document.getElementById(elementId));
}


function editRow(tableRowId) {
    let tableRow = document.getElementById(tableRowId);
    let tableHeaderNames = document.getElementById("itemTableHeaderRow");

    let count = 0;
    for(let headerName of tableHeaderNames.cells){
        let currentTableCell = tableRow.cells[count];
        let newValue = prompt(`Enter new ${headerName.innerText} for the item:`, currentTableCell.innerText);

        if(headerName.innerText === AmountColumnName){
            if(!Number(newValue)){
                alert(`Please use number in ${AmountColumnName} field!`);
                return;
            }
        }

        if (newValue !== null) {
            currentTableCell.innerText = newValue;
        }

        count += 1;
    }
}
