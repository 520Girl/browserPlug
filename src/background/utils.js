//! 这里是一些工具函数，比如本地存储的管理
import { Storage  } from "@plasmohq/storage"
import {toolMap} from "./tools"


/**
 * 管理本地存储
 */

export function  storage(){
    const storageDefult = new Storage({ area: "local" })
    // 获取本地存储 ，可以一次性获取多个 key 为数组
    //['key1', 'key2', 'key3'];
    const _getStorage = async key =>{
        return await storageDefult.get(key)
    }
    // 设置本地存储 ,可以一次性设置多个
    // {
    //     'key1': 'value1',
    //     'key2': 'value2',
    //     'key3': 'value3'
    // }
    const _setStorage = async(item,value)=>{
        if (typeof item !== "string"){
            item = String(item)
        }
        return await storageDefult.set(item,value)
    }
    // 删除本地存储
    const _removeStorage = async(key)=>{
        return await storageDefult.remove(key)
    }
    // 获取所有本地存储
    const _getAllStorage = async()=>{
        return await storageDefult.getAll()
    }

    return {
        get: _getStorage,
        set: _setStorage,
        remove: _removeStorage,
        getAll: _getAllStorage
    }
}



/**
 * 右键菜单工具
 */
export const menu=(()=>{
    // 默认右键菜单
    const defaultMenu = {
        'download_crx': {
            icon: '♥',
            text: '插件下载分享',
            onClick: function (info, tab) {
                CrxDownloader.downloadCrx(tab);
            }
        },
        'fehelper_setting': {
            icon: '❂',
            text: 'FeHelper设置',
            onClick: function (info, tab) {
                chrome.runtime.openOptionsPage();
            }
        }
    };

    // 初始化菜单配置
    let _initMenuOptions = () => {
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
    };

    return{
        init: _initMenuOptions,
    }
})()