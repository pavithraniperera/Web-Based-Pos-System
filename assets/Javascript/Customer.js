import CustomerModel from "../../model/CustomerModel.js";

$(document).ready(function () {
    var customerArray =[];

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
            address: customerAddress,
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
        `; $(".table-custom tbody").append(newRow);
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

});

