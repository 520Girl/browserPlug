import {storage} from './utils'
import {toolMap,devToolMap} from './tools'
import setting from "../options/setting"
import {inject} from "~background/injectScript";


/**
 * 管理工具安装情况 ，管理Menu的设置情况 toolMap
 *
 */
export const tool = (()=>{
    // 获取本地开发的插件 应用的列表配置，不包含代码，也拼接进来
    //@config status 是否需要返回代码字段，默认需要 为false
    const _getAllTools = async (status=false)=>{
        //todo 1.从本地存储中获取所有工具配置 ,key格式为'DEV_TOOL_MAP' 包括APP和插件 用type 区分
        //todo 2.如果本地存储中没有tools配置，则返回空对象,并且和默认配置合并
        try {
            const _tools = await storage().get(setting.optionsDefault.DEV_TOOL_MAP)
            const localTools = JSON.parse(_tools || "{}")
            console.log('%c 1.工具 获取本地工具APP PLUG', "color: #f26783; font-weight: bold;",localTools)
            Object.keys(toolMap).forEach(key=>{
                if (!key in localTools){
                    localTools[key] = toolMap[key]
                }
            })
            await storage().set(setting.optionsDefault.DEV_TOOL_MAP, JSON.stringify(localTools))
            // 传到页面上 有很多地方不需要用到代码字段所以删除
            if (status === false){
                Object.keys(localTools).forEach(key=>{
                    if (localTools[key].devToolMap){
                        delete localTools[key].devToolMap
                    }
                })
            }

            return localTools
        } catch (error) {
            console.error(error)
        }
        // 可进行排序---
    }

    /**
     * 检测工具是否已被成功安装
     * @param toolName 工具名称 和 菜单名称 相同
     * @param detectMenu 是否进一步检测Menu的设置情况
     * @returns {Promise}
     */
    const detectInstall =  (toolName, detectMenu = false)=>{
        let toolInstalled = false;
        storage().get(toolName).then(value => {

            // 系统预置的功能，是强制 installed 状态的,systemInstalled 为 true
            if (toolMap[toolName] && toolMap[toolName].systemInstalled && toolMap[toolName].installed){
                toolInstalled = true;
            }

            // 自己安裝的功能，是通过本地存储判断的
            if(toolMap[toolName] && !toolMap[toolName].systemInstalled && toolMap[toolName].installed){
                toolInstalled = true
            }

            // 检测菜单设置情况
            if (detectMenu && toolMap[toolName] && toolMap[toolName].menu){

                toolInstalled = true
            }
            return toolInstalled;
        })

    }

    /**
     * 安装/更新工具，支持显示安装进度
     * @param toolName
     * @param detectMenu Menu设置状态
     * @returns {Promise<any>}
     */
    const install = (toolName, detectMenu=false) => {
        return new Promise((resolve, reject) => {
            storage().get(setting.optionsDefault.DEV_TOOL_MAP).then(value=>{
                value = JSON.parse(value || "{}")
                if (detectMenu){
                    value[toolName].menu = true;

                }
                if (value && value[toolName] && !detectMenu){
                    value[toolName].installed = true;
                }
                storage().set(setting.optionsDefault.DEV_TOOL_MAP, JSON.stringify(value)).then(()=>{
                    return resolve();
                })
            })
        })
    }

    // 卸载工具
    const offLoad = (toolName) => {
        // 删除所有静态文件
        return new Promise((resolve, reject) => {
            storage().get(setting.optionsDefault.DEV_TOOL_MAP).then(value=>{
                value = JSON.parse(value || "{}")
                console.log('%c 卸载工具', "color: #f26783; font-weight: bold;",value,toolName)
                if (value && value[toolName]){
                    value[toolName].installed = false;
                    value[toolName].menu = false;
                    console.log('%c 卸载工具2', "color: #f26783; font-weight: bold;",value)
                    storage().set(setting.optionsDefault.DEV_TOOL_MAP, JSON.stringify(value))
                    resolve();
                }
            })
        })
    };

    // 初始化工具配置
    const init = () => {
        storage().set(setting.optionsDefault.DEV_TOOL_MAP, JSON.stringify(toolMap))
        console.log('%c 初始化工具配置', "color: #000000; font-weight: bold;",toolMap)
    }
    return{
        getAllTools: _getAllTools,
        offLoad,
        detectInstall,
        install,
        init,
    }
})()


