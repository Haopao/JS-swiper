function swiper(data) {                   //插件封装
    data.oUl.style.width = data.aLi.length + "00vw";
    data.oUl.addEventListener("touchstart",touch);
    data.oUl.addEventListener("touchmove",touch);
    data.oUl.addEventListener("touchend",touch);
    var startX;              //ul元素初始偏移量
    var startPoint;          //手指触摸点
    data.oUl.transform={};       //ul自定义属性，存放当前ul的transform值
    var n=data.aLi.length;
    var w=data.aLi[0].offsetWidth;
    function touch() {
        var ev=window.event||ev;
        switch (ev.type){             //事件分流
            case "touchstart":            //手指触摸
                data.oUl.style.transition="";
                startX=data.oUl.transform["translateX"]||0;         //ul初始偏移量
                startPoint=ev.changedTouches[0];              //手指触摸点x1
                break;
            case "touchmove":
                var nowPoint=ev.changedTouches[0];              //手指滑动点x2
                var disX=startX+nowPoint.pageX-startPoint.pageX;
                data.oUl.style.transform="translateX(" + disX + "px)";
                data.oUl.transform={"translateX":disX};
                break;
            case "touchend":
                var d=data.oUl.transform["translateX"];
                d=Math.min(0,d);           //ul偏移量：>0   -> 0
                d=Math.max(-(n-1)*w,d);         //偏移量不能小于-(n-1)*w
                d=Math.round(d/w)*w;
                data.oUl.style.transition="0.5s";
                data.oUl.style.transform="translateX(" + d + "px)";
                data.oUl.transform={"translateX":d};
                data.bg_img.src=data.aLi[Math.round(-d/w)].children[0].src;
                break;
        }
    }
}

function cssTransform(obj,attr,val) {
    if (!obj.transform){
        obj.transform ={};
    };
    var value;
    switch (arguments.length) {
        case 2:
            if(!obj.transform[attr]){
                value = 0;
            }
            value = obj.transform[attr];
            return value;
            break;
        case 3:
            obj.transform[attr] = val;
            var strVal = "";
            for (var key in obj.transform){
                switch (key){
                    case "translate":
                    case "translateX":
                    case "translateY":
                    case "translateZ":
                        strVal += '$(key)($(obj.transform[key])px)';                       //ES6拼接
                }
            }
            obj.style.transform = strVal;
            break;
    }

}