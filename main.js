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

        itemDiv.appendChild(itemText);
        itemDiv.appendChild(checkbox);
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
        price: Number(itemPrice), // ✅ fix string issue
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