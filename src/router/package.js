
const httprequest = require('./send')

const datas = ["莫听穿林打叶声，何妨吟啸且徐行。竹杖芒鞋轻胜马，谁怕？一蓑烟雨任平生。\n 料峭春风吹酒醒，微冷，山头斜照却相迎。回首向来萧瑟处，归去，也无风雨也无晴。","伤情最是晚凉天，憔悴斯人不堪怜。\n 邀酒摧肠三杯醉，寻香惊梦五更寒。 \n 钗头凤斜卿有泪，荼蘼花了我无缘。\n 小楼寂寞新雨月，也难如钩也难圆。 ", 
"十年生死两茫茫，不思量，自难忘。千里孤坟，无处话凄凉。纵使相逢应不识，尘满面，鬓如霜。\n 夜来幽梦忽还乡，小轩窗，正梳妆。相顾无言，惟有泪千行。料得年年肠断处，明月夜，短松冈。","美女妖且闲,\n采桑岐路间。\n柔条纷冉冉,\n落叶何翩翩。\n"]

const handlePackageRouter = (req,res) => {

    if(req.path == '/api/package') {

     if(req.method == "POST") {


            //创建空字符叠加数据片段
    var data = '';

    //2.注册data事件接收数据（每当收到一段表单提交的数据，该方法会执行一次）
    req.on('data', function (chunk) {
        // chunk 默认是一个二进制数据，和 data 拼接会自动 toString
        data += chunk;
    });

    // 3.当接收表单提交的数据完毕之后，就可以进一步处理了
    //注册end事件，所有数据接收完成会执行一次该方法
    req.on('end', function () {

        //（1）.对url进行解码（url会对中文进行编码）
        data = decodeURI(data);
        console.log('__________**********__________');
        console.log(data);

        /**post请求参数不能使用url模块解析，因为他不是一个url，而是一个请求体对象 */

        //（2）.使用querystring对url进行反序列化（解析url将&和=拆分成键值对），得到一个对象
        //querystring是nodejs内置的一个专用于处理url的模块，API只有四个，详情见nodejs官方文档
        // var dataObject = querystring.parse(data);
        // console.log(dataObject);
        httprequest(data.toString(),'lv');
        
         res.end(
         JSON.stringify(datas[Math.round((Math.random()*3))]));
    })
     } else {
        console.log('__________****打包触发操作******__________');
        
        httprequest("打包信息:",'lv');
        return new Promise((resolve, reject) => {
            resolve(datas[Math.round((Math.random()*3))]);
         });
     }

    }

}

module.exports = handlePackageRouter;