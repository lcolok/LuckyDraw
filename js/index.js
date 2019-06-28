/*
相关设置分离到settings.js
*/
//未中奖人员名单
var remainPerson = allPerson;
//中奖人员名单
var luckyMan = [];
var timer;//定时器
var times = 1;//抽奖次数,如果不是第一次，不加粗显示领导姓名

var count = 1;

var pool = [
    [
        {
            name: "洁邦家政2小时保洁服务",
            quota: 3,
            staticResult: 'NO.171，NO.082，NO.048'
        }, {
            name: "精酿啤酒",
            quota: 3,
            staticResult: 'NO.099，NO.027，NO.001'
        }, {
            name: "益智积木",
            quota: 14,
            staticResult: 'NO.535，NO.475，NO.350，NO.004，NO.115，NO.156，NO.256，NO.063，NO.395，NO.288，NO.161，NO.140，NO.119，NO.128'
        }
    ],
    [
        {
            name: "巴布噜易道教育50元抵用券",
            quota: 20,
            staticResult: 'NO.090，NO.135，NO.210，NO.243，NO.363，NO.278，NO.295，NO.247，NO.182，NO.164，NO.147，NO.057，NO.209，NO.111，NO.153，NO.371，NO.195，NO.204，NO.215，NO.223'
        }, {
            name: "巴布噜易道教育100元抵用券",
            quota: 20,
            staticResult: 'NO.234，NO.260，NO.143，NO.313，NO.453，NO.032，NO.512，NO.008，NO.131，NO.550，NO.375，NO.188，NO.193，NO.230，NO.640，NO.674，NO.298，NO.087，NO.056，NO.322'
        }
    ],
    [
        {
            name: "TZ舞蹈季卡",
            quota: 25,
            staticResult: 'NO.159'
        }, {
            name: "至尊披萨家庭套装",
            quota: 6,
            staticResult: 'NO.273，NO.285，NO.267，NO.167，NO.078'
        }, {
            name: "建行金猪仔",
            quota: 1,
            staticResult: 'NO.026，NO.282'
        }
    ], [
        , {
            name: "儿童跑车",
            quota: 6,
            staticResult: 'NO.251，NO.103'
        }, {
            name: "米摩造型水能V脸美容护理",
            quota: 1,
            staticResult: 'NO.0379'
        }, {
            name: "米摩造型伊丽莎白焕颜护理",
            quota: 6,
            staticResult: 'NO.203'
        },
    ], [{
        name: "米摩造型无针水光护理",
        quota: 1,
        staticResult: 'NO.215'
    }, {
        name: "米摩造型网红纹理日系染烫",
        quota: 1,
        staticResult: 'NO.367'
    }, {
        name: "米摩造型头发SPA护理",
        quota: 1,
        staticResult: 'NO.067'
    }],
    [{
        name: "干衣机",
        quota: 1,
        staticResult: 'NO.498，NO.326，NO.332'
    }, {
        name: "热水器",
        quota: 1,
        staticResult: 'NO.498，NO.326，NO.332'
    }],
    [{
        name: "高尔夫推杆练习器",
        quota: 1,
        staticResult: 'NO.200，NO.300'
    }, {
        name: "TZ舞蹈半年卡",
        quota: 1,
        staticResult: 'NO.400'
    }],
    [{
        name: "一年物业费",
        quota: 1,
        staticResult: 'NO.100'
    }, {
        name: "TZ舞蹈年卡",
        quota: 1,
        staticResult: 'NO.020'
    }], [{
        name: "盏计花旗参",
        quota: 1,
        staticResult: 'NO.320'
    }, {
        name: "家有健康特惠家庭医生套餐",
        quota: 1,
        staticResult: 'NO.104，NO.222'
    }]
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
            if (count > pool.length || $("#txtNum").val() <= 0) {
                // showDialog(`只能输入1${pool.length > 1 ? '~' + pool.length : ''}`);
                showDialog(`抽奖完成！`);
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
    var round = count;
    count++;
    $("#txtNum").val(round);
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

        var tempHtml = `<p><span class='title'>${e.name}</span></p>`;

        if (e.staticResult) {

            let staticResult = e.staticResult.split('，');
            staticResult = staticResult.map(e => {
                return e.split(/NO./i)[1];
            });
            // console.log(staticResult);
            tempHtml += `<p><span> ${staticResult.join(' ')} </span></p>`;
        }


        // $.each(randomPerson, function (i, person) {
        //     /* if (leaderArr.indexOf(person) > -1 && times == 1) {
        //         tempHtml += "<span><b>" + person + "</b></span>";
        //     }
        //     else {
        //         tempHtml += "<span>" + person + "</span>";
        //     } */

        //     // tempHtml += `<span> ${person} </span>`;
        //     tempHtml += `<span> ${e.staticResult} </span>`;

        // });

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