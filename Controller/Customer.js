import CustomerModel from "../model/CustomerModel.js";
import {customerArray, orders} from "../db/database.js";



$(document).ready(function () {


    $("#addCustomer").click(function () {
        var customerId = $("#id").val().trim();
        var customerName = $("#fName").val().trim();
        var customerContact = $("#Contact").val().trim();
        var customerAddress = $("#Address").val().trim();
        var customerNote = $("#Note").val().trim();

        //check if all the input fields are filled
        if (!customerId || !customerName || !customerContact || !customerAddress || !customerNote) {
            alert("Please fill in all fields.");
            return;
        }

        //check customer id
        if (!customerId){
            $("#errorText").text("Customer ID is required")
            $("#errorModal").modal("show");
            return;
        } else if (!/^C\d{3}$/.test(customerId)) {
            $("#errorText").text("Customer ID must be in the format 'C001'.")
            $("#errorModal").modal("show");
            return;
        }
        // Check if customer name contains numbers
        if (!customerName){
            $("#errorText").text("Customer name is required")
            $("#errorModal").modal("show");
            return;
        }
        if (/\d/.test(customerName)) {
            $("#errorText").text("Customer name cannot contain numbers.")
            $("#errorModal").modal("show");
            return;
        }

        //check customer Address
        if (!customerAddress){
            $("#errorText").text("Customer address is required");
            $("#errorModal").modal("show");
            return;
        }

        // Check contact format (e.g., 10-digit number)
        if ( !customerContact){
            $("#errorText").text("Customer contact is required")
            $("#errorModal").modal("show");
            return;
        }
       else if (!/^\d{10}$/.test(customerContact)) {
            $("#errorText").text("Invalid contact number format. Please enter a 10-digit number.")
            $("#errorModal").modal("show");
            return;
        }

        let customer = new CustomerModel(customerId,customerName,customerContact,customerAddress,customerNote);

        customerArray.push(customer);
        loadTable();
        $("#text").text("Successfully added new customer")
        $("#successModal").modal("show");

        resetInputFields();
    });

    function resetInputFields() {
        $(".info-section input, .info-section textarea").val(""); // Set value to empty string
    }
    function loadTable(){
        $("#customerTable").empty();
        customerArray.map((item,index)=>{

            var newRow = `
             <tr>
                <td class="id">${item.id}</td>
                <td class="name">${item.name}</td>
                <td class="contact">${item.contact}</td>
                <td class="address">${item.address}</td>
                <td class="note">${item.note}</td>
                <td>
                    <button class="btn btn-danger btn-sm"><i class="fa-solid fa-trash"></i></button>
                    <button class="btn btn-warning btn-sm"><i class="fa-solid fa-pen-to-square"></i></button>
                </td>
            </tr>
        `; $("#customerTable").append(newRow);
        });
    }


    var recordIndex;
    var editCustomer;

    $("#customerTable").on("click","tr",function (){
        let index = $(this).index();
        recordIndex = index;
        let id =$(this).find(".id").text();
        let name =$(this).find(".name").text();
        let contact = $(this).find(".contact").text();
        let address =$(this).find(".address").text();
        let note = $(this).find(".note").text()

        $("#id").val(id);
        $("#fName").val(name);
        $("#Contact").val(contact);
        $("#Address").val(address);
        $("#Note").val(note);
        editCustomer = new CustomerModel(id,name,contact,address,note);
    });
    $("#editCustomer").click(function (){
        $("#idModal").val(editCustomer.id);
        $("#fNameModal").val(editCustomer.name);
        $("#ContactModal").val(editCustomer.contact);
        $("#AddressModal").val(editCustomer.address);
        $("#NoteModal").val(editCustomer.note);
    });

    $("#saveChanges").click(function (){
        var idModalValue = $("#idModal").val();
        var fNameModalValue = $("#fNameModal").val();
        var ContactModalValue = $("#ContactModal").val();
        var AddressModalValue = $("#AddressModal").val();
        var NoteModalValue = $("#NoteModal").val();

        let cusObj = customerArray[recordIndex];
        cusObj.id =idModalValue;
        cusObj.name =fNameModalValue;
        cusObj.contact = ContactModalValue;
        cusObj.address = AddressModalValue;
        cusObj.note = NoteModalValue;
        $("#editModal").modal("hide");
        loadTable();
        resetInputFields();
        $("#successModal").modal("show");

    });

    $("#okBtn").click(function (){
        $("#successModal").modal("hide");
    });


    $("#confirmDelete").click(function (){
        customerArray.splice(recordIndex,1);
        loadTable();
        $("#customerDeleteModal").modal("hide");
        resetInputFields();
        $("#text").text("Successfully Deleted a customer")
        $("#successModal").modal("show");
    });

    //search customer
    $("#customerSearch").click( function (e) {
        var customerId = $("#customerInput").val().trim();

        if (!customerId) {
            $("#errorText").text("Please enter a customer ID to search.");
            $("#errorModal").modal("show");
            return;
        }
        searchCustomer(customerId);

    });

    function searchCustomer(customerId) {
        let filterCustomer = customerArray.filter(customer => customer.id === customerId);
        if (filterCustomer.length === 0) {
            $("#errorText").text("No Customer Data found for the given customer ID.")
            $("#errorModal").modal("show");
            return
        }

        displayFilteredCustomer(filterCustomer);

    }

    function displayFilteredCustomer(filterCustomer) {
         filterCustomer.forEach(customer=>{
             $("#id").val(customer.id);
             $("#fName").val(customer.name);
             $("#Contact").val(customer.contact);
             $("#Address").val(customer.address);
             $("#Note").val(customer.note);
         })

    }





});

