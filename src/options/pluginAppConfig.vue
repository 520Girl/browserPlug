<template>
  <n-grid cols="10 s:3 m:4 l:5 xl:6 2xl:7" :y-gap="20">
    <n-grid-item :offset="1"  span="0 400:3 600:6 800:9">
      <n-thing content-indented>
        <template v-if="avatar" #avatar>
          <n-avatar>
            <n-icon>
              <cash-icon />
            </n-icon>
          </n-avatar>
        </template>
        <template v-if="header" #header>
          <span style="font-weight: 700;">插件配置</span>
        </template>
        <template v-if="headerExtra" #header-extra>
          <n-button circle size="small">
            <template #icon>
              <cash-icon />
            </template>
          </n-button>
        </template>
        <template v-if="description" #description>
          <span style="color: #919191a3;font-size: 12px;">没有单独的页面，是嵌入页面的插件。</span>
        </template>
        <n-list>
          <n-list-item style="width: 100%;" v-for="(item,key) in plugList" :key="key">
            <!--          <span class="label-text">添加到右键菜单: </span>-->
            <n-ellipsis style="text-align: left;width:85%;">
              <span style="font-weight: 700;padding-right: 5px;">{{item.name }} </span>
              <n-gradient-text :gradient="{deg: 180,from: 'rgb(85, 85, 85)',to: 'rgb(170, 170, 170)'}" :size="12">
                {{item.tips}}
              </n-gradient-text>
              <n-tooltip trigger="hover"  v-if="item.type === 'app'">
                <template #trigger>
                  <n-icon style="padding-left: 3px;" >
                    <svg t="1714873245037" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1078" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16"><path d="M951.901 244.015l-413.3-238.57a33.606 33.606 0 0 0-33.909 0L91.3 244.016c-10.426 6.12-16.99 17.221-16.99 29.346v477.184c0 12.149 6.447 23.343 16.99 29.37l413.3 238.662c5.213 2.933 11.101 4.515 16.99 4.515 5.794 0 11.775-1.582 16.988-4.515l413.3-238.661c10.427-6.121 16.99-17.222 16.99-29.37V273.36a33.908 33.908 0 0 0-16.966-29.346zM892.23 726.016l-370.618 213.97-370.642-213.97v-427.87L521.588 84.178l370.642 213.97v427.869z m8.797 5.073" fill="#1296db" p-id="1079"></path><path d="M285.207 348.393a34.095 34.095 0 0 0-46.336 12.567 33.908 33.908 0 0 0 12.474 46.36l235.94 136.215v269.498a33.745 33.745 0 0 0 33.884 33.885 33.745 33.745 0 0 0 33.886-33.885V543.977L791.9 407.227a34.025 34.025 0 0 0 12.451-46.36 34.025 34.025 0 0 0-46.336-12.474l-236.404 136.54-236.405-136.54z m0 0" fill="#1296db" p-id="1080"></path></svg>
                  </n-icon>
                </template>
                应用
              </n-tooltip>
              <n-tooltip trigger="hover"   v-else>
                <template #trigger>
                  <n-icon  style="padding-left: 3px;">
                    <svg t="1714873918841" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="889" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16"><path d="M448 64a149.333333 149.333333 0 0 1 149.333333 149.333333h85.333334a128 128 0 0 1 127.914666 123.2L810.666667 341.333333v85.333334a149.333333 149.333333 0 0 1 5.12 298.581333L810.666667 725.333333v106.666667a128 128 0 0 1-123.2 127.914667L682.666667 960h-170.666667v-85.333333a64 64 0 0 0-128 0v85.333333H192a128 128 0 0 1-127.914667-123.2L64 832v-192h85.333333a64 64 0 0 0 0-128H64v-170.666667a128 128 0 0 1 123.2-127.914666L192 213.333333h106.666667a149.333333 149.333333 0 0 1 149.333333-149.333333z m277.333333 277.333333a42.666667 42.666667 0 0 0-42.666666-42.666666h-170.666667v-85.333334h-128v85.333334H192a42.666667 42.666667 0 0 0-42.56 39.466666L149.333333 341.333333v85.333334a149.333333 149.333333 0 0 1 5.12 298.581333L149.333333 725.333333v106.666667a42.666667 42.666667 0 0 0 39.466667 42.56L192 874.666667h106.666667a149.333333 149.333333 0 0 1 298.666666 0h85.333334a42.666667 42.666667 0 0 0 42.56-39.466667L725.333333 832v-192h85.333334l3.754666-0.106667A64 64 0 0 0 810.666667 512h-85.333334v-170.666667zM448 149.333333a64 64 0 0 0-63.893333 60.245334L384 213.333333h128a64 64 0 0 0-64-64z" fill="#01ba1e" p-id="890"></path></svg>
                  </n-icon>
                </template>
                插件
              </n-tooltip>
              <n-tooltip trigger="hover"  v-if="item.systemInstalled">
                <template #trigger>
                  <n-icon >
                    <svg t="1714923234642" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="953" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16"><path d="M788.44476429 622.46683433c33.96868425 0 65.36900457 18.22709886 82.21483109 47.72185884l56.36549088 98.62051462a94.69806365 94.69806365 0 0 1 0 93.9524096l-56.33830558 98.61922006A94.69806365 94.69806365 0 0 1 788.44476429 1009.1026963h-111.01960218c-33.96868425 0-65.36900457-18.22709886-82.21612563-47.72185885l-56.36549088-98.61922006a94.69806365 94.69806365 0 0 1 0-93.9524096l56.33830558-98.62051462a94.69806365 94.69806365 0 0 1 82.24201639-47.72185884h111.01960218z m-262.08445124-554.48957788l305.11101977 179.25989262a82.85044939 82.85044939 0 0 1 0 142.88983989l-42.97219792 25.21372192 42.97219792 25.21501645a82.85044939 82.85044939 0 0 1 9.66631728 136.26050938 149.13080889 149.13080889 0 0 0-44.87775827-9.38928608l-7.81512754-0.19418073h-92.9582042L789.49334029 512l-82.76759894-48.63321378-180.3654283 106.0213899a82.85044939 82.85044939 0 0 1-83.95469053 0l-180.41979891-106.04857521L179.27130075 512l305.10972522 179.26118717 52.9427317-31.15176898-46.4247315 81.30347616a149.4492653 149.4492653 0 0 0-13.7531746 32.33886055 82.27049623 82.27049623 0 0 1-34.74152359-11.04629507l-180.41979891-106.04857521-82.71322832 48.66169363 305.10972522 179.25989263 2.67969422-1.54697325 1.85118973 3.59104918 1.98711625 3.53408948 37.06263072 64.9003817-1.60263838 0.96572556a82.85044939 82.85044939 0 0 1-83.95469053 0L137.29589728 776.76285093a82.85044939 82.85044939 0 0 1 0-142.88983989l42.91523824-25.24220176-42.91653277-25.18653661a82.85044939 82.85044939 0 0 1 0-142.88854534l42.91653277-25.21501645-42.91653277-25.21372192a82.85044939 82.85044939 0 0 1 0-142.88983989L442.40562252 68.00444176a82.85044939 82.85044939 0 0 1 83.95469053 0z m262.08445124 637.34002726h-111.01960218a11.84761426 11.84761426 0 0 0-10.27345571 5.96523236l-56.36678543 98.6205146a11.84761426 11.84761426 0 0 0 0 11.76476382l56.33830558 98.61922007a11.84761426 11.84761426 0 0 0 10.30193556 5.96523235h111.01960218a11.84761426 11.84761426 0 0 0 10.27345571-5.96523235l56.3654909-98.61922007 0.99420539-2.29262729a11.84761426 11.84761426 0 0 0-0.99420539-9.47213653l-56.33830559-98.6205146a11.84761426 11.84761426 0 0 0-10.30064102-5.96523236zM732.9349632 760.55134815a55.23406444 55.23406444 0 1 1 0 110.46683434 55.23406444 55.23406444 0 0 1 0-110.46683434z m-248.55134815-621.12981903L179.27259529 318.68271629l305.10972522 179.25989262 305.11101978-179.25989262-305.10972524-179.26118717z" fill="#d4237a" p-id="954"></path></svg>
                  </n-icon>
                </template>
                预装
              </n-tooltip>

            </n-ellipsis>
            <div style="text-align: center;display: inline-block;width: 15%;">
              <n-switch v-model:value="plugList[key].installed" @update:value="handleOffloadInstall(item,key,$event)" :disabled="item.systemInstalled" :loading="pluginLoading" style="margin-right: 2px;" :rail-style="railStyle">
                <template #icon>
                  <n-progress type="circle" :show-indicator="false" :height="24"   style="height:18px;width:18px;font-size: 12px;" :percentage="item.pt" v-if="item.pt" />
                </template>
                <template #checked>卸载</template>
                <template #unchecked>安装</template>
              </n-switch>
              <n-button :type="!plugList[key].menu ? 'success' : 'error'" size="tiny" ghost @click="handleAddMenu(item,key)">
                {{ !plugList[key].menu ? '加入右键' : '移除右键' }}
              </n-button>
            </div>
          </n-list-item>
        </n-list>
      </n-thing>
    </n-grid-item>
    <n-grid-item :offset="1" span="0 400:3 600:6 800:9">
      <n-thing content-indented>
        <template v-if="avatar" #avatar>
          <n-avatar>
            <n-icon>
              <bag-handle-icon />
            </n-icon>
          </n-avatar>
        </template>
        <template v-if="header" #header>
          <span style="font-weight: 700;">应用配置</span>
        </template>
        <template v-if="headerExtra" #header-extra>
          <n-button circle size="small">
            <template #icon>
              <bag-handle-icon />
            </template>
          </n-button>
        </template>
        <template v-if="description" #description>
          <span style="color: #919191a3;font-size: 12px;"> 有单独的页面功能，用于功能的应用。</span>
        </template>
        <n-list>
          <n-list-item style="width: 100%;" v-for="(item,key) in appList" :key="key">
            <!--          <span class="label-text">添加到右键菜单: </span>-->
            <n-ellipsis style="text-align: left;width:85%;">
              <span style="font-weight: 700;padding-right: 5px;">{{item.name}}</span>
              <n-gradient-text :gradient="{deg: 180,from: 'rgb(85, 85, 85)',to: 'rgb(170, 170, 170)'}" :size="12">
                {{item.tips}}
              </n-gradient-text>
              <n-tooltip trigger="hover"  v-if="item.type === 'app'">
                <template #trigger>
                  <n-icon style="padding-left: 3px;" >
                    <svg t="1714873245037" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1078" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16"><path d="M951.901 244.015l-413.3-238.57a33.606 33.606 0 0 0-33.909 0L91.3 244.016c-10.426 6.12-16.99 17.221-16.99 29.346v477.184c0 12.149 6.447 23.343 16.99 29.37l413.3 238.662c5.213 2.933 11.101 4.515 16.99 4.515 5.794 0 11.775-1.582 16.988-4.515l413.3-238.661c10.427-6.121 16.99-17.222 16.99-29.37V273.36a33.908 33.908 0 0 0-16.966-29.346zM892.23 726.016l-370.618 213.97-370.642-213.97v-427.87L521.588 84.178l370.642 213.97v427.869z m8.797 5.073" fill="#1296db" p-id="1079"></path><path d="M285.207 348.393a34.095 34.095 0 0 0-46.336 12.567 33.908 33.908 0 0 0 12.474 46.36l235.94 136.215v269.498a33.745 33.745 0 0 0 33.884 33.885 33.745 33.745 0 0 0 33.886-33.885V543.977L791.9 407.227a34.025 34.025 0 0 0 12.451-46.36 34.025 34.025 0 0 0-46.336-12.474l-236.404 136.54-236.405-136.54z m0 0" fill="#1296db" p-id="1080"></path></svg>
                  </n-icon>
                </template>
                应用
              </n-tooltip>
              <n-tooltip trigger="hover"   v-else>
                <template #trigger>
                  <n-icon  style="padding-left: 3px;">
                    <svg t="1714873918841" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="889" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16"><path d="M448 64a149.333333 149.333333 0 0 1 149.333333 149.333333h85.333334a128 128 0 0 1 127.914666 123.2L810.666667 341.333333v85.333334a149.333333 149.333333 0 0 1 5.12 298.581333L810.666667 725.333333v106.666667a128 128 0 0 1-123.2 127.914667L682.666667 960h-170.666667v-85.333333a64 64 0 0 0-128 0v85.333333H192a128 128 0 0 1-127.914667-123.2L64 832v-192h85.333333a64 64 0 0 0 0-128H64v-170.666667a128 128 0 0 1 123.2-127.914666L192 213.333333h106.666667a149.333333 149.333333 0 0 1 149.333333-149.333333z m277.333333 277.333333a42.666667 42.666667 0 0 0-42.666666-42.666666h-170.666667v-85.333334h-128v85.333334H192a42.666667 42.666667 0 0 0-42.56 39.466666L149.333333 341.333333v85.333334a149.333333 149.333333 0 0 1 5.12 298.581333L149.333333 725.333333v106.666667a42.666667 42.666667 0 0 0 39.466667 42.56L192 874.666667h106.666667a149.333333 149.333333 0 0 1 298.666666 0h85.333334a42.666667 42.666667 0 0 0 42.56-39.466667L725.333333 832v-192h85.333334l3.754666-0.106667A64 64 0 0 0 810.666667 512h-85.333334v-170.666667zM448 149.333333a64 64 0 0 0-63.893333 60.245334L384 213.333333h128a64 64 0 0 0-64-64z" fill="#01ba1e" p-id="890"></path></svg>
                  </n-icon>
                </template>
                插件
              </n-tooltip>
              <n-tooltip trigger="hover"  v-if="item.systemInstalled">
                <template #trigger>
                  <n-icon >
                    <svg t="1714923234642" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="953" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16"><path d="M788.44476429 622.46683433c33.96868425 0 65.36900457 18.22709886 82.21483109 47.72185884l56.36549088 98.62051462a94.69806365 94.69806365 0 0 1 0 93.9524096l-56.33830558 98.61922006A94.69806365 94.69806365 0 0 1 788.44476429 1009.1026963h-111.01960218c-33.96868425 0-65.36900457-18.22709886-82.21612563-47.72185885l-56.36549088-98.61922006a94.69806365 94.69806365 0 0 1 0-93.9524096l56.33830558-98.62051462a94.69806365 94.69806365 0 0 1 82.24201639-47.72185884h111.01960218z m-262.08445124-554.48957788l305.11101977 179.25989262a82.85044939 82.85044939 0 0 1 0 142.88983989l-42.97219792 25.21372192 42.97219792 25.21501645a82.85044939 82.85044939 0 0 1 9.66631728 136.26050938 149.13080889 149.13080889 0 0 0-44.87775827-9.38928608l-7.81512754-0.19418073h-92.9582042L789.49334029 512l-82.76759894-48.63321378-180.3654283 106.0213899a82.85044939 82.85044939 0 0 1-83.95469053 0l-180.41979891-106.04857521L179.27130075 512l305.10972522 179.26118717 52.9427317-31.15176898-46.4247315 81.30347616a149.4492653 149.4492653 0 0 0-13.7531746 32.33886055 82.27049623 82.27049623 0 0 1-34.74152359-11.04629507l-180.41979891-106.04857521-82.71322832 48.66169363 305.10972522 179.25989263 2.67969422-1.54697325 1.85118973 3.59104918 1.98711625 3.53408948 37.06263072 64.9003817-1.60263838 0.96572556a82.85044939 82.85044939 0 0 1-83.95469053 0L137.29589728 776.76285093a82.85044939 82.85044939 0 0 1 0-142.88983989l42.91523824-25.24220176-42.91653277-25.18653661a82.85044939 82.85044939 0 0 1 0-142.88854534l42.91653277-25.21501645-42.91653277-25.21372192a82.85044939 82.85044939 0 0 1 0-142.88983989L442.40562252 68.00444176a82.85044939 82.85044939 0 0 1 83.95469053 0z m262.08445124 637.34002726h-111.01960218a11.84761426 11.84761426 0 0 0-10.27345571 5.96523236l-56.36678543 98.6205146a11.84761426 11.84761426 0 0 0 0 11.76476382l56.33830558 98.61922007a11.84761426 11.84761426 0 0 0 10.30193556 5.96523235h111.01960218a11.84761426 11.84761426 0 0 0 10.27345571-5.96523235l56.3654909-98.61922007 0.99420539-2.29262729a11.84761426 11.84761426 0 0 0-0.99420539-9.47213653l-56.33830559-98.6205146a11.84761426 11.84761426 0 0 0-10.30064102-5.96523236zM732.9349632 760.55134815a55.23406444 55.23406444 0 1 1 0 110.46683434 55.23406444 55.23406444 0 0 1 0-110.46683434z m-248.55134815-621.12981903L179.27259529 318.68271629l305.10972522 179.25989262 305.11101978-179.25989262-305.10972524-179.26118717z" fill="#d4237a" p-id="954"></path></svg>
                  </n-icon>
                </template>
                预装
              </n-tooltip>
            </n-ellipsis>
            <div style="text-align: center;display: inline-block;width: 15%;">
              <n-switch v-model:value="appList[key].installed"  @update:value="handleOffloadInstall(item,key,$event)"  :disabled="item.systemInstalled" :loading="pluginLoading" style="margin-right: 2px;">
                <template #icon>
                  <n-progress type="circle" :show-indicator="false" :height="24"   style="height:18px;width:18px;font-size: 12px;" :percentage="item.pt" v-if="item.pt" />
                </template>
                <template #checked>卸载</template>
                <template #unchecked>安装</template>
              </n-switch>
              <n-button :type="!appList[key].menu ? 'success' : 'error'" size="tiny" :loading="item.menuLoading" ghost @click="handleAddMenu(item,key)" v-if="appList[key].installed" >
                {{ !appList[key].menu ? '加入右键' : '移除右键' }}
              </n-button>
            </div>
          </n-list-item>
        </n-list>
      </n-thing>
    </n-grid-item>
  </n-grid>
