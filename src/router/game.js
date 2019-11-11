const {SuccessModel, ErrorModel} = require('../model/resModel')


const datas = ["莫听穿林打叶声，何妨吟啸且徐行。竹杖芒鞋轻胜马，谁怕？一蓑烟雨任平生。\n 料峭春风吹酒醒，微冷，山头斜照却相迎。回首向来萧瑟处，归去，也无风雨也无晴。","伤情最是晚凉天，憔悴斯人不堪怜。\n 邀酒摧肠三杯醉，寻香惊梦五更寒。 \n 钗头凤斜卿有泪，荼蘼花了我无缘。\n 小楼寂寞新雨月，也难如钩也难圆。 ", 
"十年生死两茫茫，不思量，自难忘。千里孤坟，无处话凄凉。纵使相逢应不识，尘满面，鬓如霜。\n 夜来幽梦忽还乡，小轩窗，正梳妆。相顾无言，惟有泪千行。料得年年肠断处，明月夜，短松冈。","美女妖且闲,\n采桑岐路间。\n柔条纷冉冉,\n落叶何翩翩。\n"]
const handleDingRouter = (req, res) => {
   if(req.path == '/api/game') {

   
    return new Promise((resolve, reject) => {
       resolve(datas[Math.round((Math.random()*3))]);
    });
   }


}

module.exports = handleDingRouter
