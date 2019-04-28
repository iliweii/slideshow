
var list = $('.slideImg');       //获取与图片相关的<div>对象
var container = $('.slideShow');   //获取整个轮播图容器对象
var index = 1;                   //指当前图片对象
var timer;                       //定时对象
var buttons = $('.slideCon');    //获取图片下面的按钮对象
var prev = $('#prev');           //获取左按钮对象
var next = $('#next');           //获取右按钮对象
var sum = 3;                     //轮播总数
var stateNext = true;
var statePrev = true;


$(document).ready(function(){
    container.mouseover(function(){    //用于鼠标进入轮播图区域停止轮播
        stop();
    });
    container.mouseout(function(){     //用于鼠标离开轮播图区域开始轮播
        play();
    });
    for (var i = 0; i < buttons.length; i++) {  //循环绑定下面按钮的点击事情
        (function (i) {
            buttons[i].onclick = function () {
                index = i + 1;
                imgShow();
                buttonsShow();
            }
        })(i)
    }
    prev.click(function () {            //点击左按钮轮播图片事件。利用延时器解决无限点击问题。
        if(statePrev){
            index -= 1;
            if (index < 1) {
                index = sum;
            }
            imgShow();
            buttonsShow();
            statePrev = false;
            setTimeout(function(){
                statePrev = true;
            },1000)
        }
    });
 
    next.click(function () {
        //由于上边定时器的作用，index会一直递增下去，我们只有3个小圆点，所以需要做出判断
        if(stateNext){
            index += 1;
            if (index > sum) {
                index = 1
            }
            imgShow();
            buttonsShow();
            stateNext = false;
            setTimeout(function(){
                stateNext = true
            },1000)
        }
    });
});


function play() {                    //开始轮播函数
    //重复执行的定时器
    timer = setInterval(function () {
        index += 1;
        if (index > sum) {
            index = 1
        }
        imgShow();
        buttonsShow();
    }, 4000)
}
 
function stop() {                   //停止轮播函数
    clearInterval(timer);
}
 
function imgShow(){                 //图片显示函数
    for (var i = 0; i < list.length; i++) {
        if (list.eq(i).css('opacity') == 1) {
            list.eq(i).fadeTo(1000,0);
        }
    }
    list.eq(index - 1).fadeTo(1000,1);
}
 
function buttonsShow() {           // 图片下面按钮的显示函数。
    //将之前的小圆点的样式清除
    for (var i = 0; i < buttons.length; i++) {
        if (buttons[i].className == "slideCon2") {
            buttons[i].className = "slideCon";
        }
    }
    buttons[index-1].className = "slideCon2";
}
play();