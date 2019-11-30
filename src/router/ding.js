const womandata = require('../config/woman.json')
const mandata = require('../config/man.json')
const httprequest = require('./send')
const querystring = require('querystring')


const datas = ["莫听穿林打叶声，何妨吟啸且徐行。竹杖芒鞋轻胜马，谁怕？一蓑烟雨任平生。\n 料峭春风吹酒醒，微冷，山头斜照却相迎。回首向来萧瑟处，归去，也无风雨也无晴。","伤情最是晚凉天，憔悴斯人不堪怜。\n 邀酒摧肠三杯醉，寻香惊梦五更寒。 \n 钗头凤斜卿有泪，荼蘼花了我无缘。\n 小楼寂寞新雨月，也难如钩也难圆。 ", 
"十年生死两茫茫，不思量，自难忘。千里孤坟，无处话凄凉。纵使相逢应不识，尘满面，鬓如霜。\n 夜来幽梦忽还乡，小轩窗，正梳妆。相顾无言，惟有泪千行。料得年年肠断处，明月夜，短松冈。","美女妖且闲,\n采桑岐路间。\n柔条纷冉冉,\n落叶何翩翩。\n"]


const hellos = ['你好,美丽的姑娘','你好,可爱的小仙女','你好,漂亮的小姐姐','你好,老婆大人']
const handleDingRouter = (req, res) => {
   if(req.path == '/api/ding') {

     if(req.method == "POST") {
      var data = "";

    //2.注册data事件接收数据（每当收到一段表单提交的数据，该方法会执行一次）
    req.on('data',  chunk => {
      
        data += chunk;
    });

    // 3.当接收表单提交的数据完毕之后，就可以进一步处理了
    //注册end事件，所有数据接收完成会执行一次该方法
    req.on('end',  () => {
        //（1）.对url进行解码（url会对中文进行编码）
        data = decodeURI(data);

        /**post请求参数不能使用url模块解析，因为他不是一个url，而是一个请求体对象 */

        //（2）.使用querystring对url进行反序列化（解析url将&和=拆分成键值对），得到一个对象
        //querystring是nodejs内置的一个专用于处理url的模块，API只有四个，详情见nodejs官方文档
        console.log(data);
        console.log(typeof(data));

        let params = JSON.parse(data)
        console.log('******************************');
      //   let dataObject = querystring.parse(data);
        console.log(params);
        console.log(typeof(params));
        console.log(Object.getOwnPropertyNames(params))
        console.log('**************______________****************');
       
        if(params && params.text && params.text.content){
         
           var content = params.text.content.toString();
           if(isHello(content)) {

               if(params.senderNick && params.senderNick.indexOf('吕陈强') != -1) {
                  httprequest('你好, 吕陈强先生','lv');
               } else {
                  var index = Math.round((Math.random()*3))
                  var msg = hellos[index]
                 httprequest(msg)
               } 

           } else if(isGood(content)){
             if(params.senderNick &&  params.senderNick.indexOf('吕陈强') != -1) {
               var index = Math.round((Math.random()*mandata.length))
               var msg = mandata[index]
               httprequest(msg,'lv')
             } else {
               var index = Math.round((Math.random()*womandata.length))
               var msg = womandata[index]
               httprequest(msg)
             }
            
           }else {
              httprequest(content);
           }
        } else {
         console.log('———————————————空空空———————————————');
        }
        res.end(
         JSON.stringify(datas[Math.round((Math.random()*3))])
     )

    })

 

     } else {
        
        return new Promise((resolve, reject) => {
           resolve(datas[Math.round((Math.random()*3))]);
        });
     }
 
   }


}



function isHello(content) {
   return  (content.indexOf('你好') != -1 || content.indexOf('nihao') != -1 || content.indexOf('hi') != -1)
}

function isGood(content) {
return (content.indexOf('夸我')!=-1 || content.indexOf('赞我')!=-1 || content.indexOf('赞美我')!=-1);
}
module.exports = handleDingRouter
