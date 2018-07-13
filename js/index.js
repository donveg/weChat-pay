
$(document).ready(function() {

    $.ajax({
        type: "get",
        url: webSite+"/public/mctvf",
        data: "code="+GetQueryString("code"),
        dataType: "json",
        success: function(msg){
            console.log(msg);
            sessionStorage.setItem("access_token",msg.token);
        }
    });
});

//index首页地区选择

$(".Region li").click(function(){
    $(".errorInfo").hide();
    $(".Region li").removeClass("active");
    $(this).addClass("active");
    $(".region").html($(".Region .active").text());
});

$(".Grade li").click(function(){
    $(".errorInfo").hide();
    $(".Grade li").removeClass("active");
    $(this).addClass("active");
    $(".grade").html($(".Grade .active").text());
});

$(".Subject li").click(function(){
    $(".errorInfo").hide();
    $(".Subject li").removeClass("active");
    $(this).addClass("active");
    $(".subject").html($(".Subject .active").text());
});

//立即查看
$(".look").click(function(){
    var v1 = $(".Region .active").text();
    var v2 = $(".Grade .active").text();
    var v3 = $(".Subject .active").text();

    sessionStorage.setItem("index-region",v1);
    sessionStorage.setItem("index-grade",v2);
    sessionStorage.setItem("index-subject",v3);

    if(v1 && v2 && v3){
        window.location.href="/answerResolution/listReport.html";
    }else{
        $(".errorInfo").show().html("请选择完整的学科信息！");
    }
});