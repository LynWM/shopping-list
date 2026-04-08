console.log("The JS is connected!");

// Load from localStorage OR start empty
let shoppingList = JSON.parse(localStorage.getItem("myList")) || [];

// DOM elements
const itemInput = document.getElementById("input-item");
const priceInput = document.getElementById("input-price");
const addBtn = document.getElementById("add-btn");
const listContainer = document.getElementById("list-container");
const clrBtn = document.getElementById("clear-btn");
const totalPurchaseCost = document.getElementById("total-cost");

// Save function
function saveToStorage() {
    localStorage.setItem("myList", JSON.stringify(shoppingList));
}

// Render function (displays everything)
function renderItems() {
    listContainer.innerHTML = "";

    shoppingList.forEach((item, index) => {
        const itemDiv = document.createElement("div");
        const itemText = document.createElement("span");

        itemText.textContent = `${item.name} - ${item.price}`;

        // strike-through if purchased
        if (item.purchased) {
            itemText.style.textDecoration = "line-through";
        }

        // checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = item.purchased;

        checkbox.addEventListener("change", function () {
            shoppingList[index].purchased = checkbox.checked;

            saveToStorage();
            renderItems();
        });

        // EDIT BUTTON
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";

        editBtn.addEventListener("click", function () {
            const newName = prompt("Edit item name:", item.name);
            const newPrice = prompt("Edit item price:", item.price);

            if (newName !== null && newName.trim() !== "" &&
                newPrice !== null && newPrice.trim() !== "") {

                shoppingList[index].name = newName;
                shoppingList[index].price = Number(newPrice);

                saveToStorage();
                renderItems();
            }
        });

        //DELETE BUTTON
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";

        deleteBtn.addEventListener("click", function () {
            shoppingList.splice(index, 1); // remove item
            saveToStorage();
            renderItems();
        });

        itemDiv.appendChild(itemText);
        itemDiv.appendChild(checkbox);
        itemDiv.appendChild(editBtn);
        itemDiv.appendChild(deleteBtn);
        listContainer.appendChild(itemDiv);
    });

    purchasesTotal();
}

// Add item
addBtn.addEventListener("click", function () {
    const itemName = itemInput.value;
    const itemPrice = priceInput.value;

    if (itemName.trim() === "" || itemPrice.trim() === "") {
        alert("Please fill in the blank fields");
        return;
    }

    const newItem = {
        name: itemName,
        price: Number(itemPrice),
        purchased: false,
    };

    shoppingList.push(newItem);

    saveToStorage();
    renderItems();

    // clear inputs
    itemInput.value = "";
    priceInput.value = "";
});

// Clear list
clrBtn.addEventListener("click", function () {
    shoppingList = [];
    saveToStorage();
    renderItems();
});

// Total calculation
function purchasesTotal() {
    let total = 0;

    shoppingList.forEach(item => {
        if (item.purchased) {
            total += item.price;
        }
    });

    totalPurchaseCost.textContent = total;
}

// Initial render on page load
renderItems();