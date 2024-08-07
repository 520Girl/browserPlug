import setting from '../options/setting';
import {tool,menu,devTool} from './handleTools.js';
import {inject} from './injectScript.js';

let FeJson = {
    notifyTimeoutId: -1
};

// 黑名单页面
let blacklist = [
    /^https:\/\/chrome\.google\.com/
];

/**
 * 动态运行工具
 * @param configs
 * @config tool 工具名称
 * @config page 页面地址 ，当存在这个时，直接跳转到这个页面即可
 * @config withContent 默认携带的内容
 * @config query 请求参数
 * @config noPage 无页面模式
 * @constructor
 */
chrome.DynamicToolRunner = async function (configs) {
    console.log('configs',configs);
    const {tool,page} = configs;
    let withContent = configs.withContent;
    let activeTab = null;
    let query = configs.query;

    // 如果是noPage模式，则表名只完成content-script的工作，直接发送命令即可
    if (configs.noPage) {
        let toolFunc = tool.replace(/-/g, '');
        chrome.tabs.query({active: true, currentWindow: true}, tabs => {
            let found = tabs.some(tab => {
                if (/^(http(s)?|file):\/\//.test(tab.url) && blacklist.every(reg => !reg.test(tab.url))) {
                    let codes = `window['${toolFunc}NoPage'] && window['${toolFunc}NoPage'](${JSON.stringify(tab)});`;
                    inject(tab.id, {js: codes});
                    return true;
                }
                return false;
            });
            if (!found) {
                notifyText({
                    message: '抱歉，此工具无法在当前页面使用！'
                });
            }
        });
        return;
    }

    chrome.tabs.query({currentWindow: true}, function (tabs) {

        activeTab = tabs.filter(tab => tab.active)[0];
        console.log('activeTab',tabs);
        setting.getOptions('FORBID_OPEN_IN_NEW_TAB').then((opts)=>{
            console.log('opts',opts);
            let isOpened = false;
            let tabId;

            //禁止在新选项卡中打开 false:允许 true:禁止 找相同页面打开
            if (opts === true) {
                let reg = tool ? new RegExp("^chrome.*\\/" + tool + "\\/index.html" + (query ? "\\?" + query : '') + "$", "i") : new RegExp("^chrome.*\\/tabs/" + page + ".html" + (query ? "\\?" + query : '') + "$", "i")
                console.log('reg',reg);
                for (let i = 0, len = tabs.length; i < len; i++) {
                    if (reg.test(tabs[i].url)) {
                        isOpened = true;
                        tabId = tabs[i].id;
                        break;
                    }
                }
            }

            if (!isOpened) {
                chrome.tabs.create({
                    url: tool ?  `/${tool}/index.html` + (query ? "?" + query : '') : `/tabs/${page}.html` + (query ? "?" + query : ''),
                    active: true
                }).then(tab => { FeJson[tab.id] = { content: withContent }; });
            } else {
                chrome.tabs.update(tabId, {highlighted: true}).then(tab => {
                    FeJson[tab.id] = { content: withContent };
                    chrome.tabs.reload(tabId);
                });
            }
        })

    });
};


/**
 * 插件图标点击后的默认动作
 * @param request
 * @param sender
 * @param callback
 */
let browserActionClickedHandler = function (request, sender, callback) {
    chrome.DynamicToolRunner({
        tool: MSG_TYPE.JSON_FORMAT
    });
};
/**
 * 文本格式，可以设置一个图标和标题
 * @param {Object} options
 * @config {string} type notification的类型，可选值：html、text
 * @config {string} icon 图标
 * @config {string} title 标题
 * @config {string} message 内容
 */
let notifyText = function (options) {
    let notifyId = 'FeJson-notify-id';

    clearTimeout(FeJson.notifyTimeoutId);
    if (options.closeImmediately) {
        return chrome.notifications.clear(notifyId);
    }

    if (!options.icon) {
        options.icon = chrome.runtime.getManifest().icons[48];
    }
    if (!options.title) {
        options.title = "温馨提示";
    }
    chrome.notifications.create(notifyId, {
        type: 'basic',
        title: options.title,
        iconUrl: chrome.runtime.getURL(options.icon),
        message: options.message
    });
    FeJson.notifyTimeoutId = setTimeout(() => {
        chrome.notifications.clear(notifyId);
    }, parseInt(options.autoClose || 2000, 10));

};


// 像页面注入css脚本
let _injectContentCss = function(tabId,toolName,isDevTool){
    // if(isDevTool){
    //     Awesome.getContentScript(toolName, true)
    //         .then(css => {
    //             inject(tabId, { css })
    //         });
    // }else{
    //     inject(tabId, {files: [`${toolName}/content-script.css`]});
    // }
};


