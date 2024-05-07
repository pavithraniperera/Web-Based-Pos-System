
import AddedItemModal from "../../model/AddedItemModal.js";

$(document).ready(function (){
     var itemArray = [];

    $("#addNewItem").click(function (){
        var itemName = $("#itemName").val().trim();
        var itemPrice = $("#itemPrice").val().trim();
        var itemQuantity = $("#itemQuantity").val().trim();
        var Category = document.getElementById("itemCategory");
        var itemCategory = Category.options[Category.selectedIndex].text;
        var itemDesc = $("#itemDescription").val().trim();

        // Validate form data
        if (!itemName || !itemPrice || !itemQuantity || itemCategory == "Select category...") {
            alert("Please fill in all fields.");
            return;
        }

        let item = new AddedItemModal(itemName,itemPrice,itemQuantity,itemCategory,itemDesc);
        itemArray.push(item);
        loadTable();
        $("#text").text("Successfully added new customer")
        $("#successModal").modal("show");
        resetForm();


    });

    function loadTable(){
        $("#itemTable").empty();
        itemArray.map((item,index)=>{

            var newRow = `
             <tr>
                <td class="name">${item.name}</td>
                <td class="cost">${item.price}</td>
                <td class="quantity">${item.quantity}</td>
                <td class="category">${item.category}</td>
                <td class="description">${item.description}</td>
                <td>
                    <button class="btn btn-danger btn-sm"><i class="fa-solid fa-trash"></i></button>
                    <button class="btn btn-warning btn-sm"><i class="fa-solid fa-pen-to-square"></i></button>
                </td>
            </tr>
        `; $(".table-custom tbody").append(newRow);
        });
    }

    var recordIndex;
    var editItem;

    $("#itemTable").on("click","tr",function (){
        let index = $(this).index();
        recordIndex = index;
        let name =$(this).find(".name").text();
        let price =$(this).find(".cost").text();
        let qty = $(this).find(".quantity").text();
        let category =$(this).find(".category").text();
        let desc = $(this).find(".description").text()

        $("#itemName").val(name);
        $("#itemPrice").val(price);
        $("#itemQuantity").val(qty);
        $("#itemCategory").val(category);
        $("#itemDescription").val(desc);
        editItem = new AddedItemModal(name,price,qty,category,desc);
    });





});