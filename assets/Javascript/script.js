
    var css1 = {
    display:"none"
}
    var css2 ={
    display: "block",
    paddingBottom: "20px"
}
    $("#homeSection").css(css2);
    $("#customerSection").css(css1);
    $("#addedItemSection").css(css1);
    $("#itemSection").css(css1);
    $("#profileSection").css(css1);
    $("#ReportSection").css(css1);
    $("#orderSection").css(css1);


    $("#nav-item").click(function (){
    $("#homeSection").css(css1);
    $("#customerSection").css(css1);
    $("#addedItemSection").css(css1);
    $("#itemSection").css(css2);
    $("#profileSection").css(css1);
    $("#ReportSection").css(css1);
    $("#orderSection").css(css1);
});
    $("#nav-home").click(function (){
    $("#homeSection").css(css2);
    $("#customerSection").css(css1);
    $("#addedItemSection").css(css1);
    $("#itemSection").css(css1);
    $("#profileSection").css(css1);
    $("#ReportSection").css(css1);
    $("#orderSection").css(css1);
});

    $("#nav-customer").click(function (){
    $("#homeSection").css(css1);
    $("#customerSection").css(css2);
    $("#addedItemSection").css(css1);
    $("#itemSection").css(css1);
    $("#profileSection").css(css1);
    $("#ReportSection").css(css1);
    $("#orderSection").css(css1);
});

    $("#nav-order").click(function (){
    $("#homeSection").css(css1);
    $("#customerSection").css(css1);
    $("#addedItemSection").css(css1);
    $("#itemSection").css(css1);
    $("#profileSection").css(css1);
    $("#ReportSection").css(css1);
    $("#orderSection").css(css2);
});

    $("#nav-profile").click(function (){
    $("#homeSection").css(css1);
    $("#customerSection").css(css1);
    $("#addedItemSection").css(css1);
    $("#itemSection").css(css1);
    $("#profileSection").css(css2);
    $("#ReportSection").css(css1);
    $("#orderSection").css(css1);
});
    $("#addedItem").click(function (){
    $("#homeSection").css(css1);
    $("#customerSection").css(css1);
    $("#addedItemSection").css(css2);
    $("#itemSection").css(css1);
    $("#profileSection").css(css1);
    $("#ReportSection").css(css1);
    $("#orderSection").css(css1);
});
    $("#nav-report").click(function (){
    $("#homeSection").css(css1);
    $("#customerSection").css(css1);
    $("#addedItemSection").css(css1);
    $("#itemSection").css(css1);
    $("#profileSection").css(css1);
    $("#ReportSection").css(css2);
    $("#orderSection").css(css1);
});
