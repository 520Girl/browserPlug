<template>
    <n-list>
      <n-list-item>
<!--          <span class="label-text">添加到右键菜单: </span>-->
          <n-ellipsis style="width: 150px;text-align: right;margin-right: 10px;">
            添加到右键菜单:
            <template #tooltip>
              添加到右键菜单:
            </template>
          </n-ellipsis>
          <n-switch v-model:value="rightMenu">
            <template #icon>
              🤔
            </template>
            <!--      <template #checked>-->
            <!--        将工具添加到右键菜单-->
            <!--      </template>-->
            <!--      <template #unchecked>-->
            <!--        将工具从右键菜单移除-->
            <!--      </template>-->
          </n-switch>
          <n-collapse-transition :show="rightMenu" style="margin-left: 150px;margin-top: 10px;">
            <n-checkbox-group v-model:value="rightMenuList" @update:value="handleUpdateValue">
              <n-space item-style="display: flex;">
                <n-checkbox value="download_crx" label="将分享工具添加到右键菜单" />
                <n-checkbox value="fehelper_setting" label="将设置工具添加到右键菜单" />
                <n-checkbox value="capture_visible_page" label="截取网页快照（快捷键 Ctrl+Shift+S）" />
              </n-space>
            </n-checkbox-group>
          </n-collapse-transition>
      </n-list-item>
      <n-list-item>
<!--        <span class="label-text">禁止在多个 Tab页/窗口 同时打开: </span>-->
        <n-ellipsis style="width: 150px;text-align: right;margin-right: 10px;">
          禁止在多个 Tab页/窗口 同时打开:
          <template #tooltip>
            禁止在多个 Tab页/窗口 同时打开:
          </template>
        </n-ellipsis>
        <n-switch v-model:value="singleWindow">
          <template #icon>
            🥺
          </template>
            <template #checked>
              开启
            </template>
            <template #unchecked>
              禁止
            </template>
        </n-switch>
      </n-list-item>
      <n-list-item>
<!--        <span class="label-text">配置快捷键: </span>-->
        <n-ellipsis style="width: 150px;text-align: right;margin-right: 10px;">
          配置打开插件快捷键:
          <template #tooltip>
            配置打开插件快捷键:
          </template>
        </n-ellipsis>
        <n-gradient-text @click="setShortcuts" type="info" size="14px" style="cursor: pointer;">
          默认快捷键: Alt + Shift + J
        </n-gradient-text>
      </n-list-item>
      <n-list-item>
        <n-ellipsis style="width: 150px;text-align: right;margin-right: 10px;">
          授权FeHelper访问页面所有iframe:
          <template #tooltip>
            授权FeHelper访问页面所有iframe:
          </template>
        </n-ellipsis>
<!--        <span class="label-text">授权FeHelper访问页面所有iframe: </span>-->
        <n-switch v-model:value="iframeAccess">
            <template #checked>
              😄
            </template>
            <template #unchecked>
              😕
            </template>
        </n-switch>
      </n-list-item>
      <n-list-item disabled>
        <n-ellipsis style="width: 150px;text-align: right;margin-right: 10px;" >
          开启页面搜索次数统计功能:
          <template #tooltip>
            开启页面搜索次数统计功能，可统计页面的搜索次数，观察您的偏爱，功能还未完善，请谅解。
          </template>
        </n-ellipsis>
        <!--        <span class="label-text">授权FeHelper访问页面所有iframe: </span>-->
        <n-switch disabled v-model:value="page_search_count">
          <template #checked>
            开启
          </template>
          <template #unchecked>
            关闭
          </template>
        </n-switch>
      </n-list-item>
    </n-list>
</template>


<script lang="ts">
import { NSpace, NSwitch, NCollapseTransition, NCheckboxGroup, NCheckbox,NList, NListItem , NGradientText,NEllipsis } from 'naive-ui'
import {defineComponent, reactive, ref} from 'vue'
import setting from "~options/setting";

export default defineComponent({
  name: 'BasicConfig',
  components: {
    NSpace,NEllipsis,
    NSwitch,NGradientText,
    NCollapseTransition,
    NCheckboxGroup,
    NCheckbox,NList, NListItem
  },
  setup() {
    const rightMenu = ref(false)
    const singleWindow = ref(false)
    const iframeAccess = ref(false)
    const rightMenuList = ref<(string | number)[] | null>(null)
    const page_search_count = ref(false)

    // 获取配置信息
    setting.getOptions('').then(res => {
      console.log('%c 3.options 获取配置信息', "color: red; font-weight: bold;",res)
      Object.keys(res).forEach(key => {
        switch (key) {
          case 'OPT_ITEM_CONTEXTMENUS':
            rightMenu.value = res[key]
            break
          case'FORBID_OPEN_IN_NEW_TAB':
            singleWindow.value = res[key]
            break
          case 'CONTENT_SCRIPT_ALLOW_ALL_FRAMES':
            iframeAccess.value = res[key]
            break
          case 'fehelper_setting':
          case 'download_crx':
          case 'capture_visible_page':
            if (res[key]){
              if (!rightMenuList.value) {
                rightMenuList.value = []
                rightMenuList.value.push(key)
              }else {
                rightMenuList.value.push(key)
              }
            }
            console.log('%c 4.options 组件数据', "color: red; font-weight: bold;",key,rightMenuList)
            break;
          case 'page_search_count':
            page_search_count.value = res[key]
            break;
          default:
            break
        }
      })

    })

    // 多选框更新
    const handleUpdateValue= (value: (string | number)[])=>{
      rightMenuList.value = value
      console.log('%c 5.options 组件数据', "color: red; font-weight: bold;",value)
    }

    const setShortcuts= ()=>{
      chrome.tabs.create({
        url: 'chrome://extensions/shortcuts'
      });
      return false;
    }
    return {
      rightMenu,
      singleWindow,
      iframeAccess,
      rightMenuList,
      page_search_count,
      handleUpdateValue,
      setShortcuts
    }
  }
})
</script>
<style scoped>
  .label-text {
    font-size: 14px;
    color: #666;
    margin-right: 10px;
    width:220px!important;
    text-align: right;
    display: inline-block;
  }
</style>