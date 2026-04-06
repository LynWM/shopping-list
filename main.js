console.log("The JS is connected!");

let shoppingList = [];


console.log(shoppingList);

// HTML IDs => JS variables (DOM)
const itemInput = document.getElementById("input-item");
const priceInput = document.getElementById("input-price");
const addBtn = document.getElementById("add-btn");
const listContainer = document.getElementById("list-container");
const clrBtn = document.getElementById("clear-btn");

// event listener for the add button
addBtn.addEventListener("click", function() {

    //variables are the input values from the html
    const itemName = itemInput.value;
    const itemPrice = priceInput.value;

    //checking that fields have been filled
    if (itemName.trim() === "" || itemPrice.trim() === "") {
        alert("Please fill in the blank fields");
        return;
    }
    
    //creating a new object from the input values
    const newItem = {
        name: itemName,
        price: itemPrice,
        purchased: false,
    }

    // adding the new object to the array
    shoppingList.push(newItem);
    purchasesTotal();

    

    // adding the object to a new div in the list container
    // NOT SURE ABOUT US CREATING AND APPENDING TWO ELEMENTS IN ONE DIV
    const itemDiv = document.createElement("div");
    const itemText = document.createElement("span");

    itemText.textContent= itemName + " - " + itemPrice;
    listContainer.appendChild(itemText);
    listContainer.appendChild(itemDiv);   

    //clearing input fields
    itemInput.value="";
    priceInput.value="";

    // checkbox
    let newCheckbox = document.createElement("input");
    newCheckbox.type = "checkbox";
    newCheckbox.name = "name";
    newCheckbox.value = "value";
    newCheckbox.id = "item-" + shoppingList.length;

    let label = document.createElement('label');

    label.htmlFor = newCheckbox.id;

    label.appendChild(document.createTextNode("Mark Purchased"));

    itemDiv.appendChild(newCheckbox);
    itemDiv.appendChild(label);
    

    //when checked
    newCheckbox.addEventListener("change", function() {
        // changes purchased value from false to true when checked
        newItem.purchased = newCheckbox.checked;
        purchasesTotal();

        if (newCheckbox.checked) {
            itemText.style.textDecoration = "line-through";
        } else {
            itemText.style.textDecoration = "none"
        }
        console.log(newItem);
        
    });
});

//event listener for clear list button
clrBtn.addEventListener("click", function() {
    shoppingList = [];
    listContainer.innerHTML = "";
})

//function for calculating the total of checked items
const totalPurchaseCost = document.getElementById("total-cost");

function purchasesTotal() {
    let total = 0;

    shoppingList.forEach(newItem => {
        if (newItem.purchased) {
            total += Number(newItem.price);
        }
    });

    totalPurchaseCost.textContent = total;
}

purchasesTotal();

//Pendings
//list container having seperate cards for seperate items
//  local storage - storing and fetching without errors
// editing individual items

// Practise similar projects to grasp logic better