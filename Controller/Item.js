import AddedItemModal from "../model/AddedItemModal.js";
import {customerArray} from "../db/database.js";
import {proceedItems} from "../db/database.js";
import {orders} from "../db/database.js";
import OrderModal from "../model/OrderModal.js";
import {itemArray} from "../db/database.js";
import {loadTable} from "./AddedItem.js"



 $(document).ready(function (){
    $(document).on("click", ".item-button", function () {
        console.log("clicked");
        var itemName = $(this).closest(".card-body").find(".card-title").text();
        var itemImageSrc = $(this).closest(".item-card").find(".card-img-top").attr("src");
        var itemWeight = $(this).closest(".item-card").find(".form-select").val();
        var itemPriceText = $(this).closest(".item-card").find(".card-text").text();
        var itemPrice = parseFloat(itemPriceText.replace("Price: Rs.", ""));
        var item = itemArray.find(item=>item.name===itemName);
        var maxQuantity = item.quantity;

        //check if the item is already in the shopping cart
        let itemExist =false;
        $(".cart-item").each(function (){
            var existingItemName =$(this).find(".item-name").text();
            console.log(existingItemName);

            if (existingItemName===itemName){
                itemExist = true;
                return false;
            }
        });
        console.log(itemExist)
        if (itemExist){

            showAlert(`This Item is already in your cart .  Increased quantity of ${itemName}.`);
        }else {
            //check item availability
            if (maxQuantity<=0){
                 showAlert("Item out of stock.");
                return;
            }


            var newItem = `
    <div class="cart-item">
        <img src="${itemImageSrc}" alt="Item Image" class="item-image">
        <span class="item-name">${itemName}</span>
        <input type="number" class="form-control quantity-input" value="1" min="1" max="${maxQuantity}">
        <button id="cartDelete" class="delete-item-button"><i class="fas fa-trash"></i></button>
        <span class="item-price">Rs. ${itemPrice.toFixed(2)}</span>
    </div>
`;
            $(".shopping-cart").append(newItem);
            updateTotalPrice();
        }


    });

     function showAlert(message) {
         $("#alertMessage").text(message);
         var alertElement = $("#notificationAlert");

         alertElement.show();

         // Auto-hide after 5 seconds (5000 milliseconds)
         setTimeout(function() {
             alertElement.addClass('hide').removeClass('show');
             setTimeout(function() {
                 alertElement.hide();
             }, 300);
         }, 5000);
     }
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

        var quantity = $(this).val();
        var maxQuantity = $(this).attr(`max`);
        if (parseInt(quantity) === parseInt(maxQuantity)) {
            $(this).val(maxQuantity);
            showAlert("Cannot exceed available stock quantity in this item.");
        }
        updateTotalPrice();
    });

    $(".checkout-btn").on("click", function() {



    });

    $("#proceed").click(function() {

        //check there are at least one item in the cart
        if ($(".cart-item").length === 0) {
            alert("Your shopping cart is empty. Please add items to the cart before proceeding to checkout.");
            $("#checkoutModal").modal("hide");
            return;
        }
        alert("Proceeding to checkout. Total amount: " + $(".total-price").text());
        // Get all cart items
        var cartItems = $(".cart-item");
        var totalPrice = 0;
        $("#checkoutModal").modal("show")


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
         // Create a  copy of proceedItems
         let itemsCopy = proceedItems.map(item => {
             return {
                 name: item.name,
                 price: item.price,
                 quantity: item.quantity,
             };
         });

        let order = new OrderModal(selectedCustomer,itemsCopy,discountedTotal,date,orderId);
        orders.push(order);
        console.log(orders);
         updateStockItem();
         loadTable();
        loadOrderTable();
         // Clear proceedItems for the next order
         proceedItems.length = 0;
         // Clear cart UI
         clearCart();
         $("#checkoutModal").modal("hide");
         $("#text").text("Order Successful");
         $("#successModal").modal("show");

     });

    $("#okBtn").click(function (){
        $("#successModal").modal("hide");
    });

     function clearCart() {
         $(".cart-item").remove();
         // Or clear specific elements that represent the cart items
     }

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

      //delete function
     $(document).on('click', '.delete-item-button', function () {
         // Get the parent cart-item div
         let cartItemDiv = $(this).closest('.cart-item');

         // Remove the item
         cartItemDiv.remove();
         showAlert("Item is Removed" );

         updateTotalPrice();
     });








 });