/**
 * 管理右键菜单 管理
*/
export const menu = (() => {
    /**
     * 管理右键菜单
     * @param toolName
     * @param action 具体动作install/offload/get
     * @returns {Promise<any>}
     */
    const _menuMgr=(toolName, action)=>{
        switch (action) {
            case 'get':
                return storage().get(setting.optionsDefault.DEV_TOOL_MAP);
            case 'offload':
                // 必须用setItem模式，而不是removeItem，要处理 0/1/null三种结果
                console.log(toolName + ' 卸载成功！');
                return new Promise((resolve, reject) => {
                    storage().get(setting.optionsDefault.DEV_TOOL_MAP).then(value=>{
                        value = JSON.parse(value || "{}")
                        if (value && value[toolName]){
                            value[toolName].menu = false;
                            storage().set(setting.optionsDefault.DEV_TOOL_MAP, JSON.stringify(value)).then(()=>{
                                resolve(value[toolName]);
                            })
                        }
                    })
                })
            case 'install':
                console.log(toolName + ' 安装成功！');
                return new Promise((resolve, reject) => {
                    storage().get(setting.optionsDefault.DEV_TOOL_MAP).then(value=>{
                        value = JSON.parse(value || "{}")
                        if (value && value[toolName]){
                            value[toolName].menu = true;
                            storage().set(setting.optionsDefault.DEV_TOOL_MAP, JSON.stringify(value)).then(()=>{
                                resolve(value[toolName]);
                            })
                        }
                    })
                })
        }
    }

    // 设置提示 id
    let FeJson = { contextMenuId:"fhm_main"}

    let dataURLtoBlob = (dataURL)=> {
        var byteString = atob(dataURL.split(",")[1]);
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: "image/png" });
    }
    // 默认右键菜单
    let defaultMenuOptions={
        'download_crx': {
            icon: '♽',
            text: '插件下载分享',
            onClick: function (info, tab) {
                CrxDownloader.downloadCrx(tab);
            }
        },
        'fehelper_setting': {
            icon: '⚙',
            text: 'FeHelper设置',
            onClick: function (info, tab) {
                chrome.runtime.openOptionsPage();
            }
        },
        'capture_visible_page': {
            icon: '🧩',
            text: '截图当前页面',
            onClick: function (info, tab) {
                chrome.tabs.captureVisibleTab(null, {format: 'png', quality: 100}, dataUrl => {
                    // 下载图像
                    chrome.downloads.download({
                        url: dataUrl,
                        filename: "captured_image.png",
                        saveAs: true
                    });
                });
            }
        }
    }

    // 初始化菜单配置
    let _initMenuOptions = (() => {

        Object.keys(toolMap).forEach(tool => {
            // context-menu
            switch (tool) {
                case 'json-format':
                    toolMap[tool].menuConfig[0].onClick = function (info, tab) {
                        chrome.scripting.executeScript({
                            target: {tabId:tab.id,allFrames:false},
                            args: [info.selectionText || ''],
                            func: (text) => text
                        }, resp => chrome.DynamicToolRunner({
                            tool, withContent: resp[0].result
                        }));
                    };
                    break;
                case 'code-beautify':
                case 'en-decode':
                    toolMap[tool].menuConfig[0].onClick = function (info, tab) {
                        chrome.scripting.executeScript({
                            target: {tabId:tab.id,allFrames:false},
                            args: [info.linkUrl || info.srcUrl || info.selectionText || info.pageUrl || ''],
                            func: (text) => text
                        }, resp => chrome.DynamicToolRunner({
                            tool, withContent: resp[0].result
                        }));
                    };
                    break;

                case 'qr-code':
                    toolMap[tool].menuConfig[0].onClick = function (info, tab) {
                        chrome.scripting.executeScript({
                            target: {tabId:tab.id,allFrames:false},
                            args: [info.linkUrl || info.srcUrl || info.selectionText || info.pageUrl || tab.url || ''],
                            func: (text) => text
                        }, resp => chrome.DynamicToolRunner({
                            tool, withContent: resp[0].result
                        }));
                    };
                    toolMap[tool].menuConfig[1].onClick = function (info, tab) {
                        chrome.scripting.executeScript({
                            target: {tabId:tab.id,allFrames:false},
                            args: [info.srcUrl || ''],
                            func: (text) => {
                                try {
                                    if (typeof window.qrcodeContentScript === 'function') {
                                        let qrcode = window.qrcodeContentScript();
                                        if (typeof qrcode.decode === 'function') {
                                            qrcode.decode(text);
                                            return 1;
                                        }
                                    }
                                } catch (e) {
                                    return 0;
                                }
                            }
                        });
                    };
                    break;

                default:
                    toolMap[tool].menuConfig[0].onClick = function (info, tab) {
                        chrome.DynamicToolRunner({
                            tool, withContent: tool === 'image-base64' ? info.srcUrl : ''
                        })
                    };
                    break;
            }
        });
        return {}
    })();

    /**
     * 创建一个menu 菜单
     * @param toolName
     * @param menuList
     * @returns {boolean}
     * @private
     */
    let _createItem = (toolName, menuList) => {
        menuList && menuList.forEach && menuList.forEach(menu => {

            // 确保每次创建出来的是一个新的主菜单，防止onClick事件冲突
            let menuItemId = 'fhm_c' + escape(menu.text).replace(/\W/g,'') + new Date*1;

            chrome.contextMenus.create({
                id: menuItemId,
                title: menu.icon + '  ' + menu.text,
                contexts: menu.contexts || ['all'],
                parentId: FeJson.contextMenuId
            });

            chrome.contextMenus.onClicked.addListener(((tool,mId,mFunc) => (info, tab) => {
                if(info.menuItemId === mId) {
                    if(mFunc) {
                        mFunc(info,tab);
                    }else{
                        chrome.DynamicToolRunner({ tool });
                    }
                }
            })(toolName,menuItemId,menu.onClick));
        });
    };

    /**
     * 绘制一条分割线
     * @private
     */
    let _createSeparator = function () {
        chrome.contextMenus.create({
            id: 'fhm_s' + Math.ceil(Math.random()*10e9),
            type: 'separator',
            parentId: FeJson.contextMenuId
        });
    };

    /**
     * 创建扩展专属的右键菜单
     */
    let _initMenus = function () {
        _removeContextMenu(() => {
            chrome.contextMenus.create({
                id: FeJson.contextMenuId ,
                title: chrome.runtime.getManifest().name + '  ☣️',
                contexts: ['page', 'selection', 'editable', 'link', 'image'],
                documentUrlPatterns: ['http://*/*', 'https://*/*', 'file://*/*']
            });

            // 绘制用户安装的菜单，放在前面
            storage().get(setting.optionsDefault.DEV_TOOL_MAP).then(value => {
                value = JSON.parse(value || "{}")
               let allMenus= Object.keys(value).filter(tool => (value[tool].installed || value[tool].systemInstalled) && value[tool].menu)
                //系统预置的菜单，放在后面
               let onlineMenus = allMenus.filter(tool =>  value[tool].hasOwnProperty('systemInstalled') && value[tool].systemInstalled && value[tool].installed && value[tool].menu);
                // 开发的菜单，放在后面
               let devToolsMenus = allMenus.filter(tool => value[tool].hasOwnProperty('_devTool') && value[tool]._devTool && !value[tool].systemInstalled  && value[tool].installed && value[tool].menu);

                // 绘制FH提供的工具菜单
                onlineMenus.forEach(tool => _createItem(tool, value[tool].menuConfig));
                // 如果有本地工具的菜单需要绘制，则需要加一条分割线
                devToolsMenus.length && _createSeparator();
                // 绘制本地工具的菜单
                devToolsMenus.forEach(tool => _createItem(tool, value[tool].menuConfig));
            })

            // 绘制两个系统提供的菜单，放到最后
            storage().get(setting.optionsDefault.DEV_BASE_INIT).then(value => {
                value = JSON.parse(value || "{}")
                let createSeparator = false;
                if (value.hasOwnProperty('fehelper_setting') && value.fehelper_setting === true) {
                    _createSeparator();
                    _createItem('fehelper_setting', [defaultMenuOptions['fehelper_setting']]);
                    createSeparator = true;
                }
                if (value.hasOwnProperty('download_crx') && value.download_crx === true){
                    if (!createSeparator) _createSeparator();
                    _createItem('download_crx', [defaultMenuOptions['download_crx']]);
                    createSeparator = true;
                }
                if (value.hasOwnProperty('capture_visible_page') && value.capture_visible_page === true){
                    if (!createSeparator) _createSeparator();
                    _createItem('capture_visible_page', [defaultMenuOptions['capture_visible_page']]);
                    createSeparator = true;
                }
            })
        });
    };

    /**
     * 移除扩展专属的右键菜单
     */
    let _removeContextMenu = function (callback) {
        chrome.contextMenus.removeAll(callback);
    };

    /**
     * 创建或移除扩展专属的右键菜单
     * @param isCreate
     */
    let _createOrRemoveContextMenu = function (isCreate =true) {
            if (isCreate) {
                _initMenus();
            } else {
                _removeContextMenu();
            }
    };
    return {
        menuMgr: _menuMgr,
        rebuild: _createOrRemoveContextMenu,
    }
})()