// 往当前页面直接注入脚本，不再使用content-script的配置了
// 这里就是自动注入所有插件的脚本, 初始化使用
let _injectContentScripts = function (tabId) {

    // 获取全部的工具列表
    tool.getAllTools().then(tools => {
        // 注入js 需要确认哪些 是需要自动注入的
        // 需要是 noPage 为true, 并且contentScriptJs为 true 采用自动注入的方式，
        // _devTool 为true 自己开发的， false 为预装的
        let jsTools = Object.keys(tools)
            .filter(tool => !tools[tool]._devTool
                && tools[tool].contentScriptJs && tools[tool].noPage );
        let jsCodes = [];
        // 创建的时候是 将 方法挂在到window上，这里直接调用方法 window.tengxunvideoContentScript=function(){}
        jsTools.forEach((t, i) => {
            let func = `window['${t}ContentScript']`;
            jsCodes.push(`(()=>{let func=${func};func&&func();})()`);
        });
        let jsFiles = jsTools.map(tool => `${tool}/content-script.js`);
        inject(tabId, {files: jsFiles,js: jsCodes.join(';')});
    })
};

/**
 * 更新browser action的点击动作
 * @param action install / upgrade / offload
 * @param showTips 是否notify
 * @param menuOnly 只管理Menu
 * @private
 */
let _updateBrowserAction = function (action, showTips, menuOnly) {
    if (!menuOnly) {
        let tips = 0
        // 如果有安装过工具，则显示Popup模式
        tool.getAllTools().then(tools => {
            let status = false
            Object.keys(tools).some(key=>{
                if (tools[key] && tools[key].installed){
                    tips+=1
                    chrome.action.setPopup({ popup: '/popup.html' });
                    status = true
                }
            })
            // icon 下的数字显示 ，有多个个插件 和 应用
            _animateTips(String(tips))
           if (!status) {
                // 删除popup page
              chrome.action.setPopup({ popup: '' });
               chrome.action.onClicked.addListener(()=>{
                 chrome.tabs.create({ url:'https://'+setting.optionsDefault.DEV_REQUEST_URL});
               });
            }
        });

        // if (action === 'offload') {
        //     _animateTips('-1');
        // } else if(!!action) {
        //     _animateTips('+1');
        // }
    } else {
        console.log('menuOnly 进来了 重绘菜单', action);
        //! 重绘菜单
        menu.rebuild();
    }

    if (showTips) {
        console.log('showTips 进来了', action);
        let actionTxt = '';
        switch (action) {
            case 'install':
                actionTxt = '工具已「安装」成功，并已添加到弹出下拉列表，点击FeHelper图标可正常使用！';
                break;
            case 'offload':
                actionTxt = '工具已「卸载」成功，并已从弹出下拉列表中移除！';
                break;
            case 'menu-install':
                actionTxt = '已将此工具快捷方式加入到「右键菜单」中！';
                break;
            case 'menu-offload':
                actionTxt = '已将此工具快捷方式从「右键菜单」中移除！';
                break;
            default:
                actionTxt = '恭喜，操作成功！';
        }
        notifyText({
            message: actionTxt,
            autoClose: 2500
        });
    }
};

/**
 * 初始化时使用，注入本地脚本，预习处理需要注入的js和css
 * @param params
 * @config {number} tabId 页面id, tabId 是通过 每次打开tab标签都会生成一个唯一的id， 通过
 * chrome.tabs.onUpdated.addListener 方法监听并注入到页面一个 window.navai_vip_tabId = tabId;,然后通过 contents scripts
 * 发送消息给 background.js 处理
 * @config url 当前页面的url，也是需要content-script 消息发送，达到指定页面注入脚本的目的
 * @private
 */
let _prepareInject = function (params) {
    return tool.getAllTools(true).then(tools => {
        // 遍历出需要注入的 插件
        let url = params.url;
        Object.keys(tools).forEach(toolName => {
            //? 判断是否需要注入js 和 css
            if (tools[toolName].contentScriptJs && tools[toolName].installed || tools[toolName].contentScriptCss && tools[toolName].installed ) {
                const tool = tools[toolName];
                devTool.syncInjectScript(params.tabId,url,tool,toolName)
            }
        })
    })
}

/**
 * // 动态注入脚本 将新创建的脚本注入到页面中
 * @param tabId 为注入页面的id
 * @param url 为当前
 * @param tool
 * @private
 */
