$(document).ready(function (){
    $(".item-button").click( function (){
        console.log("clicked")
        var itemName =$(this).closest(".card-body").find(".card-title").text();
        var itemImageSrc =$(this).closest(".item-card").find(".card-img-top").attr("src");
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

    })

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
})