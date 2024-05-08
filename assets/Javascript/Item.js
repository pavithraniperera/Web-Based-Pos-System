import AddedItemModal from "../../model/AddedItemModal.js";
import {customerArray} from "../../db/database.js";

$(document).ready(function (){
    $(document).on("click", ".item-button", function () {
        console.log("clicked");
        var itemName = $(this).closest(".card-body").find(".card-title").text();
        var itemImageSrc = $(this).closest(".item-card").find(".card-img-top").attr("src");
        var itemWeight = $(this).closest(".item-card").find(".form-select").val();
        var itemPriceText = $(this).closest(".item-card").find(".card-text").text();
        var itemPrice = parseFloat(itemPriceText.replace("Price: Rs.", ""));

        var newItem = `
        <div class="cart-item">
            <img src="${itemImageSrc}" alt="Item Image" class="item-image">
            <span class="item-name">${itemName}</span>
            <input type="number" class="form-control quantity-input" value="1" min="1">
            <span class="item-price">Rs. ${itemPrice.toFixed(2)}</span>
        </div>
    `;
        $(".shopping-cart").append(newItem);

        updateTotalPrice();
    });

    function updateTotalPrice(){
        var totalPrice =0;
        $(".cart-item").each(function() {
            var itemPriceText = $(this).find(".item-price").text();
            var itemPrice = parseFloat(itemPriceText.replace("Rs.", ""));
            var quantity = $(this).find(".quantity-input").val();
            totalPrice += itemPrice * quantity;
        });

        $(".total-price").text("Total: Rs." + totalPrice.toFixed(2));
    }
    $(document).on("change", ".quantity-input", function() {
        updateTotalPrice();
    });

    $(".checkout-btn").on("click", function() {
        alert("Proceeding to checkout. Total amount: " + $(".total-price").text());
    });

    $("#proceed").click(function() {
        // Get all cart items
        var cartItems = $(".cart-item");


        var totalPrice = 0;
        var proceedItems =[];

        // Loop through each cart item to calculate total price and display item details
        cartItems.each(function(index, item) {
            var itemName = $(item).find(".item-name").text();
            var itemQuantity = parseInt($(item).find(".quantity-input").val());
            var itemPriceText = $(item).find(".item-price").text();
            var itemPrice = parseFloat(itemPriceText.replace("Rs. ", ""));

            //  item subtotal
            var itemSubtotal = itemPrice * itemQuantity;
            let items = new AddedItemModal(itemName,itemPrice,itemQuantity);
            proceedItems.push(items);

            //  total price
            totalPrice += itemSubtotal;

        });

        console.log("Total Price:", totalPrice);
        console.log(proceedItems);
        $("#payTotal").text(totalPrice);
        setCustomerId();
    });

     $("#pay").click(function (){


     });

     function setCustomerId(){
         // Find the select element by its ID
         const customerIdSelect = document.getElementById("customerId");

// Clear any existing options
         customerIdSelect.innerHTML = "";

// Create a default option
         const defaultOption = document.createElement("option");
         defaultOption.value = "";
         defaultOption.textContent = "Select Customer ID";
         defaultOption.disabled = true;
         defaultOption.selected = true;

// Append the default option to the select element
         customerIdSelect.appendChild(defaultOption);

// Loop through the customerArray and create an option for each customer
         customerArray.forEach(customer => {
             const option = document.createElement("option");

             option.textContent = customer.id;

             customerIdSelect.appendChild(option);
         });

     }

    const customerIdSelect = document.getElementById("customerId");
    const custNameInput = document.getElementById("custName");

    customerIdSelect.addEventListener("change", function() {
        const selectedCustomerId = this.value; // Get customer iD
        const selectedCustomer = customerArray.find(customer => customer.id === selectedCustomerId);

        if (selectedCustomer) {
            custNameInput.value = selectedCustomer.name;
        } else {
            custNameInput.value = ""; // Clear  input field if no customer is selected
        }

    });

});