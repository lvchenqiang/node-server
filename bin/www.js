const http = require('http')

const PORT = 8080
const serverHandle = require('../app')

const server = http.createServer(serverHandle)

server.listen(PORT,'0.0.0.0',function() {
    console.log('Web服务器开始监听8080端口')
})
