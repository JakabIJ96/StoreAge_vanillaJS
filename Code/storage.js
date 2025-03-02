class Item{
    constructor(name, amount, price){
        this.name = name;
        this.amount = amount;
        this.price = price;
    }
};

var storageItems = [
    new Item("Red polo", 12, 12000),
    new Item("Blue polo", 28, 28000),
    new Item("Green polo", 6, 6000),
    new Item("Yellow polo", 17, 17000)
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
            <td>${item.price}</td>
            <td><button onclick="deleteStorageItem('${newTableRowId}')">Delete</button></td>
            <td><button onclick="editRow('${newTableRowId}')">Edit</button></td>
        `;

        tableElement.appendChild(newTableRow);
        count += 1;
    }
}


function addNewStoreItemToTable(event) {
    event.preventDefault(); // Do not reload the page

    let nameValue = document.getElementById("newNameInput").value;
    let amountValue = document.getElementById("newAmountInput").value;
    let priceValue = document.getElementById("newPriceInput").value;


    if (!nameValue.trim() || !amountValue.trim() || !priceValue.trim()) {
        alert("Please fill both fields!");
        return;
    }

    if(!Number(amountValue) || !Number(priceValue)){
        alert(`Please use number in ${AmountColumnName} and Price fields!`);
        return;
    }

    //DB operation in the future
    storageItems.push(new Item(nameValue, amountValue, priceValue));
    //---

    let tableElement = document.getElementById("itemTable");
    let tableRowId = Number(tableElement.lastChild.id.at(-1)) + 1;

    let newTableRow = document.createElement("tr");

    newTableRow.innerHTML = `
        <td>${nameValue}</td>
        <td>${amountValue}</td>
        <td>${priceValue}</td>
        <td><button onclick="deleteStorageItem('${TableRowIdString + tableRowId}')">Delete</button></td>
        <td><button onclick="editRow('${TableRowIdString + tableRowId}')">Edit</button></td>
    `;

    newTableRow.id = `${TableRowIdString + tableRowId}`;

    tableElement.appendChild(newTableRow);

    let newValuesForm = document.getElementById("newStorageItemForm");

    newValuesForm.setAttribute("style", "visibility: hidden;")
    document.getElementById("newStorageItemButton").setAttribute("style", "visibility: visible;")
}

function itemAddForm() {
    console.log("Item add form clicked");

    document.getElementById("newStorageItemButton").setAttribute("style", "visibility: hidden;")

    let newForm = document.getElementById("newStorageItemForm");
    newForm.setAttribute("style", "visibility: visible;")

    newForm.addEventListener("submit", addNewStoreItemToTable);
}


function deleteStorageItem(elementId){
    let tableElement = document.getElementById("itemTable");

    tableElement.removeChild(document.getElementById(elementId));
}


function editRow(tableRowId) {
    let tableRow = document.getElementById(tableRowId);
    let tableHeaderNames = document.getElementById("itemTableHeaderRow");

    //DB operation in the future
    let currentId = Number(tableRowId.at(-1));
    //---

    let count = 0;
    for(let headerName of tableHeaderNames.cells){
        let currentTableCell = tableRow.cells[count];
        let newValue = prompt(`Enter new ${headerName.innerText} for the item:`, currentTableCell.innerText);

        if(headerName.innerText === AmountColumnName){
            if(!Number(newValue)){
                alert(`Please use number in ${AmountColumnName} field!`);
                return;
            }

            //DB operation in the future
            storageItems[currentId].amount = newValue;
            //---
        }

        if(headerName.innerText === "Price"){
            if(!Number(newValue)){
                alert(`Please use number in Price field!`);
                return;
            }

            //DB operation in the future
            storageItems[currentId].price = newValue;
            //---
        }

        if (newValue !== null) {
            currentTableCell.innerText = newValue;


            //DB operation in the future
            if(headerName.innerText === "Item name"){
                storageItems[currentId].name = newValue;
            }
            //---
        }

        count += 1;
    }
}

