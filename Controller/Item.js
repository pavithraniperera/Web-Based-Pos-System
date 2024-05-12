import AddedItemModal from "../model/AddedItemModal.js";
import {customerArray} from "../db/database.js";
import {proceedItems} from "../db/database.js";
import {orders} from "../db/database.js";
import OrderModal from "../model/OrderModal.js";
import {itemArray} from "../db/database.js";
import {AddedItemModule} from "./AddedItem.js";



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
        setTotalAmount(totalPrice);
        setCustomerId();
    });



     $("#pay").click(function (){
         var date = getCurrentTime();
         var orderId =generateOrderId();
         console.log(orderId);

        let order = new OrderModal(selectedCustomer,proceedItems,discountedTotal,date,orderId);
        orders.push(order);
        console.log(orders);
         updateStockItem();
        loadOrderTable();
         $("#checkoutModal").modal("hide");
         $("#text").text("Order Successful");
         $("#successModal").modal("show");

     });

    $("#okBtn").click(function (){
        $("#successModal").modal("hide");
    });

    function getCurrentTime() {
        return new Date(); // Get current date as a string
    }
    var orderNumber=1;
    function generateOrderId() {
        const orderId = 'O' + pad(orderNumber, 3); // Pad the order number with leading zeros like O001
        orderNumber++; // Increment the order number for the next order
        return orderId;
    }
    // Helper function to pad numbers with leading zeros to a specified length
    function pad(number, length) {
        return String(number).padStart(length, '0');
    }
     var discountedTotal;
     function setTotalAmount(total){
         console.log(total);
         var discount = total * 0.15;
          discountedTotal = total - (total * 0.15); // 15% discount
         $("#discount").text(discount.toFixed(2));
         $("#payment").text(discountedTotal.toFixed(2));

     }

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
    var selectedCustomerId ;
    var selectedCustomer;


    customerIdSelect.addEventListener("change", function() {
         selectedCustomerId = this.value; // Get customer iD
         selectedCustomer = customerArray.find(customer => customer.id === selectedCustomerId);

        if (selectedCustomer) {
            custNameInput.value = selectedCustomer.name;
        } else {
            custNameInput.value = ""; // Clear  input field if no customer is selected
        }

    });



     function loadOrderTable(){
        $("#orderTable").empty();
        orders.map((item,index)=>{

            var newRow = `
             <tr>
                <td class="id">${item.orderId}</td>
                <td class="custId">${item.customer.id}</td>
                <td class="custName">${item.customer.name}</td>
                <td class="total">${item.total}</td>
                <td class="date">${item.date}</td>
               
                <td>
                    <button class="btn btn-danger btn-sm"><i class="fa-solid fa-trash"></i></button>
                    <button class="btn btn-warning btn-sm"><i class="fa-solid fa-pen-to-square"></i></button>
                </td>
            </tr>
        `; $("#orderTable").append(newRow);
        });
    }


    function  updateStockItem(){
        proceedItems.forEach(proceedItem => {
            const stockItem = itemArray.find(item => item.id === proceedItem.id);
            if (stockItem) {
                stockItem.quantity -= proceedItem.quantity;
                console.log(stockItem.quantity)
            }
        });


        console.log(itemArray);
    }




});