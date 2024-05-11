import setting from './setting'


function Format(time=new Date(),fmt='yyyyMMdd'){
    time = new Date(time)
    var o = {
        "M+": time.getMonth() + 1, //月份
        "d+": time.getDate(), //日
        "h+": time.getHours(), //小时
        "m+": time.getMinutes(), //分
        "s+": time.getSeconds(), //秒
        "q+": Math.floor((time.getMonth() + 3) / 3), //季度
        "S": time.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (time.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}


export const Tpl = (()=>{
return `// ==${setting.optionsDefault.DEV_REQUEST_URL}==
// @reminder        请不要删除这部分代码注释，这是脚本能正常工作的基本条件！当然，你可以按需修改这里的内容！
// @id              ${setting.optionsDefault.DEV_REQUEST_URL}_${Date.now()}_${parseInt(Math.random() * 20)}
// @name            ${setting.optionsDefault.DEV_REQUEST_URL}
// @url-pattern     ['${setting.optionsDefault.DEV_REQUEST_URL}','https://www.baidu.com/']
// @enable          false
// @require-js      ["https://cdn.bootcdn.net/ajax/libs/jquery/3.7.1/jquery.js"]
// @auto-refresh    5000
// @tips            脚本功能描述
// @updated         ${Format(new Date(), 'yyyy-MM-dd hh:mm:ss')}
// ==/${setting.optionsDefault.DEV_REQUEST_URL}==
console.log(' %c 尊享导航' + 'AI工具，AI应用，AI漫画，AI视频,AI新闻' + ' 导航地址 By 一为 %c https://navai.vip/', 'color: #ffffff; background: #f1404b; padding:5px 0;', 'background: #030307; padding:5px 0;')
`
})()

