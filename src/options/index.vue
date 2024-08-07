<template>
  <div class="wrapper" id="pageContainer">
    <n-layout embedded content-style="padding: 24px;" position="absolute">
      <n-layout-header>
        <n-flex align="center" justify="space-between" class="header">
          <div class="header-continer">
            <n-avatar
                round
                size="small"
                :src="manifest.icons[16]"
            />
            <n-gradient-text type="info" class="height-title">
              配置页面
            </n-gradient-text>
          </div>
          <n-badge dot>
            <n-tag round :bordered="false" type="success" size="small">
              v{{manifest.version}}
              <template #icon>
                <n-icon :component="CheckmarkCircle" />
              </template>
            </n-tag>
          </n-badge>
        </n-flex>
      </n-layout-header>
      <n-layout-content  content-style="padding: 10px 24px;">
        <!--        <n-divider title-placement="left" style="margin: 5px 0 5px 0;"></n-divider>-->
          <n-tabs type="line" animated size="medium" :default-value="tabsValue">
            <n-tab-pane name="basic-config" tab="基础配置">
               <basic-config />
            </n-tab-pane>
            <n-tab-pane name="plugin-app-config" tab="插件|应用配置">
              <plugin-app-config :appList="appList" :plugList="plugList"/>
            </n-tab-pane>
            <n-tab-pane name="add-plug" tab="添加插件">
              <add-plug :plugList="plugList"/>
            </n-tab-pane>
            <n-tab-pane name="add-app" tab="添加应用">
              <add-app :appList="appList"/>
            </n-tab-pane>
          </n-tabs>
        </n-layout-content>
      <n-layout-footer
          position="absolute"
          style="height: 64px; padding: 24px"
          bordered
      >
        使用搜索功能，输入 ai ，选择第一项右边，即可打开插件搜索。有惊喜！！
      </n-layout-footer>
<!--      // 导航栏-->
      <n-tooltip trigger="hover" placement="top">
        <template #trigger>
          <n-button  strong secondary circle  type="success"  class="drawer-btn" @click="showDrawer = !showDrawer" >
            <n-icon ><cash-icon /></n-icon>
          </n-button>
        </template>
        打开导航栏
      </n-tooltip>
    </n-layout>
<!--    // 侧边栏-->
    <n-drawer v-model:show="showDrawer" :width="502" :placement="'left'">
      <n-drawer-content title="导航">
        <n-anchor
            affix
            listen-to=".document-scroll-container"
            :trigger-top="24"
            :top="88"
            style="z-index: 1"
            :bound="24"
        >
          <n-anchor-link title="演示" href="#演示">
            <n-anchor-link title="基础用法" href="#basic.vue" />
            <n-anchor-link title="忽略间隔" href="#ignore-gap.vue" />
            <n-anchor-link title="固定" href="#affix.vue" />
            <n-anchor-link title="滚动到" href="#scrollto.vue" />
          </n-anchor-link>
          <n-anchor-link title="API" href="#API" />
        </n-anchor>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>
<!--<script type="text/javascript" src="../static/vendor/evalCore.min.js"></script>-->
<script lang="ts">
import {
  NTabs, NTabPane, NLayout,NTooltip,
  NLayoutHeader, NLayoutContent,
  NLayoutFooter, NTag, NAffix,NFloatButton,
  NAvatar, NGradientText,NAnchor,NDrawer,
  NAnchorLink, NLayoutSider,NDrawerContent,
  NIcon,NFlex, NDivider, NBadge,NButton,
} from 'naive-ui'
import BasicConfig from './basicConfig.vue'
import PluginAppConfig from './pluginAppConfig.vue'
import AddPlug from './addPlug.vue'
import AddApp from './addApp.vue'
import { CheckmarkCircle,ListCircleSharp as CashIcon } from '@vicons/ionicons5'
import { defineComponent,ref,reactive } from 'vue'
import {tool,menu} from "~background/handleTools";
export default defineComponent({
  name: 'options',
  components: {
    NTabs, NTabPane, NLayout, NLayoutHeader,
    NLayoutContent, NLayoutFooter, NTag,
    NAffix, NAvatar, NGradientText,NDrawerContent,
    NIcon,NFlex,NDivider, NBadge,NDrawer,AddApp,
    NAnchor, NAnchorLink, NLayoutSider,NButton,CashIcon,
    BasicConfig,NFloatButton,NTooltip,PluginAppConfig,AddPlug,
  },
  setup() {
    const containerRef = ref<HTMLElement | undefined>(undefined)
    const showDrawer = ref(false)
    const appList = reactive({})
    const plugList = reactive({})
    const manifest = reactive({});
    const tabsValue = ref('add-plug');
    //! 获取当前ctx的version
    const basemanifest = chrome.runtime.getManifest();
    Object.keys(basemanifest).forEach(tool => {
      manifest[tool] = chrome.runtime.getManifest()[tool];
    });
    //初始化数据
    tool.getAllTools().then(data => {
      console.log(data)
      Object.keys(data).forEach(key => {
        if (data[key] && data[key].type === 'app') {
          appList[key] = data[key]
        }
        if(data[key] && data[key].type === 'plug'){
          plugList[key]= data[key]
        }
      })
      console.log(1,data,appList,plugList)
    })
    //监听地址栏发生变化
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type');
    if ([ 'basic-config', 'plugin-app-config', 'add-plug', 'add-app'].includes(type)){
      tabsValue.value = type
    }

    // 触发多功能搜索框
    return {
      containerRef,
      manifest,
      showDrawer,
      appList,
      plugList,
      tabsValue,
      CheckmarkCircle,
    }
  },

})
</script>

<style scoped>
  * {
    box-sizing: border-box;
  }
  .header {
    padding:5px 5px 0 5px;
  }
  .height-title {
   font-size: 13px;
   padding-left: 5px;
  }
  .header-continer{
    display: flex;
    align-items: center;
  }
  .drawer-btn{
    position: fixed;
    bottom: 24px;
    right: 24px;
    z-index: 1;
    box-shadow:0 2px 8px 0px rgba(0, 0, 0, .16);
  }
  .n-tab-pane{
    padding-left: 20px!important;
  }
</style>