/**
 *  管理本地开发的插件 应用的代码。更新，删除，同步等操作
 */
export const devTool = (() => {
    //获取
    const get = async(toolName)=>{
        try {
            const _tools = await storage().get(setting.optionsDefault.DEV_TOOL_MAP)
            const localTools = JSON.parse(_tools || "{}")
            let devToolMap = {}
            if (localTools[toolName] && localTools[toolName].type === 'plug' && localTools[toolName].hasOwnProperty('devToolMap')){
                devToolMap = localTools[toolName].devToolMap
                console.log('%c 获取本地开发的插件 应用的代码', "color: #f26783; font-weight: bold;",devToolMap)
            }else{
                if (toolMap[toolName] && toolMap[toolName].type === 'plug' && toolMap[toolName].hasOwnProperty('devToolMap')){
                    devToolMap = toolMap[toolName].devToolMap
                    console.log('%c 获取默认的插件 应用的代码', "color: #f26783; font-weight: bold;",devToolMap)
                }
            }
            console.log('%c 获取本地开发的插件 应用的代码', "color: #f26783; font-weight: bold;",toolName)
            return devToolMap
        }catch (error) {
            console.error(error)
        }
    }
    //删除
    const remove = async (toolName)=>{
        try {
            const _tools = await storage().get(setting.optionsDefault.DEV_TOOL_MAP)
            const localTools = JSON.parse(_tools || "{}")
            Object.keys(localTools).forEach(key=>{
                if (key  === toolName && localTools[key].type === 'plug' ){
                   delete localTools[key]
                }
            })
            await storage().set(setting.optionsDefault.DEV_TOOL_MAP, JSON.stringify(localTools))
        } catch (error) {
            console.error(error)
        }
    }
    //更新
    const update = async (toolName,data)=>{
        try {
            const tools = await storage().get(setting.optionsDefault.DEV_TOOL_MAP)
            const localTools = JSON.parse(tools || "{}")
            Object.keys(toolMap).forEach(key=>{
                if (key  === toolName && localTools[key].hasOwnProperty('type') && localTools[key].type === 'plug' ){
                    if (Object.prototype.toString.call(data)  === '[object Object]' && ('id' in data)){
                        localTools[data.id] = localTools[key]
                        localTools[data.id] = Object.assign(localTools[data.id],data)
                        delete localTools[key]
                    }
                }else{
                    if (key != undefined && key != null){
                        localTools[toolName] = data
                    }
                }
            })
            console.log('%c 更新本地开发的插件 应用的代码5', "color: green; font-weight: bold;",localTools)
            await storage().set(setting.optionsDefault.DEV_TOOL_MAP, JSON.stringify(localTools))
        } catch (error) {
            console.error(error)
        }
    }

    //卸载
    const offLoad = async (toolName)=>{
        try {
            const tools = await storage().get(setting.optionsDefault.DEV_TOOL_MAP)
            const localTools = JSON.parse(tools || "{}")
            Object.keys(localTools).forEach(key=> {
                if (key === toolName && localTools[key].type === 'plug') {
                    localTools[key].menu = false
                    localTools[key].installed = false
                }
            })
            console.log('%c 卸载本地开发的插件 应用的代码', "color: #f26783; font-weight: bold;",toolName)
            await storage().set(setting.optionsDefault.DEV_TOOL_MAP, JSON.stringify(localTools))
        } catch (error) {
            console.error(error)
        }
    }

    // 同步 动态注入脚本
    // 用于创建时 同步脚本 到页面
    const syncInjectScript =  (tabId,url,tool)=>{
        if (tool.hasOwnProperty('devToolMap') && tool.devToolMap.hasOwnProperty('MPattern') && tool.devToolMap.MPattern.length > 0){
            tool.devToolMap.MPattern.find(pattern => {
                const regex = new RegExp(pattern)
                const isMatch = regex.test(url)
                if (isMatch) {
                    //循环导入所有js or css
                    tool.devToolMap.MScript.forEach(script => {
                        const mRefresh = tool.devToolMap.MRefresh
                        if (script.filename.indexOf('.js') > -1){
                            let js = `${script.content};
                                     parseInt(${mRefresh}) && setTimeout(() => {
                                                location.reload(true);
                                            }, parseInt(${mRefresh}) )`
                            inject(tabId,{js})
                        } else if (script.filename.indexOf('.css') > -1){
                            if (tool.contentScriptCss && tool.installed ){
                                let css = script.content
                                inject(tabId,{css})
                            }

                        }

                    })

                }
            });
        }
    }
    //开启/关闭
    return {
        get,
        remove,
        update,
        offLoad,
        syncInjectScript
    }
})()