import {storage} from '../background/utils'

export default  {
    optionsDefault:{
        // 正式版chrome extension id
        STABLE_EXTENSION_ID: 'nlkpledjopnbpjmhnoiokblbhbfealhm',
        //禁止在新选项卡中打开 false:允许 true:禁止 找相同页面打开
        FORBID_OPEN_IN_NEW_TAB: true,
        //允许所有内容脚本在所有框架中运行
        CONTENT_SCRIPT_ALLOW_ALL_FRAMES: false, //允许所有内容脚本在所有框架中运行
        // 是否启用右键菜单
        OPT_ITEM_CONTEXTMENUS: true,
        // 设置工具添加到右键菜单
        'fehelper_setting':true,
        // 分享下载右键菜单
        'download_crx':true,
        // 截取可见页面右键菜单
        'capture_visible_page':true,
        // 是否开启页面搜索次数数据统计
        'page_search_count':false,
        //为基础配置key名
        DEV_BASE_INIT: 'DEV_BASE_INIT',
        //toolMap为工具配置key名
        DEV_TOOL_MAP: 'DEV_TOOL_MAP',
        // 请求地址
        DEV_REQUEST_URL: 'navai.vip',
        // 动态工具安装或卸载
        DYNAMIC_TOOL_INSTALL_OR_OFFLOAD: 'DYNAMIC_TOOL_INSTALL_OR_OFFLOAD',
        // 动态工具点击跳转到工具页面事件
        OPEN_DYNAMIC_TOOL: 'open-dynamic-tool',
        // 插件代码 存储用的keyPAGE_MONKEY_LOCAL_STORAGE_KEY     插件名称DEV_REQUEST_URL_时间戳_随机数存储到本地
        PAGE_MONKEY_LOCAL_STORAGE_KEY:'PAGE_MONKEY_LOCAL_STORAGE_KEY',
        //  这个是 当menu点击的时候 会存一个值在 background.js里面，
        //  content-script 通过发送消息，获取到 background.js 里面去获取这个值，并 通过回调方法返回给content-script，
        // 这样就实现了 动态工具的点击跳转到工具页面的功能，并传页面的信息给工具页面。的效果
        DYNAMIC_ANY_THING:'fh-dynamic-any-thing'
    },
    /**
     * 提取配置项
     * @param options 回调方法
     */
    getOptions: async function(options=undefined) {
        const baseInit = await storage().get(this.optionsDefault.DEV_BASE_INIT)
        const local = JSON.parse(baseInit ||{})
        if (options && local.hasOwnProperty(options)){
            return JSON.parse(baseInit)[options]
        }
        return JSON.parse(baseInit)
    },
    /**
     * 保存配置
     * @param items
     * @private
     */
    setOptions:function (items) {
        Object.keys(this.optionsDefault).forEach(opt => {
            if (items.hasOwnProperty(opt)) {
                this.optionsDefault[opt] = items[opt]
            }
            storage().set(this.optionsDefault.DEV_BASE_INIT,  JSON.stringify(this.optionsDefault))
        })
    },
    // 初始化配置
    initOptions: async function () {
        await storage().set(this.optionsDefault.DEV_BASE_INIT, JSON.stringify(this.optionsDefault))
    }
}