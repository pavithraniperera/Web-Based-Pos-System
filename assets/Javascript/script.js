
    var css1 = {
    display:"none"
}
    var css2 ={
    display: "block",

}


   function handleNavClick(clickedElementId){

       switch (clickedElementId) {
           case "nav-home":
               showSection("homeSection");
               break;
           case "nav-customer":
               showSection("customerSection");
               break;
           case "nav-item":
               showSection("itemSection");
               break;

           case "nav-order":
               showSection("orderSection");
               break;

           case "nav-profile":
               showSection("profileSection");
               break;

           case "addedItem":
               showSection("addedItemSection");
               break;

           case "nav-report":
               showSection("ReportSection");

       }
   }
   function showSection(sectionId){
       $("#homeSection").css(css1);
       $("#customerSection").css(css1);
       $("#addedItemSection").css(css1);
       $("#itemSection").css(css1);
       $("#profileSection").css(css1);
       $("#ReportSection").css(css1);
       $("#orderSection").css(css1);
       $(`#${sectionId}`).css(css2);
   }

    $("#nav-item").click(function () {
        handleNavClick($(this).attr("id"));
    });

    $("#nav-home").click(function () {
        handleNavClick($(this).attr("id"));
    });
    $("#nav-report").click(function () {
        handleNavClick($(this).attr("id"));
    });
    $("#nav-profile").click(function () {
        handleNavClick($(this).attr("id"));
    });
    $("#nav-order").click(function () {
        handleNavClick($(this).attr("id"));
    });
    $("#nav-customer").click(function () {
        handleNavClick($(this).attr("id"));
    });

    $("#addedItem").click(function () {
        handleNavClick($(this).attr("id"));
    });
    $(document).ready(function() { // This function runs when the document is ready
      /*  handleNavClick("nav-home");*/
        $("#dashboard").css(css1);
        $("body").css({
            paddingTop:0
        })
    });

    $("#nav-login").click(function (){
        $("#login").css(css1)
        $("#dashboard").css(css2);
        handleNavClick("nav-home");
        $("body").css({
            paddingTop:150
        })
    })





