// const {LoginClick} = require('../controller/user')
const {SuccessModel, ErrorModel} = require('../model/resModel')




const handleUserRouter = (req, res)=> {
   
    const method = req.method
    console.log(method)
    if(method === "GET" && req.path === '/api/user'){
    //   const {username, password} = req.body
    //   const loginResult = LoginClick(username,password)

    //   if(loginResult){
  
     return new Promise((resolve,reject) => {
        resolve("hi,你好!欢迎来到长三角");
     });
         
    //   return loginResult.then(data => {
    //       if(data.username){
    //        req.session.username = data.username
    //        req.session.realname = data.realName

    //         return new SuccessModel(data)
    //       }
  
    //       return new ErrorModel(登录失败);
    //   })
    // }   
    }

 
 }
 
 module.exports = handleUserRouter
 