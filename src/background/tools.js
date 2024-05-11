
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
 *         devToolMap: // 本地开发的工具配置
 *         updated: // 更新时间
* */
export const toolMap = {
    'qr-code': {
        name: '二维码/解码',
        tips: '支持自定义颜色和icon的二维码生成器，并且支持多种模式的二维码解码，包括截图后粘贴解码',
        contentScriptJs: true,
        contentScriptCss: true,
        systemInstalled: true,
        installed:true,
        type:'app',
        menu: false,
        noPage: false,
        icon: 'https://s1.aigei.com/src/img/png/90/90b4765b3e284b48b479adea77eab72f.png?imageMogr2/auto-orient/thumbnail/!282x282r/gravity/Center/crop/282x282/quality/85/%7CimageView2/2/w/282&e=1735488000&token=P7S2Xpzfz11vAkASLTkfHN7Fw-oOZBecqeJaxypL:EESaehgkJudtMRXJKpxKpI9u5Bc=',
        menuConfig: [{
            icon: '▣',
            text: '二维码生成器',
            contexts: ['page', 'selection', 'editable', 'link', 'image']
        }, {
            icon: '◈',
            text: '二维码解码器',
            contexts: ['image']
        }],
        devToolMap: {}
    },
    'tengxunVideo':{
        name: '腾讯视频',
        tips: '支持在线免费观看腾讯vip视频',
        contentScriptJs: true,
        contentScriptCss: true,
        systemInstalled: true, // 是否系统默认安装， 开启状态还得开 installed 字段
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
            MName:'腾讯视频免费观看',
            MPattern:['https://www.baidu.com/*', 'http://v.qq.com/*','https://navai.vip/*'], // 匹配的网址
            MScript:[{filename:'content-script.js',content:"console.log(250564,'腾讯视频免费观看')"}],// 脚本
            MRefresh:0, // 刷新频率
            Nrequirejs:[], // 依赖库
        },
        updated:1638496000000 // 更新时间
    },
    'aiqiyiVideo':{
        name: '爱奇艺视频',
        tips: '支持在线免费观看爱奇艺vip视频',
        contentScriptJs: true, // 需要是 noPage 为true, 并且contentScriptJs为 true 采用自动注入的方式
        contentScriptCss: true,
        systemInstalled: false, // 是否系统默认安装
        installed:true, // 是否安装， 这个值和 systemInstalled 无关不冲突，但如果 systemInstalled 为 false时，installed 不生效
        type:'plug',
        _devTool:true, // 本地开发的工具
        menu: false, // 是否添加到右键菜单栏
        noPage: true, // 是否需要打开新页面
        icon: 'https://s1.aigei.com/src/img/png/73/736a9ce898ca4977af65890012f0b72a.png?imageView2/2/w/282&e=1735488000&token=P7S2Xpzfz11vAkASLTkfHN7Fw-oOZBecqeJaxypL:sSz-I2rHCm82vIiiCc8855XgatQ=',
        menuConfig: [{
            icon: '♣',
            text: '爱奇艺视频',
            contexts: ['page', 'selection', 'editable', 'link', 'image']
        }],
        devToolMap:{
            MName:'爱奇艺视频免费观看',
            MPattern:['https://www.iqiyi.com/*', 'http://v.qq.com/*','https://navai.vip/*'], // 匹配的网址
            MScript:[
                {filename:'content-script.js',content:"console.log(250564,'欢迎观看爱奇艺视频')"},
                {filename:'content-script.css',content:'.overflow-eclipse{font-size: 60px!important;}'}
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
