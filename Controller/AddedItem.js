
import AddedItemModal from "../model/AddedItemModal.js";
import {customerArray, itemArray} from "../db/database.js";

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



        let item = new AddedItemModal(itemName,itemPrice,itemQuantity,itemCategory,itemDesc,selectedImage);
        itemArray.push(item);
        loadTable();
       /* addItemCard(item)*/
        loadItemsByCategory()
        $("#text").text("Successfully added new customer")
        $("#successModal").modal("show");
        resetForm();


    });


    let selectedImage = null;


    function showImagePreview(imageSrc) {
        const imagePreview = document.getElementById('imagePreview');
        imagePreview.innerHTML = `
        <img src="${imageSrc}" alt="Selected Image" class="preview-img" style="max-width: 100%; max-height: 100%;">
    `;
    }


    function handleImageUpload(event, previewElementId) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                 selectedImage = e.target.result;
                document.getElementById(previewElementId).innerHTML = `
                <img src="${selectedImage}" alt="Selected Image" class="preview-img" style="max-width: 100%; max-height: 100%;">
            `;
            };
            reader.readAsDataURL(file);
        }
    }

    // Attach event listeners to both file inputs
    document.getElementById('imageUpload').addEventListener('change', function(event) {
        handleImageUpload(event, 'imagePreview');
    });
    document.getElementById('imageUploadModal').addEventListener('change', function(event) {
        console.log('Modal image upload changed');
        handleImageUpload(event, 'imagePreviewModal');
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
        let item = getItemByName(name);

        $("#itemName").val(name);
        $("#itemPrice").val(price);
        $("#itemQuantity").val(qty);
        $("#itemDescription").val(desc);
        $("#itemCategory").empty();
        showImagePreview(item.imgSrc)

        // Add new options
        let categories = ["Vegetables", "Meet and Fish", "Fruits"]; // Example categories
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
        let item = getItemByName(editItem.name);
        $("#itemNameModal").val(editItem.name);
        $("#itemPriceModal").val(editItem.price);
        $("#itemQuantityMoadal").val(editItem.quantity);
        $("#itemCategoryModal").val(editItem.category);
        // Set image preview
        if (item.imgSrc) {
            $('#imagePreviewModal').html(`
                <img src="${item.imgSrc}" alt="${item.name}" class="preview-img" style="max-width: 100%; max-height: 100%;">
            `);
            selectedImage = item.imgSrc;
        } else {
            $('#imagePreviewModal').html(`
                <span class="upload-icon">+</span>
                <p class="upload-text">Click or drag & drop an image</p>
            `);
            selectedImage = null;
        }

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
        itemObj.imgSrc = selectedImage;

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
        selectedImage=null;
        document.getElementById('imagePreview').innerHTML = `
        <span class="upload-icon">+</span>
        <p class="upload-text">Click or drag & drop an image</p>
    `
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
      var imageUrl;
      if (item.imgSrc===null){
           imageUrl = "assets/images/no_image.png"
      }else {
           imageUrl = item.imgSrc;
      }
      var name = item.name;

      var price = item.price
      let newItemCard = `
        <div class="card item-card">
            <div class="image-custom">
                <img src="${imageUrl}" class="card-img-top" alt="${name}" width="10vw" height="14vh">
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
             <i id="edit_icon" class="fa fa-edit edit-icon" aria-hidden="true" ></i>
        </div>
    `;

      // Append the new item card to the items container
      $(".items-container").append(newItemCard);
      $("#itemNoData").hide();
      $("#itemContainer").show();

  }

    function getItemByName(itemName) {
        return itemArray.find(item => item.name.toLowerCase() === itemName.toLowerCase());
    }

    // Event listener for category selection
    $("#categorySelect").change(function() {
        var selectedCategory = $(this).val();
        console.log(selectedCategory)

        loadItemsByCategory(selectedCategory);
    });

    // Function to display items based on category
    function loadItemsByCategory(category) {

        var filteredItems = (category === 'All Items' || !category) ? itemArray : itemArray.filter(item => item.category === category);
            var $itemContainer = $("#itemContainer .items-container");

            // Clear the previous items
            $itemContainer.empty();
             console.log(filteredItems);
            if (filteredItems.length === 0) {
                $("#itemNoData").show();
            } else {
                $("#itemNoData").hide();

                // Append the filtered items
                filteredItems.forEach(item => addItemCard(item));
            }

    }

    // Check if there are no item cards and hide the container
    if ($(".items-container").children().length === 0) {

        $("#itemContainer").hide();

    }

    //Item Search

    $("#searchItem").click(function(e) {
        performSearch();
    });

    // Trigger search on Enter key press
    $("#itemInput").keypress(function(e) {
        if (e.which === 13) { // Enter key is pressed
            e.preventDefault(); // Prevent form refresh
            performSearch();
        }
    });

    function performSearch() {
        var itemName = $("#itemInput").val().trim();

        if (!itemName) {
            $("#errorText").text("Please enter a customer ID to search.");
            $("#errorModal").modal("show");
            return;
        }
        searchItem(itemName);
    }


    function searchItem(itemName) {
        let filterItem = itemArray.filter(item => item.name === itemName);
        if (filterItem.length === 0) {
            $("#errorText").text("No Item Data found for the given Item name.")
            $("#errorModal").modal("show");
            return
        }


        displayFilteredItem(filterItem);

    }


    function displayFilteredItem(filterItem) {
        filterItem.forEach(item=>{
            $("#itemName").val(item.name);
            $("#itemPrice").val(item.price);
            $("#itemQuantity").val(item.quantity);
            $("#itemDescription").val(item.description);
            $("#itemCategory").empty();

            // Add new options
            let categories = ["Vegetables", "Meet and Fish", "Fruits"]; // Example categories
            categories.forEach((cat) => {
                let option = $("<option></option>").attr("value", cat).text(cat);
                if (cat === item.category) {
                    option.attr("selected", true); // Select the matching category
                }
                $("#itemCategory").append(option);
            });
        });



    }

    // Arrow key navigation for input fields
    $(".info-section input, .info-section textarea,.info-section select").keydown(function(e) {
        var inputs = $(".info-section input, .info-section textarea, .info-section select");
        var currentIndex = inputs.index(this);

        if (e.keyCode == 37 || e.keyCode == 39 || e.keyCode == 38 || e.keyCode == 40) {
            e.preventDefault(); // Prevent default action
            if (e.keyCode == 37 && currentIndex > 0) { // Left arrow key
                inputs.eq(currentIndex - 1).focus();
            } else if (e.keyCode == 39 && currentIndex < inputs.length - 1) { // Right arrow key
                inputs.eq(currentIndex + 1).focus();
            } else if (e.keyCode == 38 && currentIndex > 0) { // Up arrow key
                inputs.eq(currentIndex - 1).focus();
            } else if (e.keyCode == 40 && currentIndex < inputs.length - 1) { // Down arrow key
                inputs.eq(currentIndex + 1).focus();
            }
        }
    });








});
