
import AddedItemModal from "../model/AddedItemModal.js";
import {itemArray} from "../db/database.js";

export function loadTable(){
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


$(document).ready(function (){


    $("#addNewItem").click(function (){
        var itemName = $("#itemName").val().trim();
        var itemPrice = $("#itemPrice").val().trim();
        var itemQuantity = $("#itemQuantity").val().trim();
        var Category = document.getElementById("itemCategory");
        var itemCategory = Category.options[Category.selectedIndex].text;
        var itemDesc = $("#itemDescription").val().trim();

        //validate item name
        if (!itemName) {
            $("#errorText").text("Item name is required.")
            $("#errorModal").modal("show");
            return;
        }

        //validate item category
        if (itemCategory == "Select category...") {
            $("#errorText").text("Please select a valid category.")
            $("#errorModal").modal("show");
            return;
        }

        // Validate itemPrice as a valid number
        if (!itemPrice) {
            $("#errorText").text("Item price is required.")
            $("#errorModal").modal("show");
            return;
        } else if (isNaN(itemPrice) || parseFloat(itemPrice) <= 0) {
            $("#errorText").text("Please enter a valid item price.")
            $("#errorModal").modal("show");
            return;
        }

        // Validate itemQuantity as a valid number
        if (!itemQuantity) {

            $("#errorText").text("Item quantity is required.")
            $("#errorModal").modal("show");
            return;
        } else if (isNaN(itemQuantity) || parseInt(itemQuantity) <= 0) {
            $("#errorText").text("Please enter a valid item quantity.");
            $("#errorModal").modal("show");
            return;
        }





        let item = new AddedItemModal(itemName,itemPrice,itemQuantity,itemCategory,itemDesc);
        itemArray.push(item);
        loadTable();
        addItemCard(item)
        $("#text").text("Successfully added new customer")
        $("#successModal").modal("show");
        resetForm();


    });






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
        $("#itemDescription").val(desc);
        $("#itemCategory").empty();

        // Add new options
        let categories = ["Category 1", "Category 2", "Category 3"]; // Example categories
        categories.forEach((cat) => {
            let option = $("<option></option>").attr("value", cat).text(cat);
            if (cat === category) {
                option.attr("selected", true); // Select the matching category
            }
            $("#itemCategory").append(option);
        });
        editItem = new AddedItemModal(name,price,qty,category,desc);
    });
    $("#editItem").click(function (){
        $("#itemNameModal").val(editItem.name);
        $("#itemPriceModal").val(editItem.price);
        $("#itemQuantityMoadal").val(editItem.quantity);
        $("#itemCategoryModal").val(editItem.category);
        console.log(editItem.category);

    });


    $("#saveItemChanges").click(function (){
        var nameModalValue = $("#itemNameModal").val();
        var priceModalValue = $("#itemPriceModal").val();
        var qtyModalValue = $("#itemQuantityMoadal").val();
        var Value =document.getElementById("itemCategoryModal");
        var categoryModalValue =  Value.options[Value.selectedIndex].text;


        let itemObj = itemArray[recordIndex];
        itemObj.name =nameModalValue;
        itemObj.price =priceModalValue;
        itemObj.quantity = qtyModalValue;
        itemObj.category = categoryModalValue;

        $("#itemEditModal").modal("hide");
        loadTable();
        resetForm()
        $("#successModal").modal("show");

    });
    $("#okBtn").click(function (){
        $("#successModal").modal("hide");
    });

    $("#errorOkBtn").click(function (){
        $("#errorModal").modal("hide");
    });


    function resetForm() {
        $(".info-section input, .info-section textarea").val(""); // Set value to empty string for input and textarea elements
        $(".info-section select").prop("selectedIndex", 0);
    }

    $("#clearCustomer").click(function (){
        resetForm();
    });

    $("#confirmItemDelete").click(function (){
        itemArray.splice(recordIndex,1);
        loadTable();
        $("#itemDeleteModal").modal("hide");
        resetForm()
        $("#text").text("Successfully Deleted a customer")
        $("#successModal").modal("show");
    });

  function  addItemCard(item){
      var name = item.name;
      var imageUrl = "assets/images/brocoli.png";
      var price = item.price
      let newItemCard = `
        <div class="card item-card">
            <div class="image-custom">
                <img src="${imageUrl}" class="card-img-top" alt="${name}">
            </div>
            <div class="card-body item-desc-custom">
                <h5 class="card-title">${name}</h5>
                <select class="form-select mb-2" aria-label="Select weight">
                    <option value="1kg">1 kg</option>
                    <option value="500g">500 g</option>
                    <option value="250g">250 g</option>
                </select>
                <p class="card-text">Price: Rs.${price}</p>
                <a class="btn btn-primary item-button" href="#" role="button">
                    Add Item
                </a>
            </div>
        </div>
    `;

      // Append the new item card to the items container
      $(".items-container").append(newItemCard);
      $("#itemNoData").hide()
      $("#itemContainer").show();

  }

    // Check if there are no item cards and hide the container
    if ($(".items-container").children().length === 0) {

        $("#itemContainer").hide();

    }




});
