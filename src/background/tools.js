
/**
*         contentScriptJs: true, // 需要是 noPage 为true, 并且contentScriptJs为 true 采用自动注入的方式
 *         contentScriptCss: false,
 *         systemInstalled: false, // 是否系统默认安装
 *         installed:true, // 是否安装， 这个值和 systemInstalled 无关不冲突，但如果 systemInstalled 为 false时，installed 不生效
 *         type:'plug',
 *         _devTool:true, // 本地开发的工具
 *         menu: false, // 是否添加到右键菜单栏
 *         noPage: true, // 是否需要打开新页面,true为不需要打开新页面
 *         menuConfig: // 右键菜单栏配置
 *         devToolMap: // 本地开发的工具配置 其中 MScript 字段为数组，每一项为一个脚本文件，filename 为脚本文件名，content 为脚本内容
 *         当 MScript.content 表示该脚本内容为 文件代码，而不是字符串，路径问 static/tentxunVideo/content-script.js
 *         默认的content-script.js 为文件代码，其他脚本文件为字符串代码，就是需要另外添加的代码
 *         status = 1 表示通过文件的方式加载脚本，status = 0 表示通过代码的方式加载脚本 2 表示通过文件 和 代码的方式加载脚本
 *         updated: // 更新时间
 *
* */
export const toolMap = {
    'qr-code': {
        name: '二维码/解码',
        tips: '支持自定义颜色和icon的二维码生成器，并且支持多种模式的二维码解码，包括截图后粘贴解码',
        contentScriptJs: true,
        contentScriptCss: true,
        systemInstalled: false,
        installed:true,
        type:'app',
        menu: true,
        noPage: false,
        icon: 'https://s1.aigei.com/src/img/png/90/90b4765b3e284b48b479adea77eab72f.png?imageMogr2/auto-orient/thumbnail/!282x282r/gravity/Center/crop/282x282/quality/85/%7CimageView2/2/w/282&e=1735488000&token=P7S2Xpzfz11vAkASLTkfHN7Fw-oOZBecqeJaxypL:EESaehgkJudtMRXJKpxKpI9u5Bc=',
        menuConfig: [{
            icon: '▣',
            text: '二维码生成器',
            contexts: ['page', 'selection', 'editable', 'link', 'image'],
            onClick:(info,tab)=>{
                chrome.tabs.create({url:'/tabs/qr-code.html'});
            }
        }, {
            icon: '◈',
            text: '二维码解码器',
            contexts: ['image'],
            onClick:(info,tab)=>{
                chrome.tabs.create({url:'/tabs/qr-code.html?type=decode'});
            }
        }],
        devToolMap: {}
    },
    'tengxunVideo':{
        name: 'vip视频解析去广告',
        tips: '本服务提供各大视频平台的免费解析，涵盖优酷、爱奇艺、腾讯视频、B站等，支持PC及移动端，无需VIP会员即可观看，同时去除广告干扰。用户可自定义解析线路，选择站内或站外解析，并调整图标样式。我们承诺免费服务，并持续进行更新维护。',
        contentScriptJs: true,
        contentScriptCss: true,
        systemInstalled: false, // 是否系统默认安装， 开启状态还得开 installed 字段
        installed:true, // 是否安装，这个是后期安装的
        type:'plug',
        _devTool:false, // 本地开发的工具
        menu: true, // 是否添加到右键菜单栏
        noPage: true, // 是否需要打开新页面，这个是不打开
        icon: 'https://s1.aigei.com/src/img/png/73/736a9ce898ca4977af65890012f0b72a.png?imageView2/2/w/282&e=1735488000&token=P7S2Xpzfz11vAkASLTkfHN7Fw-oOZBecqeJaxypL:sSz-I2rHCm82vIiiCc8855XgatQ=',
        menuConfig: [{
            icon:'♠',
            text: '腾讯视频下载器',
            contexts: ['all']
        }],
        devToolMap:{ // key为id
            MName:'vip视频解析去广告',
            MPattern:["://.*.youku.com/.*","://.*.iqiyi.com/.*","://.*.iq.com/.*","://.*.le.com/.*","://v.qq.com/.*","://m.v.qq.com/.*","://3g.v.qq.com/.*","://.*.tudou.com/.*","://.*.mgtv.com/.*","://tv.sohu.com/.*","://.*.1905.com/.*","://film.sohu.com/*","://.*.bilibili.com/.*","://.*.pptv.com/.*"], // 匹配的网址
            MScript:[{filename:'content-script.js',content:"console.log(250564,'vip视频解析去广告')",status:2}],// 脚本
            MRefresh:0, // 刷新频率
            Nrequirejs:[], // 依赖库
        },
        updated:1638496000000 // 更新时间
    },
    'videoDownload':{
        name: '网站视频下载',
        tips: '西瓜|快手|抖音|youtube|bilibili视频下载',
        contentScriptJs: true, // 需要是 noPage 为true, 并且contentScriptJs为 true 采用自动注入的方式
        contentScriptCss: false,
        systemInstalled: false, // 是否系统默认安装
        installed:true, // 是否安装， 这个值和 systemInstalled 无关不冲突，但如果 systemInstalled 为 false时，installed 不生效
        type:'plug',
        _devTool:false, // 本地开发的工具
        menu: false, // 是否添加到右键菜单栏
        noPage: true, // 是否需要打开新页面
        icon: 'https://s1.aigei.com/src/img/png/73/736a9ce898ca4977af65890012f0b72a.png?imageView2/2/w/282&e=1735488000&token=P7S2Xpzfz11vAkASLTkfHN7Fw-oOZBecqeJaxypL:sSz-I2rHCm82vIiiCc8855XgatQ=',
        menuConfig: [{
            icon: '♣',
            text: '视频下载',
            contexts: ['page', 'selection', 'editable', 'link', 'image']
        }],
        devToolMap:{
            MName:'网站视频下载',
            MPattern:['://.*.douyin.com/.*', '://.*.kuaishou.com/.*','://.*.ixigua.com/.*','://.*.bilibili.com/.*','://.*.youtube.com/.*'], // 匹配的网址
            MScript:[
                {filename:'content-script.js',content:"console.log(250564,'网站视频下载')",status:2},
            ],// 脚本
            MRefresh:0, // 刷新频率
            Nrequirejs:[], // 依赖库
        },
        updated:1638496000000 // 更新时间
    },
    'musicDownload':{
        name: '音乐下载',
        tips: '喜马拉雅|酷狗|酷我|网易云音乐 下载',
        contentScriptJs: true, // 需要是 noPage 为true, 并且contentScriptJs为 true 采用自动注入的方式
        contentScriptCss: false,
        systemInstalled: false, // 是否系统默认安装
        installed:true, // 是否安装， 这个值和 systemInstalled 无关不冲突，但如果 systemInstalled 为 false时，installed 不生效
        type:'plug',
        _devTool:false, // 本地开发的工具
        menu: false, // 是否添加到右键菜单栏
        noPage: true, // 是否需要打开新页面
        icon: 'https://s1.aigei.com/src/img/png/73/736a9ce898ca4977af65890012f0b72a.png?imageView2/2/w/282&e=1735488000&token=P7S2Xpzfz11vAkASLTkfHN7Fw-oOZBecqeJaxypL:sSz-I2rHCm82vIiiCc8855XgatQ=',
        menuConfig: [{
            icon: '♣',
            text: '音乐下载',
            contexts: ['page', 'selection', 'editable', 'link', 'image']
        }],
        devToolMap:{
            MName:'音乐下载',
            MPattern:['://.*.kugou.com/.*', '://music.163.com/.*','://.*.kuwo.com/.*','://y.qq.com/.*','://.*.ximalaya.com/.*'], // 匹配的网址
            MScript:[
                {filename:'content-script.js',content:"console.log(250564,'音乐下载')",status:2},
            ],// 脚本
            MRefresh:0, // 刷新频率
            Nrequirejs:[], // 依赖库
        },
        updated:1638496000000 // 更新时间
    }
};

// 插件开发模板
export const devToolMap = {
    navaiVip:{ // key为id
        MName:'模板',
        MPattern:['https://www.baidu.com/*', 'http://v.qq.com/*'], // 匹配的网址
        MScript:[{filename:'content-script.js',content:''}],// 脚本
        MRefresh:0, // 刷新频率
        Nrequirejs:[], // 依赖库
    }}
console.log('conatet','')
export default {toolMap, devToolMap};
