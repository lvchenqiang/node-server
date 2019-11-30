var request = require('request');

const schedule = require('node-schedule');
const {getFullTime} = require('../utils/utils')

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
   if(names.length >= 0) {
    mobile = '15658837983'
   }
    return {  
        msgtype: "text",  
        text:{"content":content+'@'+mobile},
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

const  scheduleCronstyle = ()=>{
    console.log("________*****定时器加载****______");
  //每分钟的第30秒定时执行一次:
    schedule.scheduleJob('30 1 8 * * *',()=>{
        console.log("________*****定时器执行****______"+getFullTime());
        httprequest("早上好,老婆大人！");
    }); 
}

scheduleCronstyle();

module.exports = httprequest;


 

