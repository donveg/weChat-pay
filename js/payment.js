$.ajaxSetup({
    async: false
});
$.post(webSite+"/payment/jsapitick?token="+token,function(data){
    configData = JSON.parse(data);

});
wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: configData.appid, // 必填，公众号的唯一标识
    timestamp: configData.timestamp, // 必填，生成签名的时间戳
    nonceStr: configData.nonceStr, // 必填，生成签名的随机串
    signature: configData.signature,// 必填，签名，见附录1
    jsApiList:configData.jsApiList,
});
wx.ready(function () {
    // 10 微信支付接口
    // 10.1 发起一个支付请求
    document.querySelector('#chooseWXPay').onclick = function () {
        var remarks = $(".detailedAddress").val();
        $.post(webSite+"/payment/placeordernew?token="+token,{"remarks":remarks},function(data){
            data = JSON.parse(data);
            if(200 == data.error){
                data = JSON.parse(data.data);
                wx.chooseWXPay({
                    timestamp: data.timestamp,
                    nonceStr: data.nonceStr,
                    package:data.package ,
                    signType:'MD5',
                    paySign: data.paySign,
                    success: function (res) {
                       //     alert(res.err_msg);
                        if(res.errMsg == "chooseWXPay:ok"){
                            window.location.href="/answerResolution/paySuccess.html";
                        }else if(res.err_msg == "chooseWXPay:cancel"){
                            alert("已取消微信支付");
                        }
                    }
                });

            }
        });

    };

});
