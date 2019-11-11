const querystring = require('querystring')
const handleUserRouter = require('./src/router/user')

// session 数据
const SESSION_DATA = {}

const getCookieExpires = () => { 
    const d = Date.now()
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
    console.log('d.toGMTString() is ', d.toGMTString)
    return d.toGMTString()
}


const serverHandle = (req, res) => {
    // 设置返回格式 JSON
    res.setHeader('Content-type','application/json')
    const url = req.url
    req.path = url.split('?')[0]
    console.log("______");
    /// 解析query
    req.query = querystring.parse(url.split('?')[1])
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

     // 处理user路由
     const userResult = handleUserRouter(req, res)
     if(userResult) {
     
        userResult.then(data => {
            console.log("data")
            console.log(data)
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



