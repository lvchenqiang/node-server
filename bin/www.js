const http = require('http')

const PORT = 9090
const serverHandle = require('../app')

const server = http.createServer(serverHandle)

server.listen(PORT,'0.0.0.0',function() {
    console.log('Web服务器开始监听9090端口')
})
