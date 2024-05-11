<template>
  <div class="x-container">
      <n-split direction="vertical" style="height: 100%;width: 100%;" :default-size="0.2">
        <template #resize-trigger>
          <div
              :style="{
          height: '100%',
          backgroundColor: '#36ad6a',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '8px',
          width: splitWidth+'%'
        }"
          >
          </div>
        </template>
        <template #1>
          <n-flex align="center" justify="space-between" style="height: 100%;padding: 0 10px;" >
            <n-avatar
                round
                size="small"
                style="background-color:transparent;"
                :src="manifest.icons[48]"
            />
            <div class="" @click="openUrl" style="cursor: pointer;">{{manifest.name}}</div>
            <n-skeleton v-if="skeletonStatus" width="67px" height="24px" round   />
            <div class="Weather" v-else>

              <n-icon size="15" class=" Weather-icon">
                <weather-icon :type="weather.type" />/>
              </n-icon>
              <div style="min-width: 20px;text-align: center;">
                <span style="display: block;" class="Weather-text">
                  {{ipaddress.length > 12 ? weather.city : 'Loading...'}}
                </span>
                <n-gradient-text :type="weatherStatus  ? 'error' : 'success'" class="Weather-text">
                  {{weather.high}}~{{weather.low}}
                </n-gradient-text>
              </div>

            </div>
          </n-flex>
        </template>
        <template #2>
          <n-scrollbar trigger="hover">
            <n-flex align="center" justify="space-start"  >
              <div class="x-switch-container" v-for="(tool,key) in Object.keys(fhTools)" :class="'-x-' + tool"  style="padding-left: 5px;">
                <n-switch v-model:value="fhTools[tool].installed" @update:value="handleOffloadInstall(fhTools[tool],tool,$event)" :disabled="fhTools[tool].systemInstalled"  class="x-switch"  size="small" :rail-style="railStyle" />
                <n-avatar v-if="fhTools[tool].icon" :style="bgColor(fhTools[tool].installed,2)" :size="20" :src="fhTools[tool].icon" />
                <n-avatar v-else :style="bgColor(fhTools[tool].installed,2)" :size="20" :src="fhTools[tool].icon" >
                  {{'name' in fhTools[tool] && fhTools[tool].name.length > 1 ? fhTools[tool].name.charAt(0) : 'N'}}
                </n-avatar>
                <n-gradient-text type="success" class="x-switch-text" @click="runHelper(tool,fhTools[tool].installed)" :disabled="fhTools[tool].systemInstalled" :gradient="bgColor(fhTools[tool].installed,1)">
                  {{fhTools[tool].name}}
                </n-gradient-text>
                <n-icon v-if="fhTools[tool].type === 'app'" style="padding-left: 3px;" >
                  <svg t="1714873245037" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1078" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16"><path d="M951.901 244.015l-413.3-238.57a33.606 33.606 0 0 0-33.909 0L91.3 244.016c-10.426 6.12-16.99 17.221-16.99 29.346v477.184c0 12.149 6.447 23.343 16.99 29.37l413.3 238.662c5.213 2.933 11.101 4.515 16.99 4.515 5.794 0 11.775-1.582 16.988-4.515l413.3-238.661c10.427-6.121 16.99-17.222 16.99-29.37V273.36a33.908 33.908 0 0 0-16.966-29.346zM892.23 726.016l-370.618 213.97-370.642-213.97v-427.87L521.588 84.178l370.642 213.97v427.869z m8.797 5.073" fill="#1296db" p-id="1079"></path><path d="M285.207 348.393a34.095 34.095 0 0 0-46.336 12.567 33.908 33.908 0 0 0 12.474 46.36l235.94 136.215v269.498a33.745 33.745 0 0 0 33.884 33.885 33.745 33.745 0 0 0 33.886-33.885V543.977L791.9 407.227a34.025 34.025 0 0 0 12.451-46.36 34.025 34.025 0 0 0-46.336-12.474l-236.404 136.54-236.405-136.54z m0 0" fill="#1296db" p-id="1080"></path></svg>
                </n-icon>
                <n-icon v-else  style="padding-left: 3px;">
                  <svg t="1714873918841" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="889" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16"><path d="M448 64a149.333333 149.333333 0 0 1 149.333333 149.333333h85.333334a128 128 0 0 1 127.914666 123.2L810.666667 341.333333v85.333334a149.333333 149.333333 0 0 1 5.12 298.581333L810.666667 725.333333v106.666667a128 128 0 0 1-123.2 127.914667L682.666667 960h-170.666667v-85.333333a64 64 0 0 0-128 0v85.333333H192a128 128 0 0 1-127.914667-123.2L64 832v-192h85.333333a64 64 0 0 0 0-128H64v-170.666667a128 128 0 0 1 123.2-127.914666L192 213.333333h106.666667a149.333333 149.333333 0 0 1 149.333333-149.333333z m277.333333 277.333333a42.666667 42.666667 0 0 0-42.666666-42.666666h-170.666667v-85.333334h-128v85.333334H192a42.666667 42.666667 0 0 0-42.56 39.466666L149.333333 341.333333v85.333334a149.333333 149.333333 0 0 1 5.12 298.581333L149.333333 725.333333v106.666667a42.666667 42.666667 0 0 0 39.466667 42.56L192 874.666667h106.666667a149.333333 149.333333 0 0 1 298.666666 0h85.333334a42.666667 42.666667 0 0 0 42.56-39.466667L725.333333 832v-192h85.333334l3.754666-0.106667A64 64 0 0 0 810.666667 512h-85.333334v-170.666667zM448 149.333333a64 64 0 0 0-63.893333 60.245334L384 213.333333h128a64 64 0 0 0-64-64z" fill="#01ba1e" p-id="890"></path></svg>
                </n-icon>
                <n-icon v-if="fhTools[tool].systemInstalled">
                  <svg t="1714923234642" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="953" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16"><path d="M788.44476429 622.46683433c33.96868425 0 65.36900457 18.22709886 82.21483109 47.72185884l56.36549088 98.62051462a94.69806365 94.69806365 0 0 1 0 93.9524096l-56.33830558 98.61922006A94.69806365 94.69806365 0 0 1 788.44476429 1009.1026963h-111.01960218c-33.96868425 0-65.36900457-18.22709886-82.21612563-47.72185885l-56.36549088-98.61922006a94.69806365 94.69806365 0 0 1 0-93.9524096l56.33830558-98.62051462a94.69806365 94.69806365 0 0 1 82.24201639-47.72185884h111.01960218z m-262.08445124-554.48957788l305.11101977 179.25989262a82.85044939 82.85044939 0 0 1 0 142.88983989l-42.97219792 25.21372192 42.97219792 25.21501645a82.85044939 82.85044939 0 0 1 9.66631728 136.26050938 149.13080889 149.13080889 0 0 0-44.87775827-9.38928608l-7.81512754-0.19418073h-92.9582042L789.49334029 512l-82.76759894-48.63321378-180.3654283 106.0213899a82.85044939 82.85044939 0 0 1-83.95469053 0l-180.41979891-106.04857521L179.27130075 512l305.10972522 179.26118717 52.9427317-31.15176898-46.4247315 81.30347616a149.4492653 149.4492653 0 0 0-13.7531746 32.33886055 82.27049623 82.27049623 0 0 1-34.74152359-11.04629507l-180.41979891-106.04857521-82.71322832 48.66169363 305.10972522 179.25989263 2.67969422-1.54697325 1.85118973 3.59104918 1.98711625 3.53408948 37.06263072 64.9003817-1.60263838 0.96572556a82.85044939 82.85044939 0 0 1-83.95469053 0L137.29589728 776.76285093a82.85044939 82.85044939 0 0 1 0-142.88983989l42.91523824-25.24220176-42.91653277-25.18653661a82.85044939 82.85044939 0 0 1 0-142.88854534l42.91653277-25.21501645-42.91653277-25.21372192a82.85044939 82.85044939 0 0 1 0-142.88983989L442.40562252 68.00444176a82.85044939 82.85044939 0 0 1 83.95469053 0z m262.08445124 637.34002726h-111.01960218a11.84761426 11.84761426 0 0 0-10.27345571 5.96523236l-56.36678543 98.6205146a11.84761426 11.84761426 0 0 0 0 11.76476382l56.33830558 98.61922007a11.84761426 11.84761426 0 0 0 10.30193556 5.96523235h111.01960218a11.84761426 11.84761426 0 0 0 10.27345571-5.96523235l56.3654909-98.61922007 0.99420539-2.29262729a11.84761426 11.84761426 0 0 0-0.99420539-9.47213653l-56.33830559-98.6205146a11.84761426 11.84761426 0 0 0-10.30064102-5.96523236zM732.9349632 760.55134815a55.23406444 55.23406444 0 1 1 0 110.46683434 55.23406444 55.23406444 0 0 1 0-110.46683434z m-248.55134815-621.12981903L179.27259529 318.68271629l305.10972522 179.25989262 305.11101978-179.25989262-305.10972524-179.26118717z" fill="#d4237a" p-id="954"></path></svg>
                </n-icon>
              </div>
            </n-flex>
          </n-scrollbar>

        </template>

      </n-split>
      <n-divider dashed style="margin: 0 0;background-color: #000000;" ></n-divider>
      <n-flex class="x-options" align="center" justify="left" :wrap="false" :size="[8, 3]" >
        <n-skeleton v-if="skeletonStatus" width="150px" height="20px"   />
        <div v-else class="scroll-container" @mouseover="stopScroll" @mouseleave="startScroll">
            <span @click="openUrl(item.url)"  class="scroll-item" style="height:21px;overflow:hidden;font-size: 12px;text-align: left;display: block;min-width: 150px;" v-for="item in sliderItems.slice(0,9)" :key="item">
            {{item.index}}. {{item.title}}
            </span>
        </div>
        <div class="Weather">
          <sup>
            <span style="color: rgb(255 255 255);padding: 0px 3px;height: 14px;background: #5b5b5b;">当前版本：</span>
            <span style="color: rgb(255 255 255);padding: 0px 3px;height: 14px;background: #2080f0;"> {{manifest.version}}</span>
          </sup>
        </div>
        <div class="x-options-item"  @click="openOptionsPage()" >
          <n-icon :component="SettingsOutline" size="15" :depth="1" class="x-options-icon" />
          <span >设置</span>
        </div>
      </n-flex>
    </div>
