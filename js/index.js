/*
相关设置分离到settings.js
*/
//未中奖人员名单
var remainPerson = allPerson;
//中奖人员名单
var luckyMan = [];
var timer;//定时器
var times = 1;//抽奖次数,如果不是第一次，不加粗显示领导姓名

var pool = [
    [
        {
            name: "逗号咖啡券",
            quota: 8
        }, {
            name: "家用油壶",
            quota: 10
        }, {
            name: "家有健康空气检测1次",
            quota: 2
        }, {
            name: "水杯",
            quota: 8
        }, {
            name: "星乐杯",
            quota: 2
        }
    ],
    [
        {
            name: "茶具",
            quota: 25
        }, {
            name: "电子秤",
            quota: 6
        }, {
            name: "风扇",
            quota: 1
        }, {
            name: "红酒",
            quota: 8
        },
    ],
    [
        {
            name: "星味大礼包",
            quota: 1
        }, {
            name: "37度学习桌子",
            quota: 1
        }, {
            name: "松下空调",
            quota: 1
        }, {
            name: "欧铂丽床垫",
            quota: 1
        },
    ]
]



function toggleFullScreen(forceToDo) {
    if (!document.fullscreenElement && // alternative standard method
        !document.mozFullScreenElement && !document.webkitFullscreenElement || forceToDo) {// current working methods
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
    }
}

$(function () {
    iconAnimation();
    //开始抽奖
    $("#txtNum").val(1);
    $("#btnStart").text("开始");//设置按钮文本为开始
    $("#btnStart").on("click", function () {
        //判断是开始还是结束
        if ($("#btnStart").text().substring(0, 2) === "开始") {
            if (!$("#txtNum").val()) {
                showDialog("请输入第几轮");
                return false;
            }
            if ($("#txtNum").val() > pool.length || $("#txtNum").val() <= 0) {
                showDialog(`只能输入1${pool.length > 1 ? '~' + pool.length : ''}`);
                return false;
            }
            if ($("#txtNum").val() > remainPerson.length) {
                showDialog("当前抽奖人数大于奖池总人数<br>当前抽奖人数：<b>" + $("#txtNum").val() + "</b>人,奖池人数：<b>" + remainPerson.length + "</b>人");
                return false;
            }
            $("#result").fadeOut("fast");
            //显示动画框，隐藏中奖框
            $("#luckyDrawing").show().next().addClass("hide");
            move();
            $("#btnStart").text("停止");
            $("#bgLuckyDrawEnd").removeClass("bg");
        }
        else {
            //PillarsZhang：剩余人数我加的，这边用了全角空格
            var luckyDrawNum = $("#txtNum").val();
            startLuckDraw(pool);//抽奖开始

            $("#luckyDrawing").fadeOut();
            clearInterval(timer);//停止输入框动画展示
            $("#luckyDrawing").val(luckyMan[luckyMan.length - 1]);//输入框显示最后一个中奖名字
            $("#result").fadeIn().find("div").removeClass().addClass("p" + 1);//隐藏输入框，显示中奖框  p后面的数字决定了字体大小
            $("#bgLuckyDrawEnd").addClass("bg");//添加中奖背景光辉
            $("#txtNum").attr("placeholder", "输入中奖人数(" + remainPerson.length + ")");
            $("#btnStart").text("开始");//设置按钮文本为开始
        }
    });

    $("#btnReset").on("click", function () {
        //确认重置对话框
        var confirmReset = false;
        showConfirm("确认重置吗？所有已中奖的人会重新回到抽奖池！", function () {
            //熏置未中奖人员名单
          
            remainPerson = allPerson;
            //中奖人数框置空
            $("#txtNum").val(1).attr("placeholder", "请输入第几轮");
            $("#showName").val("");
            //隐藏中奖名单,然后显示抽奖框
            $("#result").fadeOut("normal", function () {
                $("#result").html("<div><font size=\"10\">准备就绪</font></div>");
                $("#result").fadeIn();
            });//动画效果过渡成准备就绪（PillarsZhang）
            $("#bgLuckyDrawEnd").removeClass("bg");//移除背景光辉
            $("#btnStart").text("开始");//设置按钮文本为开始
            times++;
            console.log(times);

        });
    });
});

//抽奖主程序
function startLuckDraw(pool) {
    //抽奖人数
    var round = $("#txtNum").val();
    /*     if (luckyDrawNum > remainPerson.length) {
            alert("抽奖人数大于奖池人数！请修改人数。或者点重置开始将新一轮抽奖！");
            return false;
        } */

    var itemArr = pool[round - 1];
    var randomPerson;
    var wholeHtml = '';
    itemArr.forEach(e => {

        //随机中奖人
        randomPerson = getRandomArrayElements(remainPerson, e.quota);

        var tempHtml = `<span class='title'>${e.name}: </span>`;
        $.each(randomPerson, function (i, person) {
            /* if (leaderArr.indexOf(person) > -1 && times == 1) {
                tempHtml += "<span><b>" + person + "</b></span>";
            }
            else {
                tempHtml += "<span>" + person + "</span>";
            } */

            tempHtml += `<span> ${person} </span>`;
        });

        wholeHtml += "<p>" + tempHtml + "</p>";


        //剩余人数剔除已中奖名单
        remainPerson = remainPerson.delete(randomPerson);
        //中奖人员
        luckyMan = luckyMan.concat(randomPerson);
        //设置抽奖人数框数字为空

        if (setEmptyPerson) { $("#txtNum").val(""); };
        /*
        PillarsZhang补充：有时候不需要每次都把人数框清空
        根据需求来吧，在settings.js里改
        */

    });

    $("#result>div").html(wholeHtml);
}

//参考这篇文章：http://www.html-js.com/article/JS-rookie-rookie-learned-to-fly-in-a-moving-frame-beating-figures
//跳动的数字
function move() {
    var $showName = $("#showName"); //显示内容的input的ID
    var interTime = 30;//设置间隔时间
    timer = setInterval(function () {
        var i = GetRandomNum(0, remainPerson.length);
        $showName.val(remainPerson[i]);//输入框赋值
    }, interTime);
}

//顶上的小图标，随机动画
function iconAnimation() {
    var interTime = 200;//设置间隔时间
    var $icon = $("#iconDiv>span");
    var arrAnimatoin = ["bounce", "flash", "pulse", "rubberBand", "shake", "swing", "wobble", "tada"];
    var timer2 = setInterval(function () {
        var i = GetRandomNum(0, $icon.length);
        var j = GetRandomNum(0, arrAnimatoin.length);
        //console.log("i:" + i + ",j:" + j);
        $($icon[i]).removeClass().stop().addClass("animated " + arrAnimatoin[j]);//输入框赋值
    }, interTime);

}