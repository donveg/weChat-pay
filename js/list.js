token = sessionStorage.getItem("access_token");
var region = sessionStorage.getItem("index-region");
var grade = sessionStorage.getItem("index-grade");
var subject = sessionStorage.getItem("index-subject");

$(document).ready(function() {
    var data ={
        "region":  region,
        "subject": subject,
        "class":   grade,
        "type":    1,
    };
    $.post(webSite+"/foreign/anwer?token="+token,data,function(data){
        console.log(data);
        data = JSON.parse(data);
        if(data.img){
            $(".gget").removeAttr("disabled");
            $(".testImg").attr("src",data.img);
            $(".mask,#task").fadeIn();
        }else{
            $(".gget").attr("disabled","disabled");
            $(".testImg").addClass("noImg");
            $(".testImg").attr("src","/answerResolution/images/no.png");
        }
    });
});

$(".get").click(function(){
    window.location.href="/answerResolution/evaluationReport.html";
});
$(".gget").click(function(){
    window.location.href="/answerResolution/evaluationReport.html";
});

$(".getReport").click(function(){
    $.post(webSite+"/foreign/islogin?token="+token,function(data){
        console.log(data);
        data = JSON.parse(data);
       if(0 == data.code){
           window.location.href="/answerResolution/confirmIdentity.html";
       }else if(200 == data.code){
           window.location.href="/answerResolution/deliveryAddress.html";
       }
    });
});
//点击关闭按钮
$(".del").click(function(){
    $(".mask,#task").fadeOut();
});