</template>
  
  <script lang="ts">
  import {
    NSplit,NSkeleton,
    NAvatar,
    NFlex,
    NGradientText,
    NDivider,
    NSwitch,
    NIcon,
    NScrollbar,
    NMessageProvider,
    NEllipsis
  } from "naive-ui"
  import weatherIcon from "~popup/weatherIcon.vue";
  import { reactive,computed,ref,defineComponent,onBeforeUnmount } from "vue";
  import {menu, tool} from '../background/handleTools.js'
  import {CashOutline, SettingsOutline} from "@vicons/ionicons5";
  import setting from "~options/setting";
  import '../static/vendor/evalCore.min.js'

  export default defineComponent({
    name: "Popup",
    components: {
      NEllipsis,weatherIcon,
      NSplit,NMessageProvider,
      NAvatar,NSkeleton,
      NFlex,
      NGradientText,
      NDivider,
      NSwitch,
      NIcon,
      NScrollbar
    },
    setup() {
      const chrome = window.chrome;
      console.log('%c 1.popup 浏览器环境检查', "color: green; font-weight: bold;",chrome)
      const manifest = reactive({});
      let fhTools = reactive({});
      let valueState = reactive({})
      const splitWidth = ref(100)
      const sliderItems = ref([]); // 新闻滚动的内容数组
      const weather = ref({high:'29°C',type:'晴',low:'19°C',city:''}); // 天气
      const ipaddress = ref({}); // ip
      const weatherStatus = ref(false); // 天气情况
      let skeletonStatus = ref(true); // 骨架屏开关
      let timeoutId = null;
      const startScroll = () => {
        timeoutId = setInterval(() => {
          sliderItems.value.push(sliderItems.value.shift());
        }, 2000); // 定时器间隔时间
      };

      //! 数据滚动操作
      const stopScroll = () => {
        clearInterval(timeoutId);
      };

      onBeforeUnmount(() => {
        clearInterval(timeoutId);
      });

     startScroll(); // 页面加载后启动滚动

      //! 获取新闻数据
      const getSliderItems= async ()=>{
        //新闻
        await fetch('https://api.vvhan.com/api/hotlist/toutiao')
            .then(response => response.json())
            .then(data => {
              if (data.success){
                sliderItems.value = data.data;
              }
            })
            .catch(error => {
              console.log(error)
            })
        // ip地址
        await fetch('https://api.vvhan.com/api/ipInfo',{'Accept':'application/json'})
            .then(response => response.json())
            .then(data => {
              if (data.success){
                ipaddress.value = data.ip;
              }
            })
            .catch(error => {
              console.log(error)
            })
        //天气
        await fetch('https://api.vvhan.com/api/weather')
            .then(response => response.json())
            .then(data => {
              if (data.success){
                weather.value = data.data;
                weather.value.city = data.city;
                const match = weather.value.high.match(/\d+/);
                const number = match ? match[0] : null;
                if (+number && +number > 35){
                  weatherStatus.value = true;
                }
              }
            })
            .catch(error => {
              console.log(error)
            })
        skeletonStatus.value = false;
      }
      getSliderItems()

      //! 获取全部的工具列表
      tool.getAllTools().then(tools => {
        let tips = 0
        Object.keys(tools).forEach(tool => {
          if (tools[tool].installed) {
            tips+=1
          }
          fhTools[tool] = tools[tool];
        })
        // 发送消息通知后台
        chrome.runtime.sendMessage({
          type: 'sync-Badge-Text',
          tips: String(tips),
        });
      })


      //! 跳转站外链接
      const openUrl= (url,event) =>{
        // event.preventDefault();
        // 获取后台页面，返回window对象
        console.log(url)
        if (url && url.startsWith('http') || url.startsWith('https')){
          return chrome.tabs.create({url: url});
        }
        chrome.tabs.create({url: `https://${setting.optionsDefault.DEV_REQUEST_URL}`});
        return false;
      }
      //! 跳转配置页面
      const openOptionsPage=() => {
        // chrome.tabs.create({'url': 'https://www.baidu.com'});
        chrome.runtime.openOptionsPage();
      }
      //! 跳转工具页面
      const runHelper= (toolName,installed)=>{
        if (installed === false){
          return false;
        }
        let request = {
          type: setting.optionsDefault.OPEN_DYNAMIC_TOOL,
          page: toolName,
          noPage: !!fhTools[toolName].noPage
        };
        if(fhTools[toolName]._devTool) {
          request.page = 'dynamic';
          request.query = `tool=${toolName}`;
        }
        chrome.runtime.sendMessage(request);
        !!fhTools[toolName].noPage && setTimeout(window.close,200);
      }

      //! 获取当前ctx的version
      const basemanifest = chrome.runtime.getManifest();
      Object.keys(basemanifest).forEach(tool => {
        manifest[tool] = chrome.runtime.getManifest()[tool];
      });

      //点击switch时，发送消息通知后台
      const handleOffloadInstall = (item,key,event) => {
        if (event) {
          // 安装插件
          splitWidth.value = 0;
          tool.install(key).then(()=>{
            let ptInterval = setInterval(() => {
              splitWidth.value += Math.floor(Math.random() * 20);
              if(parseInt(splitWidth.value) > 100) {
                item.installed = true;
                clearInterval(ptInterval);
                splitWidth.value = 100;
                // 按照安装状态进行排序
                chrome.runtime.sendMessage({
                  type: setting.optionsDefault.DYNAMIC_TOOL_INSTALL_OR_OFFLOAD,
                  toolName: item.name,
                  action: 'install',
                  showTips: true
                });
                setTimeout(() => {
                  window.close();
                },2000)
              }
            },100);

          })
        } else {
          // 卸载插件
          if (item.systemInstalled === true) {
            return false
          }
          tool.offLoad(key).then(() => {
            chrome.runtime.sendMessage({
              type: setting.optionsDefault.DYNAMIC_TOOL_INSTALL_OR_OFFLOAD,
              action: 'offload',
              showTips: true
            })
            setTimeout(() => {
              window.close();
            },2000)


            //卸载了插件，需要去除右键菜单
            if(item.menu){
              menu.menuMgr(key,'offload').then(()=>{
                item.menu = false;

                chrome.runtime.sendMessage({
                  type: setting.optionsDefault.DYNAMIC_TOOL_INSTALL_OR_OFFLOAD,
                  action: `menu-offload`,
                  showTips: false,
                  menuOnly: true
                });
              })
            }
          })

        }

      }

      // 计算文字颜色颜色
      const bgColor = computed(()=>(installed,index) => {
        if (installed === true){ //选中状态
          switch (index){
            case 1: //表示修改的是文字颜色
              return {from: '#18a058', to: '#18a058'}
            case 2: //表示修改的是背景颜色
              return {color: 'yellow',backgroundColor: '#18a058'}
          }
        }else{
          switch (index){
            case 1: //表示修改的是文字颜色
              return {from: '#f0a020', to: '#f0a020'}
            case 2: //表示修改的是背景颜色
              return {color: 'yellow',backgroundColor: '#f0a020'}
          }
          return
        }
      })
      // 修改滑块样式
      const railStyle=({focused, checked}) => {
        const style = {};
        if (checked) {
          style.background = "#18a058";
          if (focused) {
            style.boxShadow = "0 0 0 2px #d0305040";
          }
        } else {
          style.background = "#f0a020";
          if (focused) {
            style.boxShadow = "0 0 0 2px #2080f040";
          }
        }
        return style;
      }

      return {
        sliderItems,
        startScroll,
        stopScroll,
        skeletonStatus,
        weatherStatus,
        ipaddress,
        weather,
        manifest,
        fhTools,
        valueState,
        bgColor,
        railStyle,
        CashOutline,
        SettingsOutline,
        openUrl,
        setting,
        splitWidth,
        openOptionsPage,
        runHelper,
        handleOffloadInstall
      }
    }
  })

  </script>

<style>
@import "index.css";
</style>