let _ingintContentScripts = function (tabId,url,tool) {
    devTool.syncInjectScript(tabId,url,tool)
}

/**
 * 发送网络请求 primise
 * @param url 请求的url
 * @param request
 * @config method 请求类型
 * @config data 请求参数
 * @config headers 请求头
 * @private
 */
const _sendRequestFetch=(url,request={method:'GET',data:null,headers:new Headers({'Accept':'application/json'})}) => {
    return new Promise((resolve, reject) => {
        fetch(url, request)
            .then(response => response.json())
            .then(data => {
                resolve(data);
            })
            .catch(error => {
               reject(error)
            })
    })

}
// _sendRequestFetch('https://navai.vip/api/common/search?data=55')
/**
 * 动态在icon处显示提示
 * @param tips
 * @param status true 长时间显示  false 短时间显示
 * @private
 */
let _animateTips = (tips) => {
        if (tips === '0') {
            chrome.action.setBadgeText({text: ''});
            return;
        }
        chrome.action.setBadgeText({text: tips});
        tips = parseInt(tips);
        if (tips <= 2) {
            chrome.action.setBadgeBackgroundColor({color: 'rgba(104,252,0,0.63)'});
        }else if(tips <= 3){chrome.action.setBadgeBackgroundColor({color: 'rgba(1,179,255,0.55)'});}
        else if(tips <= 4){chrome.action.setBadgeBackgroundColor({color: 'rgba(255,237,0,0.54)'});}
        else if(tips <= 5){ chrome.action.setBadgeBackgroundColor({color: 'rgba(255,135,0,0.56)'});}
}

// 捕获当前页面可视区域
let _captureVisibleTab = function (callback) {
    chrome.tabs.captureVisibleTab(null, {format: 'png', quality: 100}, dataUrl => {
        // 下载图像
        chrome.downloads.download({
            url: dataUrl,
            filename: "captured_image.png",
            saveAs: true
        });
        callback && callback(uri);
    });
};
/**
 * 监听搜索页面的变化
 * 需要在manifest.json中配置omnibox关键字 当输入指定关键字时，触发onInputChanged事件，
 * 并在onInputEntered事件中执行搜索操作
 */

let _addScreenShotByPages = function () {
    chrome.omnibox.setDefaultSuggestion({
        description: "有惊喜，快来体验吧！search 1024 || 91"
    });
    //当输入关键字时，触发onInputChanged事件
    chrome.omnibox.onInputChanged.addListener((text,suggest) => {
        // chrome.tabs.create({ url: newURL+'#q='+text });
        console.log('用户输入的搜索内容：', text);
        chrome.history.search({text: text, maxResults: 10}, async function(data) {
            console.log('用户的浏览历史记录：', data);
            // id：历史记录条目的唯一标识符。
            // lastVisitTime：最后访问时间的时间戳。
            // title：页面标题。
            // typedCount：用户通过直接输入地址访问此页面的次数。
            // url：页面的 URL 地址。
            // visitCount：此页面被访问的总次数。
            // 在这里执行对浏览历史记录的操作
            if (/ai|AI|导航|chatGPT|chatgpt|尊享/.test(text)) {
                // 提供关于浏览器书签的搜索建议 content 链接，description 下拉框显示内容
                const suggestArr = await _sendRequestFetch(`https://navai.vip/api/common/search?data=${text}?type=plugin`)
                console.log('suggestArr----------------=====',suggestArr)
                let arr = []
                if (suggestArr.status === 1){
                    arr = suggestArr.common.content.map(item => {
                        return {content:`${item.url}?title=${item.title}`,description:item.title}
                    })
                }
                suggest(arr);
            } else if (/1024/.test(text)){
                suggest([
                    {content: 'https://www.navai.vip', description:'尊享ai导航'},
                    { content: 'https://www.colamanga.com/', description: 'one漫画' },
                    { content: 'https://metaso.cn/', description: '秘塔搜索' },
                ]);
            }else if(/91/.test(text)){
                suggest([
                    {content: 'www.haijiao.com', description:'海角社区'},
                    { content: 'https://navai.vip/#/favorites/5841945?type=plugin', description: '有色导航,91' }
                ]);
            }else{
                // 提供关于浏览器历史记录的搜索建议
                let arr = data.map(item => {
                    return {content:item.url,description:item.title}
                })
                // 查看统计数据权限是否开启
                let page_search_count = setting.getOptions('page_search_count')
                if (page_search_count){
                    //! 统计数据
                }
                suggest(arr)
            }
        });
    });
    //当用户选择搜索建议时，触发onInputEntered事件
    chrome.omnibox.onInputEntered.addListener((text) => {
        chrome.tabs.create({ url: text });
    });
}

