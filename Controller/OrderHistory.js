import {customerArray, orders, proceedItems} from "../db/database.js";
/*import { loadOrderTable } from './Item.js'*/
var recordIndex;


$("#orderTable").on("click","tr",function (){
    let index = $(this).index();
    recordIndex = index;
    let orderId =$(this).find(".id").text();
    let custId =$(this).find(".custId").text();
    let total = $(this).find(".total").text();
    let date =$(this).find(".date").text();
    let name =$(this).find(".custName").text();
    $("#customerName").val(name);
    $("#orderId").val(orderId);
    $("#orderDate").val(date);
    $("#orderTotal").text(total);
    let proceedItemsArray = getProceedItemsArray(orderId);
    console.log(proceedItemsArray);
    loadTable(proceedItemsArray);


});

function getProceedItemsArray(orderId) {


    // Find the order with the matching order ID
    let order = orders.find(order => order.orderId === orderId);

    // If the order is found, return its proceedItems array; otherwise, return an empty array
    return order ? order.items : [];
}

function loadTable(proceedItemsArray){
    $("#orderItemList").empty();
    proceedItemsArray.map((item,index)=>{
        var total = item.quantity*item.price;
        var newRow = `
             <tr>
                <td class="id">${item.name}</td>
                <td class="custId">${item.quantity}</td>
                <td class="castName">${item.price}</td>
                <td class="total">${total}</td>
                 
            </tr>
        `; $("#orderItemList").append(newRow);
    });

}
$("#clearFields").click(function (){
    clearFields();
});



function clearFields() {
    // Clear input fields
    $("#customerName").val("");
    $("#orderId").val("");
    $("#orderDate").val("");

    // Clear orderItemListTable
    $("#orderItemList").empty();
}
$("#deleteBtn").click(function (){
    orders.splice(recordIndex,1);
    /*loadOrderTable();*/
    $("#deleteModal").modal("hide");
    clearFields();
    $("#text").text("Successfully Deleted a Order");
    $("#successModal").modal("show");
})

function displayFilteredOrders(filteredOrders) {
    $("#filteredOrdersTable").empty();
    filteredOrders.forEach(order => {
        var newRow = `
            <tr>
                <td class="orderId">${order.orderId}</td>
                <td class="custId">${order.customer.id}</td>
                <td class="CustName">${order.customer.name}</td>
                <td class="total">${order.total}</td>
                <td class="date">${order.date.toLocaleString()}</td>
            </tr>
        `;
        $("#filteredOrdersTable").append(newRow);
    });

    $("#filteredOrdersModal").modal("show");

}
var orderTableIndex;
$("#filteredOrdersTable").on("click","tr",function (){
    let index = $(this).index();
    orderTableIndex = index;
    let orderId = $(this).find(".orderId").text();
    let custId = $(this).find(".custId").text();
    let total = $(this).find(".total").text();
    let date = $(this).find(".date").text();
    let name = $(this).find(".custName").text();
    $("#customerName").val(name);
    $("#orderId").val(orderId);
    $("#orderDate").val(date);
    $("#orderTotal").text(total);
    let proceedItemsArray = getProceedItemsArray(orderId);
    loadTable(proceedItemsArray);
    
})


function searchOrders(customerId) {

    let filteredOrders = orders.filter(order => order.customer.id === customerId);
    if (filteredOrders.length === 0) {
        $("#errorText").text("No orders found for the given customer ID.")
        $("#errorModal").modal("show");
        return
    }
    displayFilteredOrders(filteredOrders);

}

$("#searchButton").click( function (e) {
    var customerId = $("#searchCustomerId").val().trim();

    if (!customerId) {
        $("#errorText").text("Please enter a customer ID to search.");
        $("#errorModal").modal("show");
        return;
    }
    searchOrders(customerId);

});

