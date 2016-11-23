/**
 * Created by yin on 2016/11/22.
 */



window.onload = function () {
    var container2 = document.getElementsByClassName("box-wrapper");
    var content2 = document.getElementById("box");
    var list2 = content2.children;
    var now2 = 0;

    var container1 = document.getElementsByClassName("tips-container");
    var content1 = document.getElementById("tips");
    var list1 = content1.children;
    var now1 = 0;

    slider(list1, content1, container1, now1);
    slider(list2, content2, container2, now2);


    function slider(list, content, container, now) {
        for ( var i = 0; i < list.length; i++) {
            list[0].className = 'active';
            content.style.left = 0 + 'px';
            list[i].index = i;
            list[i].onclick = function () {
                now = this.index;
                play();
            }
        }
        function play() {
            for(var j = 0; j < list.length; j++) {
                list[j].className = '';
            }
            list[now].className = 'active';
            animate( content, { left: -1206 * now} );
        }

        function autoPlay() {
            now++;
            if (now == list.length) {
                now = 0;
            }
            play();
        }
        var timer = setInterval(autoPlay, 3200);
        container.onmousemove = function () {
            clearInterval(timer);
        };
        container.onmouseout = function () {
            timer = setInterval(autoPlay, 3200);
        };
    }


    function getStyle(obj,name){
        if(obj.currentStyle){
            return obj.currentStyle[name];
        } else{
            return getComputedStyle(obj,false)[name];
        }
    }

    function animate(obj, json, fnEnd) {
        clearInterval(obj.timer);
        obj.timer = setInterval(function() {
            var bStop = true;
            for (var attr in json) {
                var cur = 0;
                if (attr == "opacity") {
                    cur = Math.round(parseFloat(getStyle(obj, attr)) * 100);
                } else {
                    cur = parseInt(getStyle(obj, attr))
                }
                var speed = (json[attr] - cur) / 10;
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                if (cur !== json[attr]) {
                    bStop = false;
                };
                if (attr == "opacity") {
                    obj.style.opacity = (speed + cur) / 100;
                    obj.style.filter = 'alpha(opacity:' + (speed + cur) + ')';
                } else {
                    obj.style[attr] = cur + speed + 'px';
                }
            }
            if (bStop) {
                clearInterval(obj.timer);
                if (fnEnd) fnEnd();
            }
        }, 30)
    }
};

