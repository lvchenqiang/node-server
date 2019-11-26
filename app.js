const querystring = require('querystring')
const handleUserRouter = require('./src/router/user')
const handleDingRouter = require('./src/router/game')
const {getFullTime} = require('./src/utils/utils')
// session 数据
const SESSION_DATA = {}

const getCookieExpires = () => { 
    const d = Date.now()
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
    console.log('d.toGMTString() is ', d.toGMTString)
    return d.toGMTString()
}


/*
时间格式化
*/
  Date.prototype.Format = function (fmt) { //author: meizz
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
      }


const serverHandle = (req, res) => {
    // 设置返回格式 JSON
    res.setHeader('Content-type','application/json')
    const url = req.url
    req.path = url.split('?')[0]
    console.log("___************query****************___");
    /// 解析query
    req.query = querystring.parse(url.split('?')[1])
    console.log(req.query);
    console.log(getFullTime())
    console.log("___************query****************___");
    /// 解析 cookie
    const cookieStr = req.headers.cookie || ''
    req.cookie = {}

    cookieStr.split(';').forEach(item => {
        if(!item){
            return
        }
      
        const key = item.split('=')[0].trim()
        const value = item.split('=')[1].trim()
        req.cookie[key] = value
    });


    // 解析session
    let userId = req.cookie.userid
    let needSetCookie = false
    if(userId){
        if(!SESSION_DATA[userId]){
            SESSION_DATA[userId] = {}
        }
       
    }else
    {
        needSetCookie = true
        userId = `${Date.now()}_${Math.random()}`
    }
    req.session = SESSION_DATA[userId];
    getPostdata(req).then(postData => {

  
    
    const dingResult = handleDingRouter(req,res) 
    if (dingResult) {
        dingResult.then(data => {
            res.end(
                JSON.stringify(data)
            )
        })
        return;
    }
       // 处理user路由
    const userResult = handleUserRouter(req, res)
    if(userResult) {
    
        userResult.then(data => {
            // if(needSetCookie){
            //     res.setHeader('Set-cookie',`userid=${userId}; path=/; httponly; expires=${getCookieExpires()}`)
            // }
            res.end(
                JSON.stringify(data)
            )
        })
        
    return
    }





      // 未命中路由, 返回404
      res.writeHead(404,{"Content-type":"text/plain"})
      res.write("404 Not Found\n")



    }





    )





}


const getPostdata = (req) => {
    return new Promise((resolve,reject)=> {
        //   if(req.method !== "POST" || req.headers['Content-type'] != 'application/json') {
        //       resolve({})
        //       return
        //   }
        
          let postData = ''
          req.on('data', chunk => {
              postData += chunk.toString()
          })


          req.on('end', ()=>{
              if(!postData){
                resolve({})
                return  
              }

              resolve(JSON.stringify(postData))
          })

    })

}


module.exports = serverHandle;




