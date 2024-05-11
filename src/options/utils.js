import Awesome from '../background/awesome.js'
import Settings from './settings.js'
export default{
    install: function (tool, event) {
        let btn = event.target;
        if (btn.tagName.toLowerCase() === 'i') {
            btn = btn.parentNode;
        }

        if (btn.getAttribute('data-undergoing') === '1') {
            return false;
        }
        btn.setAttribute('data-undergoing', 1);
        let elProgress = btn.querySelector('span.x-progress');

        // 显示安装进度
        let pt = 1;
        Awesome.install(tool).then(() => {
            elProgress.textContent = `(${pt}%)`;
            let ptInterval = setInterval(() => {
                elProgress.textContent = `(${pt}%)`;
                pt+= Math.floor(Math.random() * 20);
                if(pt>100) {
                    clearInterval(ptInterval);
                    elProgress.textContent = ``;
                    this.fhTools[tool].installed = true;
                    if (!this.sortArray.includes(tool) && (tool !== 'devtools')) {
                        this.sortArray.push(tool);
                    }
                    // 按照安装状态进行排序
                    this.sortTools();
                    btn.setAttribute('data-undergoing', 0);

                    chrome.runtime.sendMessage({
                        type: MSG_TYPE.DYNAMIC_TOOL_INSTALL_OR_OFFLOAD,
                        toolName: tool,
                        action: 'install',
                        showTips: true
                    });
                }
            },100);
        });
    },
    initData: async function () {

        this.manifest = chrome.runtime.getManifest();

        Settings.getOptions((opts) => {
            this.selectedOpts = Object.keys(opts).filter(k => String(opts[k]) === 'true');
        });

        this.sortArray = await Awesome.SortToolMgr.get();

        // 获取两个特殊右键菜单项的安装情况
        Awesome.menuMgr('fehelper-setting', 'get').then(value => {
            this.menuFeHelperSeting = String(value) !== '0';
        });
        Awesome.menuMgr('download-crx', 'get').then(value => {
            this.menuDownloadCrx = String(value) === '1';
        });

        Awesome.getAllTools().then(tools => {
            this.fhTools = tools;
            let isSortArrEmpty = !this.sortArray.length;

            Object.keys(tools).forEach(tool => {
                if (tools[tool].installed) {
                    isSortArrEmpty && (tool !== 'devtools') && this.sortArray.push(tool);
                }
            });
            this.sortTools();
        });
    },
    shortCut: function () {
        // 获取当前热键
        chrome.commands && chrome.commands.getAll && chrome.commands.getAll(keys => {
            keys.some(key => {
                if (key.name === '_execute_browser_action' && key.shortcut) {
                    this.defaultKey = key.shortcut;
                    return true;
                }
            });
        });
    },
    remoteHotFix: function () {
        let hotfix = () => {
            // 从服务器同步最新添加的一些工具，实现远程更新，无需提审FeHelper
            let remoteHotfixUrl = `${this.manifest.homepage_url}/static/js/hotfix.js?cur_ver=${new Date().toLocaleDateString()}`;
            fetch(remoteHotfixUrl).then(resp => resp.text()).then(jsText => {
                try {
                    if (!jsText) return false;
                    window.evalCore.getEvalInstance(window)(jsText);
                } catch (e) {
                }
            }).catch(error => console.log('远程热修复失败：', error));
        };
        setTimeout(hotfix, 2000);
    },
    sortTools: function (repaintMenu) {

        let tools = {};
        let installed = {};
        Object.keys(this.fhTools).forEach(tool => {
            if (this.fhTools[tool].installed) {
                installed[tool] = this.fhTools[tool];
            }
        });
        if (this.sortArray.length) {
            this.sortArray.forEach(tool => {
                tools[tool] = installed[tool];
            });
            Awesome.SortToolMgr.set(this.sortArray);
        } else {
            tools = installed;
        }

        Object.keys(this.fhTools).forEach(tool => {
            if (!tools[tool]) {
                tools[tool] = this.fhTools[tool];
            }
        });
        this.fhTools = tools;
        //刷新工具列表，排序改变
        // this.$forceUpdate();

        // 重绘右键菜单，以确保排序实时更新
        repaintMenu && chrome.runtime.sendMessage({
            type: MSG_TYPE.DYNAMIC_TOOL_INSTALL_OR_OFFLOAD,
            action: `menu-upgrade`,
            showTips: false,
            menuOnly: true
        });
    },
}