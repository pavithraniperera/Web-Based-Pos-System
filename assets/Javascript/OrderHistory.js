import {customerArray, orders, proceedItems} from "../../db/database.js";

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