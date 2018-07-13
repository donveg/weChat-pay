token = sessionStorage.getItem("access_token");

/************收货地址************/
$(document).ready(function() {
    var str = "";
    str += '<p>'+localStorage.getItem('you-name')+' <span class="phoneInfo">'+localStorage.getItem('you-phone')+'</span></p><div>'+localStorage.getItem('you-home')+'</div>';
    $(".alreadyAddress").html(str);
});


//修改收货地址
$(".alreadyAddress").click(function(){
    window.location.href="/answerResolution/writeAddress.html?edit=1";
});

//pushHistory();
//window.addEventListener("popstate", function() {
//    window.location.href ="/answerResolution/deliveryAddress.html";
//}, false);
