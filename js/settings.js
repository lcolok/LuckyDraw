// var allPerson = "蔡国瑜;曹正一;曾隆海;曾耀衡;陈观斌;陈军;陈军俊;陈倩雯;陈毓新;崔惠海;戴锦霞;段斌;樊清华;方林;符运琼;付坤;付文静;付园园;龚小龙;古冬苗;古举标;官鑫;何若兵;洪俊凯;侯斌;侯莉;胡军;胡伟澎;胡晓;黄欢茂;黄玲;黄星心;黄泽辉;黄志博;蒋明;金矿;赖礼通;赖婷婷;兰方权;李成国;李国庆;李吉庆;李兰兰;李良;李鹏程;李胜康;李涛;李未波;李咸良;李小红;李鑫";
//抽奖人员名单

var num;
var arr = [];
for (var i = 1; i <= 300; i++) {
    if (i < 10) {
        num = '00' + i;
    } else if (i < 100) {
        num = '0' + i;
    } else {
        num + i;
    }
    arr.push('No.' + num);
}
var allPerson = arr;
console.log(allPerson);

var leaderArr = [];
//领导人员名单
/*注：这个不是黑幕，不会影响中奖率。
只是为了在第一次抽奖时，高亮领导的名字。
（刷新之后会重置）
如果不要高亮直接清空
*/

var setEmptyPerson = new Boolean();
setEmptyPerson = false //是否每次抽取后把人数框清空

var setAutoZoom = new Boolean();
setAutoZoom = true //是否开启自适应缩放