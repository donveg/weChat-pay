token = sessionStorage.getItem("access_token");
var subjectId = {"语文":1,"数学":2,"英语":3};
var subject;
$(document).ready(function() {
//随机取得数组中的一个
    var Arr = ["语文","数学","英语"];
    var n = Math.floor(Math.random() * Arr.length + 1)-1;
    $(".score").attr("placeholder",Arr[n]+"分数");
    subject = Arr[n];
});

/************验证身份************/
$(".name").focus(function(){
    $(".errorInfo").hide();
    console.log($(this).parent());
    $(this).parent().css("border-bottom","0.04rem solid #5CC0E8");
});
$(".examcode").focus(function(){
    $(".errorInfo").hide();
    $(this).parent().css("border-bottom","0.04rem solid #5CC0E8");
});
$(".score").focus(function(){
    $(".errorInfo").hide();
    $(this).parent().css("border-bottom","0.04rem solid #5CC0E8");
});
$(".name").blur(function(){
    $(this).parent().css("border-bottom","0.04rem solid rgba(0,0,0,0.26)");
});
$(".examcode").blur(function(){
    $(this).parent().css("border-bottom","0.04rem solid rgba(0,0,0,0.26)");
});
$(".score").blur(function(){
    $(this).parent().css("border-bottom","0.04rem solid rgba(0,0,0,0.26)");
});
//点击确认身份
$(".confirm").click(function(){
    var name = $(".name").val();
    var nameFlag = /^[\u4e00-\u9fa5]{2,5}$/.test(name);
    var examcode = $(".examcode").val();
    var examcodeFlag = /^[0-9]*$/.test(examcode);
    var score = $(".score").val();
    var scoreFlag = /^\d{1,3}$/.test(score);

    var data = {
        "examcode" : examcode,
        "username" : name,
        "subject" :subjectId[subject],
        "score": score,
    };

    if(nameFlag){
        if(examcodeFlag){
            if(score){
                $.post(webSite+"/foreign/loginmtc?token="+token,data,function(data){
                    data = JSON.parse(data);
                    console.log(data);
                    if(200 == data.code){
                        window.location.href="/answerResolution/deliveryAddress.html";
                    }else if(0 == data.code){
                        $(".errorInfo").show().html("网络错误，请检查网络！");
                    }else if(201 == data.code){
                        $(".errorInfo").show().html("准考证号或者学籍号不存在！");
                    }else if(202 == data.code){
                        $(".errorInfo").show().html("准考证号与姓名，分数不匹配！");
                    }else if(203 == data.code){
                        $(".errorInfo").show().html("分数不匹配！");
                    }
                });
            }else{
                $(".errorInfo").show().html("分数格式不对！");
            }
        }else{
            $(".errorInfo").show().html("学籍号格式不对！");
        }
    }else{
        $(".errorInfo").show().html("姓名格式不正确！");
    }
});


/************验证身份************/