</template>
<script lang="ts">
import {
  NGrid, NThing, NAvatar,NProgress,
  NButton, NGridItem, NSpace,NTooltip,
  NIcon, NGradientText, NListItem,
  NCheckbox, NCheckboxGroup, NSwitch,
  NList, NEllipsis, NCollapseTransition
} from 'naive-ui'
import { LogoAppleAppstore as CashIcon,BagHandle as BagHandleIcon } from '@vicons/ionicons5'
import { defineComponent,ref,reactive } from 'vue'
import {storage} from "~background/utils";
import setting from "~options/setting";
import {tool,menu} from "~background/handleTools";

export default defineComponent({
  name: 'PluginAppConfig',
  props:{
    appList:{type:Object,default:{}},
    plugList:{type:Object,default:{}}
  },
  components: {
    NCollapseTransition, NEllipsis, NList, NSwitch, NGradientText,
    NGrid, NAvatar, NButton,BagHandleIcon,NCheckboxGroup,NProgress,
    NGridItem, NThing, CashIcon,NSpace, NIcon,NCheckbox, NListItem,NTooltip
  },
  setup() {
    const avatar = ref(true)
    const header = ref(true)
    const headerExtra = ref(true)
    const description = ref(true)
    const footer = ref(true)
    const action = ref(true)
    const pluginRightMenu = ref(true)
    const pluginLoading = ref(false)
    const addRightMenu = ref(true)
    let pt = ref(0) //安装进度


    // 点击安装和卸载插件
    const handleOffloadInstall = (item,key,event) => {
      if (event) {
        // 安装插件
        item.pt = 0;
        tool.install(key).then(()=>{
          let ptInterval = setInterval(() => {
            item.pt += Math.floor(Math.random() * 20);
            if(item.pt > 100) {
              clearInterval(ptInterval);
              item.pt= 0;
              // 按照安装状态进行排序
              chrome.runtime.sendMessage({
                type: setting.optionsDefault.DYNAMIC_TOOL_INSTALL_OR_OFFLOAD,
                toolName: item.name,
                action: 'install',
                showTips: true
              });
            }
          },100);

        })

      } else {
        // 卸载插件
        if(!confirm('防止误操作；请再次确认是否要卸载这个工具？')) {
          return;
        }
        if (item.systemInstalled === true) {
          return false
        }
        tool.offLoad(key).then(() => {
          chrome.runtime.sendMessage({
            type: setting.optionsDefault.DYNAMIC_TOOL_INSTALL_OR_OFFLOAD,
            action: 'offload',
            showTips: true
          })

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

    // 点击添加右键菜单
    const handleAddMenu = (item,key) => {
      item.menuLoading = true;
      if(!item.menu){
        item.menu = true;
        menu.menuMgr(key,'install').then(()=>{
          chrome.runtime.sendMessage({
            type: setting.optionsDefault.DYNAMIC_TOOL_INSTALL_OR_OFFLOAD,
            action: `menu-install`,
            showTips: true,
            menuOnly: true
          });
        })
      }else{
        item.menu = false;
        menu.menuMgr(key,'offload').then(()=>{
          chrome.runtime.sendMessage({
            type: setting.optionsDefault.DYNAMIC_TOOL_INSTALL_OR_OFFLOAD,
            action: `menu-offload`,
            showTips: true,
            menuOnly: true
          });
        })
      }
      setTimeout(() => {
        item.menuLoading = false;
      },500)
    }

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
      avatar, header, headerExtra, description, footer, action, pluginRightMenu,pluginLoading,addRightMenu,
      handleOffloadInstall,railStyle,pt,handleAddMenu
    }
  }
})

</script>
<style scoped>
.n-list .n-list-item{
  padding:5px 0;
}
.n-thing-main__description{
  color: #888;
  font-size: 12px;
}
.icon{
  vertical-align: middle;
}
</style>