token = sessionStorage.getItem("access_token");
var state = 0;
/************收货地址************/
$(document).ready(function() {

    //编辑
    if(localStorage.getItem('you-name')){
        $(".realname").val(localStorage.getItem('you-name'));
        $(".phone").val(localStorage.getItem('you-phone'));

        var array = localStorage.getItem('you-home').split(" ");
        $("#city-picker").val(array[0]+" "+array[1]+" "+array[2]);
        $(".detailedAddress").val(array[3]);
    }

    var str = "";
    $.post(webSite+"/foreign/homeget?token="+token,function(data){
        data = JSON.parse(data);
        console.log(data);
        if(0 == data.code){
            $(".addAddress").show();
            $(".alreadyAddress").hide();
        }else if(200 == data.code){
            $(".addAddress").hide();
            $(".alreadyAddress").show();
            $(".confirmPost").removeAttr("disabled");
            $.each(data.data,function(i,j){
                str += '<p>'+j.name+' <span class="phoneInfo">'+j.phone+'</span></p><div>'+j.home+'</div>';
                localStorage.setItem('you-id',j.id);
                localStorage.setItem('you-name',j.name);
                localStorage.setItem('you-phone',j.phone);
                localStorage.setItem('you-home',j.home);
            });
        }
        $(".alreadyAddress").html(str);
    });
});

//点击添加邮寄地址
$(".addAddress").click(function(){
    window.location.href="/answerResolution/writeAddress.html";
});

$(".realname").focus(function(){
    $(".errorInfo").hide();
});
$(".phone").focus(function(){
    $(".errorInfo").hide();
});
$(".detailedAddress").focus(function(){
    $(".errorInfo").hide();
});
//点击确认身份
$(".save").click(function(){
    var name = $.trim($(".realname").val());
    var nameFlag = /^[\u4e00-\u9fa5]{2,5}$/.test(name);
    var phone = $.trim($(".phone").val());
    var phoneFlag = /^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(phone);
    var address = $.trim($("#city-picker").val());
    var xaddress = $.trim($(".detailedAddress").val());
    var add = address + " " +xaddress;

    //获取地址栏参数
    var edit = GetQueryString("edit");
    if(nameFlag){
        if(phoneFlag){
            if(address && xaddress){
                $.post(webSite+"/foreign/homenew?token="+token,{'id':localStorage.getItem('you-id'),'name':name, 'phone':phone, 'home':add},function(data){
                    data = JSON.parse(data);
                    if(200 == data.code){
                        if(edit){
                            localStorage.setItem('you-name',name);
                            localStorage.setItem('you-phone',phone);
                            localStorage.setItem('you-home',add);
                            window.location.href="/answerResolution/orderInfo.html";
                        }else{
                            window.location.href="/answerResolution/deliveryAddress.html";
                        }
                    }
                });
            }else{
                $(".errorInfo").show().html("地址不能为空！");
            }
        }else{
            $(".errorInfo").show().html("手机号格式不对！");
        }
    }else{
        $(".errorInfo").show().html("姓名格式不正确！");
    }
});
/************收货地址************/

//修改收货地址
$(".alreadyAddress").click(function(){
    window.location.href="/answerResolution/writeAddress.html";
});

//确认编辑
$(".confirmPost").click(function(){
    window.location.href="/answerResolution/orderInfo.html";
});