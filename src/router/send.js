var request = require('request');

const schedule = require('node-schedule');
const {getFullTime} = require('../utils/utils')

const dayloves = require('../config/daylove.json')
var cacheTime = []
var url="https://oapi.dingtalk.com/robot/send?access_token=96db2e7f99edd0abbe84f7be6a716e6fe6ad1f2de038be544f110ad150c3bebc";

function httprequest(content, name){
    request({
        url: url,
        method: "POST",
        json: true,
        headers: {
            "content-type": "application/json",
        },
        body: requestData(content,name)
    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body) // 请求成功的处理逻辑
        }
    });
};


 function requestData(content,name) {
   var names = name || ''
   var mobile =  '13221063706';
   if(names.length > 1) {
    mobile = '15658837983'
   }
    return {  
        msgtype: "markdown",  
        markdown:{"text":content+'@'+mobile,"title":"[红包来了]"},
        time: new Date().getTime(),
        access_token: "96db2e7f99edd0abbe84f7be6a716e6fe6ad1f2de038be544f110ad150c3bebc",
        at: {
            "atMobiles":[
                mobile
            ],
            "isAtAll":false
        }
    }
};


function scheduleCronstyle(time,callback) {
    console.log("________*****定时器加载****______");
    schedule.scheduleJob(time,()=>{
        console.log("________*****定时器执行****______"+getFullTime());
        callback();
    }); 
}


function getIndex() {
  var tmp = Math.round((Math.random()*dayloves.length-1))
  if (cacheTime.indexOf(tmp)) {
    getIndex();
  }

  return tmp;
}

 //7点30分30秒定时执行一次:
scheduleCronstyle('30 30 7 * * *',()=>{
    httprequest("早上好,老婆大人！");
});


/// 22点30分30秒
scheduleCronstyle('30 30 22 * * *',()=>{
    httprequest("晚安,老婆大人!"+ dayloves[getIndex()]);
    console.log(cacheTime);
});



module.exports = httprequest;


 

