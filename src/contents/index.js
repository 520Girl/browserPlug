console.log(' %c 尊享导航' + 'AI工具，AI应用，AI漫画，AI视频,AI新闻' + ' 导航地址 By 一为 %c https://navai.vip/', 'color: #ffffff; background: #f1404b; padding:5px 0;', 'background: #030307; padding:5px 0;')

chrome.runtime.onMessage.addListener(
     function(request, sender, sendResponse) {
     console.log(sender.tab ?
     "from a content script:" + sender.tab.url :
     "from the extension");

    console.log(request.greeting,'contents index.js的值');
     if (request.greeting === "hello")
     sendResponse({farewell: "goodbye"});
     }
    );
let userInputWorld = 'Hello World!';
// 从 Chrome 存储中获取用户输入的内容并添加到页面中
chrome.storage.local.get('userInput', (result) => {
    const userInput = result.userInput;
    userInputWorld = userInput;
    console.log('获取到值了谢谢！！',userInput)

        const element = document.createElement('div');
        element.textContent = 'console.log("输出胡内容")';
        document.body.appendChild(element);

});
//     import axios from 'axios';
// axios.get('https://navai.vip/api/slide?pre_page=5')
// .then((response)=>{
//
//     console.log('结果',response)
// })
// .catch((error)=>{
//     console.log('结果error',error)
// })