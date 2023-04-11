import http from 'http';
import url from 'url';
import { sendMessage } from './chatgpt.js';

// 创建http server，并传入回调函数:
var server = http.createServer(async function (request, response) {
    console.log(request.method + ': ' + request.url);
    const urlInfo = url.parse(request.url + '', true);
    const query:any = urlInfo.query;
    let message = 'has wrong'
    if(query.message && urlInfo.pathname === '/liangyugpt') {
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

server.listen(process.env.PORT);
// server.listen(80);
console.log('listening')