/**
 * 检测快捷键是否按下
 * @param params
 *
 *
 */
const _detectShortcutKey = (params) => {
    // const {key, ctrlKey, altKey, shiftKey} = params;
    // const shortcutKey = setting.getOptions('shortcut_key');

        chrome.commands.onCommand.addListener((command) => {
            if (command === 'capture_visible_page'){
                setting.getOptions('capture_visible_page').then(tools => {
                    _captureVisibleTab()
                })
            }
        });


}

/**
 * 接收来自content_scripts发来的消息
 */
let _addExtensionListener = function () {

    _updateBrowserAction();

    chrome.runtime.onMessage.addListener(function (request, sender, callback) {
        // 如果发生了错误，就啥都别干了
        if (chrome.runtime.lastError) {
            console.log('chrome.runtime.lastError:',chrome.runtime.lastError);
            return true;
        }
        switch (request.type){
            // 打开动态工具页面
            case setting.optionsDefault.OPEN_DYNAMIC_TOOL:
                chrome.DynamicToolRunner(request);
                callback && callback();
                break;
             // 动态安装工具或者卸载工具，需要更新browserAction
            case setting.optionsDefault.DYNAMIC_TOOL_INSTALL_OR_OFFLOAD:
                _updateBrowserAction(request.action, request.showTips, request.menuOnly);
                callback && callback();
                break;
            case 'request-monkey-start':
                console.log('收到来自content_scripts的消息 测试动态注入脚本', request);
                // _prepareInject(request.params);
                // inject(sender.tab.id, {allFrames:true, js: `console.log(' %c 尊享导航2' + 'AI工具，AI应用，AI漫画，AI视频,AI新闻' + ' 导航地址 By 一为 %c https://navai.vip/', 'color: #ffffff; background: #f1404b; padding:5px 0;', 'background: #030307; padding:5px 0;')` });
                break;
            case 'sync-Badge-Text': //更新 icon 数字
               _animateTips(request.tips);
                // _prepareInject(request.params);
                // inject(sender.tab.id, {allFrames:true, js: `console.log(' %c 尊享导航2' + 'AI工具，AI应用，AI漫画，AI视频,AI新闻' + ' 导航地址 By 一为 %c https://navai.vip/', 'color: #ffffff; background: #f1404b; padding:5px 0;', 'background: #030307; padding:5px 0;')` });
                break;
            case 'sync-content-scripts': // 动态新创建的注入脚本
                console.log('收到来自content_scripts的消息 动态新创建的注入脚本 sync-content-scripts', request);
                _ingintContentScripts(request.tabId,request.url,request.tool)
                // _prepareInject(request.params);
                // inject(sender.tab.id, {allFrames:true, js: `console.log(' %c 尊享导航2' + 'AI工具，AI应用，AI漫画，AI视频,AI新闻' + ' 导航地址 By 一为 %c https://navai.vip/', 'color: #ffffff; background: #f1404b; padding:5px 0;', 'background: #030307; padding:5px 0;')` });
                break;
            // 截屏
            case 'CAPTURE_VISIBLE_PAGE':
                _captureVisibleTab(callback);
                break;
            // 任何事件，都可以通过这个钩子来完成
            case setting.optionsDefault.DYNAMIC_ANY_THING:
                switch(request.thing){
                    case 'videoDownload':
                        _sendRequestFetch(request.params.url,request.params.options).then(data => {
                            console.log('----------videoDownload background 获取到值-------------',data)
                            callback && callback(data);
                           return true;
                        })
                        return true;
                    case 'save-options':
                        notifyText({
                            message: '配置修改已生效，请继续使用!',
                            autoClose: 2000
                        });
                        break;
                    case 'request-jsonformat-options':
                        Awesome.StorageMgr.get(request.params).then(result => {
                            Object.keys(result).forEach(key => {
                                if (['MAX_JSON_KEYS_NUMBER', 'JSON_FORMAT_THEME'].includes(key)) {
                                    result[key] = parseInt(result[key]);
                                } else {
                                    result[key] = (result[key] !== 'false');
                                }
                            });
                            callback && callback(result);
                        });
                        return true; // 这个返回true是非常重要的！！！要不然callback会拿不到结果
                    case 'save-jsonformat-options':
                        Awesome.StorageMgr.set(request.params).then(() => {
                            callback && callback();
                        });
                        return true;
                    case 'toggle-jsonformat-options':
                        Awesome.StorageMgr.get('JSON_TOOL_BAR_ALWAYS_SHOW').then(result => {
                            let show = result !== false;
                            Awesome.StorageMgr.set('JSON_TOOL_BAR_ALWAYS_SHOW',!show).then(() => {
                                callback && callback(!show);
                            });
                        });
                        return true; // 这个返回true是非常重要的！！！要不然callback会拿不到结果
                    case 'code-beautify':
                        _codeBeautify(request.params);
                        break;
                    case 'close-beautify':
                        Awesome.StorageMgr.set('JS_CSS_PAGE_BEAUTIFY',0);
                        break;
                    case 'qr-decode':
                        chrome.DynamicToolRunner({
                            withContent: request.params.uri,
                            page: 'qr-code',
                            query: `mode=decode`
                        });
                        break;
                    case 'request-page-content':
                        request.params = FeJson[request.tabId];
                        delete FeJson[request.tabId];
                        break;
                    case 'set-page-timing-data':
                        chrome.DynamicToolRunner({
                            tool: 'page-timing',
                            withContent: request.wpoInfo
                        });
                        break;
                    case 'color-picker-capture':
                        _colorPickerCapture(request.params);
                        break;
                    case 'add-screen-shot-by-pages':
                        _addScreenShotByPages(request.params,callback);
                        return true;
                    case 'page-screenshot-done':
                        _showScreenShotResult(request.params);
                        break;
                    case 'request-monkey-start':
                        Monkey.start(request.params);
                        break;
                    case 'inject-content-css':
                        _injectContentCss(sender.tab.id,request.tool,!!request.devTool);
                        break;
                }
                callback && callback(request.params);
                break;
            default:
                callback && callback();
                break;
        }
        return true;
    });


    // 每开一个窗口，都向内容脚本注入一个js，绑定tabId
    chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
        if (String(changeInfo.status).toLowerCase() === "complete") {
            // 动态注入脚本

            if(/^(http(s)?|file):\/\//.test(tab.url) && blacklist.every(reg => !reg.test(tab.url))){
                console.log('动态注入脚本==================',tabId,changeInfo,tab)
                _prepareInject({tabId,url:tab.url})

            }



            // chrome.scripting
            //     .registerContentScripts([{
            //         id: "session-script",
            //         js: ["content.js"],
            //         persistAcrossSessions: false,
            //         matches: ["*://navai.vip/*"],
            //         runAt: "document_start",
            //     }])
            //     .then(() => console.log("成功注入 registration complete"))
            //     .catch((err) => console.warn("注入失败", err))
            // if(/^(http(s)?|file):\/\//.test(tab.url) && blacklist.every(reg => !reg.test(tab.url))){
            //     console.log('动态注入脚本',tabId,changeInfo,tab)
            //     inject(tabId, { js: `window.__FH_TAB_ID__=${tabId};` });
            //     _injectContentScripts(tabId);
            // }
        }
    });

    // 安装与更新
    chrome.runtime.onInstalled.addListener(({reason, previousVersion}) => {
        switch (reason) {
            case 'install':
                chrome.runtime.openOptionsPage();
                break;
            case 'update':
                notifyText({
                    message: `恭喜，插件已更新至最新版本 ${previousVersion}！！`,
                    autoClose: 5000
                });
                break;
        }
    });
    // 卸载
    chrome.runtime.setUninstallURL(`https://${setting.optionsDefault.DEV_REQUEST_URL}/`);

    // 监听小图标的右键点击事件
    chrome.action.onClicked.addListener(function(tab) {
        // 在此处编写右键点击小图标时要执行的操作
        console.log('右键点击小图标',tab);

        // 例如，可以执行一些操作，或者在当前标签页执行内容脚本

        chrome.tabs.executeScript({
            code: 'console.log("Right-click on the extension icon")'
        });
    });

    _addScreenShotByPages()

    // 监听快捷键
    _detectShortcutKey()
};


/**
 * 检查插件更新
 * @private
 */
let _checkUpdate = function () {
    setTimeout(() => {
        chrome.runtime.requestUpdateCheck((status) => {
            if (status === "update_available") {
                chrome.runtime.reload();
            }
        });
    }, 1000 * 30);
};

// 初始化设置
let _init = async function(){
    // 工具初始化
    await tool.init();
    // 配置文件更新
    await setting.initOptions()
    // 检测插件是否有更新
    _checkUpdate()
    //   监听来自content_scripts的消息
    await _addExtensionListener()
    // 绘制菜单
    await menu.rebuild()
    // 绘制工具栏
}
_init()
