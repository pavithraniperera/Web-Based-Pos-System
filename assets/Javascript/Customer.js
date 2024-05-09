import CustomerModel from "../../model/CustomerModel.js";
import {customerArray} from "../../db/database.js";
$(document).ready(function () {


    $("#addCustomer").click(function () {
        var customerId = $("#id").val().trim();
        var customerName = $("#fName").val().trim();
        var customerContact = $("#Contact").val().trim();
        var customerAddress = $("#Address").val().trim();
        var customerNote = $("#Note").val().trim();

        if (!customerId || !customerName || !customerContact || !customerAddress || !customerNote) {
            alert("Please fill in all fields.");
            return;
        }

        let customer = new CustomerModel(customerId,customerName,customerContact,customerAddress,customerNote);

      /*  var customer = {
            id : customerId,
            name: customerName,
            contact : customerContact,
            address: customerAddress,$("#deleteBtn").click(function (){

            note:customerNote

        }*/
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
    })



});

