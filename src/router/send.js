var request = require('request');

const schedule = require('node-schedule');

var url="https://oapi.dingtalk.com/robot/send?access_token=96db2e7f99edd0abbe84f7be6a716e6fe6ad1f2de038be544f110ad150c3bebc";

function httprequest(content){
    request({
        url: url,
        method: "POST",
        json: true,
        headers: {
            "content-type": "application/json",
        },
        body: requestData(content)
    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body) // 请求成功的处理逻辑
        }
    });
};


 function requestData(content) {
    return {  
        msgtype: "text",  
        text:{"content":content+'@13221063706'},
        time: new Date().getTime(),
        access_token: "96db2e7f99edd0abbe84f7be6a716e6fe6ad1f2de038be544f110ad150c3bebc",
        at: {
            "atMobiles":[
                "13221063706"
            ],
            "isAtAll":false
        }
    }
};

const  scheduleCronstyle = ()=>{
  //每分钟的第30秒定时执行一次:
    schedule.scheduleJob('30 1 * * * *',()=>{
        httprequest("早上好");
    }); 
}

scheduleCronstyle();

module.exports = httprequest;


 

