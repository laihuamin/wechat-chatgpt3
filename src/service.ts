import http from 'http';
import url from 'url';
import { sendMessage } from './chatgpt.js';

// 创建http server，并传入回调函数:
var server = http.createServer(async function (request, response) {
    console.log(request.method + ': ' + request.url);
    const query = url.parse(request.url + '', true).query;
    console.log(query.message, '>>>>query.message');
    let message = 'has wrong'
    if(query.message) {
      message = await sendMessage(query.message + '')
    }
    console.log(message, '>>>>message')
    // 将HTTP响应200写入response, 同时设置Content-Type: text/html:
    response.writeHead(200, {
      'Content-Type': 'text/html'
    });
    // 将HTTP响应的HTML内容写入response:
    response.end(message);
});

// 让服务器监听8080端口:
server.listen(80);
console.log('listening')