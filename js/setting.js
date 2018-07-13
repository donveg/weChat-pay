//设置成rem单位
//===========设置rem和==========
(function(){
    var vHtml = document.documentElement;
    var vWidth = vHtml.getBoundingClientRect().width;
    vHtml.style.fontSize = vWidth / 15 + 'px';
})()

//获取地址栏参数
function GetQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}

webSite = "http://weixinphp.sostudy.cn";

//========阻止微信浏览器的自带返回事件=========
function pushHistory() {
    var state = {  title: "title",  url: "#" };
    window.history.pushState(state, "title", "#");
}