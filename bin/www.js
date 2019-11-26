const http = require('http')

const PORT = 80
const serverHandle = require('../app')

const server = http.createServer(serverHandle)

server.listen(PORT,'0.0.0.0',function() {
    console.log('Web服务器开始监听80端口')
})



