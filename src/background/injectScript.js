import setting from "../options/setting";
/**
 * 如果tabId指定的tab还存在，就正常注入脚本
 // * @param codeConfig.status 注入的是当前tab为false 还是url路由匹配注入为true
 // * @param codeConfig.url 当status 为ture时 url匹配的路由 自动注入脚本
 * @param tabId 需要注入脚本的tabId
 * @param codeConfig 需要注入的代码
 * @param callback 注入代码后的callback
 */
export const inject=(tabId,codeConfig,callback)=>{

    chrome.tabs.query({currentWindow: true,active: true},(tabs)=>{
            // 注入的url路由匹配
        console.log(tabs,tabId)
            let tabStatus = !!tabs.find(t => t.id === tabId);
            if (!tabStatus) return false;
            // 注入所有iframe
            let target ={allFrames: false}
            // target 注入的目标
            target.tabId = tabId;
            console.log('准备注入脚本3------------------------------',target,codeConfig)
            setting.getOptions('CONTENT_SCRIPT_ALLOW_ALL_FRAMES').then((opt) => {
                console.log('opt',opt)
                if (!codeConfig.hasOwnProperty('allFrames')){
                    target.allFrames = opt;
                }else{
                    target.allFrames = codeConfig.allFrames;
                }
                // 给js方法注入 错误处理
                codeConfig.code = `try{${codeConfig.code}}catch(e){}`;
                // 注入脚本, 如果是文件直接注入文件，如果是代码直接注入代码
                //文件注入 当文件 长度大于0 时，可能同时导入js文件 和 js代码
                if (codeConfig.files.length){
                    if(codeConfig.files.join(',').indexOf('.css') > -1) {
                        //css
                        chrome.scripting.insertCSS({
                            target: target,
                            files: codeConfig.files
                        }, function () {
                            callback && callback.apply(this, arguments);
                        });
                    }else{
                        //js 同时导入js 文件 和 js代码 是 _injectContentScripts 这个方法
                        chrome.scripting.executeScript({
                            target: target,
                            files: codeConfig.files
                        }, function () {
                            if(codeConfig.js){
                                chrome.scripting.executeScript({
                                    target:target,
                                    func: function(code){try{evalCore.getEvalInstance(window)(code)}catch(x){}},
                                    args: [codeConfig.js]
                                }, function () {
                                    callback && callback.apply(this, arguments);
                                });
                            }else{
                                callback && callback.apply(this, arguments);
                            }
                        });
                    }
                //代码注入
                }else if(codeConfig.css){
                    // 注入css样式
                    console.log('注入css脚本  codeConfig',codeConfig,target)
                    chrome.scripting.insertCSS({
                        target: target,
                        css:codeConfig.css
                    }, function () {
                        callback && callback.apply(this, arguments);
                    });
                }else{
                    console.log('注入js脚本  codeConfig',codeConfig)
                    // 注入js脚本
                    chrome.scripting.executeScript({
                        target: target,
                        func: function(code){
                            try{
                                evalCore.getEvalInstance(window)(code)
                            }catch(x){
                                console.log('注入js脚本失败',x)
                            }
                        },
                        args: [codeConfig.js]
                    }, function () {
                        callback && callback.apply(this, arguments);
                    });
                }
            })
    })

}


