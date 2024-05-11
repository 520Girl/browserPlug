<template>
  <n-grid  cols="2 750:3 1000:3 1200:4 1400:5 1660:6" :y-gap="20" x-gap="10">
    <n-grid-item class="item" v-for="(item, key) in plugList" :key="key">
      <n-thing class="item-content" style="">
          <template v-if="avatar" #avatar>
            <n-badge dot>
                <n-avatar v-if="item.icon" :src="item.icon" style="background-color:transparent;" />
                <n-avatar v-else>
                  {{ 'name' in item && item.name.length > 1 ? item.name.charAt(0) : 'N'}}
                </n-avatar>
            </n-badge>
          </template>
          <template v-if="header" #header>
          {{item.name}}
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
          </template>
          <template v-if="headerExtra" #header-extra>
            <n-popconfirm positive-text="确定" negative-text="取消" @positive-click="remove(item,key)">
              <template #trigger>
                <n-button circle :disabled="item.systemInstalled" :type="item.systemInstalled ? 'error' : ''" size="small">
                  <template #icon>
                    <close-circle-icon />
                  </template>
                </n-button>
              </template>
              {{item.name}} 确定要删除吗？
            </n-popconfirm>
          </template>
          <template v-if="description" #description>
            <span style="color: #888;font-size: 12px;">{{item.tips}}</span>
          </template>
          <template v-if="action" #action>
            <n-space align="baseline" :wrap="false">
              <n-button strong secondary size="small" type="primary" @click="handleEdit(true,item,key)"  >
                修改
              </n-button>
              <n-button strong secondary size="small"  color="#8a2be2" disabled >
                下载
              </n-button>
              <n-button strong secondary size="small" disabled  color="#46abe6" >
                更新
              </n-button>
              <n-button strong secondary size="small"  :disabled="item.systemInstalled" :type="item.installed === true ? 'success' : 'warning'" style="text-align: right;" @click="handleUninstall(key)">
                {{item.installed === true ? '关闭': '开启'}}
              </n-button>
            </n-space>
          </template>
        </n-thing>
    </n-grid-item>
    <n-grid-item class="item" >
      <n-thing class="item-content" style="margin:auto;height: 100%;text-align: center;width: 100%;box-sizing: border-box;align-items: center;" >
          <svg @click="handleEdit(false)" height="60" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208s208-93.31 208-208S370.69 48 256 48zm80 224h-64v64a16 16 0 0 1-32 0v-64h-64a16 16 0 0 1 0-32h64v-64a16 16 0 0 1 32 0v64h64a16 16 0 0 1 0 32z" fill="currentColor"></path></svg>
      </n-thing>
    </n-grid-item>
  </n-grid>
  <n-modal
      v-model:show="show"
      class="custom-card"
      preset="card"
      :style="bodyStyle"
      :bordered="false"
  >
    <template #header-extra>
      <n-gradient-text type="info" :size="12">
        1s后数据将会自动保存，不符合要求将不会保存！！！
      </n-gradient-text>
    </template>
    <template #header>
      {{title}}
    </template>
    <n-layout has-sider>
      <n-layout-sider
          bordered
          collapse-mode="width"
          :collapsed-width="64"
          :width="200"
          :collapsed="collapsed"
          show-trigger
          @collapse="collapsed = true"
          @expand="collapsed = false"
      >
        <n-menu
            :collapsed="collapsed"
            :collapsed-width="64"
            :collapsed-icon-size="22"
            :options="menuOptions"
            default-value="'content-script.js'"
            v-model:value="contentClick"
            :render-label="renderMenuLabel"
            :render-icon="renderMenuIcon"
            :expand-icon="expandIcon"
            :on-update:value="onUpdated"

        />
      </n-layout-sider>
      <n-layout>
        <Codemirror
            v-if="contentClick === 'content-script.js'"
            v-model:value="code"
            :options="cmOptions"
            :autofocus="true"
            border
            ref="cmRef"
            height="99%"
            @change="onChange"
            @input="autoSave"
            @ready="onReady"
            style="box-sizing: border-box;"
        >
        </Codemirror>
      </n-layout>
    </n-layout>
    <template #footer>
      <n-space>
        <n-button type="info" size="small" disabled>
          <template #icon>
            <n-icon>
              <create-icon />
            </n-icon>
          </template>
          创建文件
        </n-button>
        <n-button type="success" size="small" disabled>
          <template #icon>
            <n-icon>
              <folder-open-icon />
            </n-icon>
          </template>
          导入文件
        </n-button>
        <n-button type="success" size="small" color="#8a2be2" @click="TPLSave">
          <template #icon>
            <n-icon>
              <albums-sharp />
            </n-icon>
          </template>
          使用模板
        </n-button>
      </n-space>
    </template>
  </n-modal>
</template>
<script lang="ts">
import {
  NAvatar, NButton, NEllipsis, NPopconfirm, NGrid,
  NSkeleton, NSwitch, NThing, NCard, NSpace,
  NGridItem, NIcon, NList, NListItem,
  NBadge, NTooltip, NMenu, NGradientText, NLayout,
  NLayoutSider, NModal,createDiscreteApi,
  type MenuOption,
} from 'naive-ui'
import {
  LogoAppleAppstore as CashIcon,
  CloseCircleSharp as CloseCircleIcon,
  BagHandle as BagHandleIcon,
  Create as CreateIcon,
  FolderOpen as FolderOpenIcon,
  LogoJavascript as JsLogo,
  LogoCss3 as CssLogo,AlbumsSharp,
  BookmarkOutline, CaretDownOutline
} from '@vicons/ionicons5'
import { h,ref,defineComponent,onMounted,onUnmounted,watch,getCurrentInstance,reactive  } from 'vue'
import CodeModal from "~options/CodeModal.vue";
import {Tpl} from './addPlug.js'
import {devTool} from '~background/handleTools'
import {devToolMap} from "~background/tools";
import Codemirror from "codemirror-editor-vue3";
import "codemirror/mode/javascript/javascript.js"
import type { CmComponentRef } from "codemirror-editor-vue3"
import type { Editor, EditorConfiguration } from "codemirror"
import setting from "~options/setting";

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}
let menuOptions: MenuOption[] = [
  {
    label: 'content-script.js',
    key: 'content-script.js'
  }
]
export default defineComponent({
  name: 'AddPlug',
  props:{
    plugList:{type:Object,default:()=>{}}
  },
  components: {
    NModal, NLayoutSider, Codemirror, NLayout, NGradientText, NMenu,
    NTooltip ,CreateIcon,FolderOpenIcon,
    NBadge,NPopconfirm,CodeModal,AlbumsSharp,
    NThing, NEllipsis, NButton, NList, NSwitch, NAvatar, NIcon, NListItem,
    NGrid,NSkeleton,CashIcon,BagHandleIcon,CloseCircleIcon,
    NGridItem,NCard,NSpace,
  },
  setup(props) {
    const avatar = ref(true)
    const header = ref(true)
    const headerExtra = ref(true)
    const description = ref(true)
    const footer = ref(true)
    const action = ref(true)
    const PlugData = ref({devToolMap:devToolMap.navaiVip})
    const cmRef = ref<CmComponentRef>()
    const show = ref(false)
    const code = ref(Tpl)
    const {message} = createDiscreteApi(["message"])
    let title = ref('编辑文件')
    const contentClick=ref('content-script.js')
    const cmOptions: EditorConfiguration = {
      mode: "text/javascript",
      lineNumbers: true
    }
    //! 1.编辑插件 创建插件 true 编辑 false 创建
    let isEdit = false
    const handleEdit = (status: boolean, item: any,key:string) => {
      // chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      //   if (!tabs[0] && tabs[0].status === 'complete') return false;
      //   const currentTabId = tabs[0].id;
      //   let request = {
      //     type: 'request-monkey-start',
      //     params:{
      //       allFrames: true,
      //       tabId:currentTabId,
      //       url:tabs[0].url,
      //       tool:{}
      //     }
      //   };
      //   chrome.runtime.sendMessage(request,(res)=>{
      //     console.log('获取插件信息 注入的回调函数',res)
      //   });
      // });
      if (status){
        isEdit = true
        title.value = `编辑文件 ${item.name}`
        //todo 1.1 data 是插件信息,打开模态框 将原始数据备份到 PlugData 中
        Object.keys(item).forEach(keys => {
          PlugData.value[keys] = item[keys]
        })
        devTool.get(key).then((res: any) => {
          // TplCode 是插件代码信息
          PlugData.value.devToolMap = res
          ////todo 1.2 文件类型同步
          if (PlugData.value.devToolMap.MScript.length > 0) {
            menuOptions =[]
            //todo 1.3 匹配默认选中文件
            const  findContentFile=PlugData.value.devToolMap.MScript.find(item => {
              if (item.filename === 'content-script.js'){
                contentClick.value = 'content-script.js'
                code.value = item.content
              }
            })
            if (!findContentFile){
              contentClick.value = PlugData.value.devToolMap.MScript[0].filename
              code.value = PlugData.value.devToolMap.MScript[0].content
            }
          }
          //todo 1.4 配置menu 选项
          PlugData.value.devToolMap.MScript.forEach(item => {
            menuOptions.push({
              label: item.filename,
              key: item.filename
            })
          })
          show.value = true
          //todo 1.5 code不符合要求
          const matches = ruleCode(code.value)
          if (!matches){
            message.error('内容不符合规范，将不会保存！！',{ duration: 1000 })
            return
          }
        })
        PlugData.value.id = key
        console.log('修改数据',PlugData.value)
        console.log('修改文件menu',menuOptions,contentClick.value)
      }else{
        isEdit = false
        title.value = '创建文件'
        PlugData.value.devToolMap = devToolMap.navaiVip
        PlugData.value.devToolMap.MScript =[{filename:'content-script.js',content:Tpl}]
        //todo 1.6 code不符合要求
        code.value = Tpl
        const matches = ruleCode(code.value)
        if (!matches){
          message.error('内容不符合规范，将不会保存！！',{ duration: 600 })
          return
        }
        show.value = true
        console.log('初始化创建数据',PlugData.value)
      }

    }

    //!2. 检测切换 menu
    const onUpdated =(key,item)=>{
      code.value = item.content
    }
    //!3 修改文件后 自动保存到本地
    //todo 3.1自动保存
    let timeout;
    const autoSave = (val: string) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        saveToLocalStorage(val)
      }, 1000);
    }
    //todo 3.2 将数据保存到本地内存中
    const saveToLocalStorage = (val: string) => {
      //todo 3.3 匹配 code 中的内容 @id @name @url-pattern等
      let obj = {devToolMap:{MPattern:[],MName:'',MScript:[],Nrequirejs:[],MRefresh:0}}
      const matches = ruleCode(val)
      if (matches) {
        const content = matches[1].trim();
        const idMatch = /@id\s+(.+)/.exec(content);
        const nameMatch = /@name\s+(.+)/.exec(content);
        let urlPatternMatch: RegExpExecArray | string = /@url-pattern\s+(.+)/.exec(content);
        const enableMatch = /@enable\s+(.+)/.exec(content);
        let requireJsMatch: RegExpExecArray | string = /@require-js\s+(.+)/.exec(content);
        const autoRefreshMatch = /@auto-refresh\s+(.+)/.exec(content);
        const tipsMatch = /@tips\s+(.+)/.exec(content);
        const updatedMatch = /@updated\s+(.+)/.exec(content);
        // 提取 @id 和 @name 的值
        const id = idMatch ? idMatch[1].trim() : '';
        const tips = tipsMatch ? tipsMatch[1].trim() : '';
        const name = nameMatch ? nameMatch[1].trim() : '';
        let urlPattern = [];
        if (urlPatternMatch) {
          urlPatternMatch = urlPatternMatch[1].replace(/'/g, '"');
          urlPattern = JSON.parse(urlPatternMatch);
        }
        // const urlPattern = urlPatternMatch ? JSON.parse(urlPatternMatch[1])  : [];
        const enable = enableMatch ? enableMatch[1].trim() : '';
        let requireJs = []
        if (requireJsMatch){
          requireJsMatch = requireJsMatch[1].replace(/'/g, '"');
          requireJs = JSON.parse(requireJsMatch);
        }
        const autoRefresh = autoRefreshMatch ? autoRefreshMatch[1].trim() : '';
        const updated = updatedMatch ? updatedMatch[1].trim() : '';
        obj.name = name
        obj.devToolMap.MName = name
        obj.devToolMap.MPattern = urlPattern
        obj.devToolMap.Nrequirejs = requireJs
        obj.devToolMap.MRefresh = parseInt(autoRefresh)
        obj.installed = !!enable
        obj.updated = updated
        obj.tips = tips
        obj._id = id
        obj.devToolMap.MScript = [
          {
            filename: contentClick.value,
            content: val
          }
        ]
        //todo 3.4 更新 or 创建
        const basefield = {_devTool:true,noPage:true,menu:false,type:'plug',contentScriptJs:true,contentScriptCss:false,systemInstalled:false}

        if (isEdit){
          if (PlugData.value.id){
            PlugData.value = Object.assign(basefield,PlugData.value,obj)
            devTool.update(PlugData.value.id,PlugData.value).then((res: any) => {
              props.plugList[PlugData.value.id] = PlugData.value
              message.success('修改成功',{ duration: 600 })
            })
          }else{
            message.error('id 出问题',{ duration: 600 })
          }

        }else{
          obj= {...basefield,...obj}
          if (obj._id){
            devTool.update(obj._id,obj).then((res: any) => {
              props.plugList[obj._id] = obj
              message.success('创建成功',{ duration: 600 })
            })
          }else{
            message.error('id 出问题',{ duration: 600 })
          }
        }
      } else {
        message.error('内容不符合规范，将不会保存！！',{ duration: 600 })
        console.log('未找到匹配内容',PlugData);
      }

    }

    //!4. 检测一下插件的代码是否符合规范
    const ruleCode = (code)=>{
      const regex = /\/\/ ==navai.vip==([\s\S]*?)\/\/ ==\/navai.vip==/;
      const matches = regex.exec(code);
      return matches
    }
    //!5. 删除插件
    const remove = (item: any,id:string) => {
      console.log('删除插件',item,id)
      devTool.remove(id).then(() => {
        delete props.plugList[id]
        message.success('删除成功',{ duration: 1000 })
      })
    }

    //!6. 卸载插件
    watch(show,()=>{
      handleSyncMessage()
    })
    //todo 6.1 监听插件安装或卸载
    const handleUninstall = (id:string) => {
      if (props.plugList[id].installed){
        devTool.offLoad(id).then(() => {
          props.plugList[id].installed = !props.plugList[id].installed
          handleSyncMessage()
          message.success('卸载成功',{ duration: 1000 })
        })
      }else{
        devTool.update(id,{installed:true}).then(() => {
          props.plugList[id].installed = !props.plugList[id].installed
          handleSyncMessage()
          message.info('安装成功',{ duration: 1000 })
        })
      }
    }

    //! 7. 发送消息同步插件
    const handleSyncMessage = () => {
      chrome.runtime.sendMessage({
        type: setting.optionsDefault.DYNAMIC_TOOL_INSTALL_OR_OFFLOAD,
        toolName: '',
        action: 'install',
        showTips: false
      });
    }

    //! 使用模板
    const TPLSave = () => {
      handleEdit(false)
      autoSave(code.value)
    }
    const onChange = (val: string, cm: Editor) => {
      // console.log('onChange',val)
      // console.log('onChange2',cm.getValue())
    }


    //
    const onReady = (cm: Editor) => {
      cm.refresh()
      cm.focus()
    }
    onMounted(() => {
      setTimeout(() => {
        cmRef.value?.refresh()
      }, 1000)

      setTimeout(() => {
        // cmRef.value?.resize(300, 200)
      }, 2000)

      setTimeout(() => {
        cmRef.value?.cminstance.isClean()
      }, 3000)
    })

    onUnmounted(() => {
      cmRef.value?.destroy()
      cmRef.value?.refresh()
    })

    return {
      avatar, header, headerExtra, description, footer, action,handleEdit,PlugData,TPLSave,
      show, title, code, cmRef, cmOptions, onChange, autoSave, onReady,onUpdated,remove,handleUninstall,
      collapsed: ref(true),
      contentClick,
      bodyStyle: {
        width: '80%',
        height: '80vh'
      },
      menuOptions,
      renderMenuLabel (option: MenuOption) {
        // if ('href' in option) {
        //   return h(
        //       'a',
        //       { href: option.href, target: '_blank' },
        //       option.label as string
        //   )
        // }
        console.log(option)
        return option.label as string
      },
      renderMenuIcon (option: MenuOption) {
        // 渲染图标占位符以保持缩进
        if (option.key === 'sheep-man') return true
        // 返回 falsy 值，不再渲染图标及占位符
        if (option.key.indexOf('.js') > -1) {
          return h(NIcon, null, { default: () => h(JsLogo) })
        }else if (option.key.indexOf('.css') >-1) {
          return h(NIcon, null, { default: () => h(CssLogo) })
        }else{
          return h(NIcon, null, { default: () => h(BookmarkOutline) })
        }
      },
      expandIcon () {
        return h(NIcon, null, { default: () => h(CaretDownOutline) })
      }
    }
  }
})
</script>
<style scoped>
.n-thing .n-thing-main .n-thing-main__description{
    color: #888!important;
    font-size: 12px!important;
  }
.item{
  border: 1px solid #efeff5; box-shadow: 0 0 10px rgba(0,0,0,0.1);border-radius: 5px;
}
.item-content{
  padding:5px;
}
.icon{
  vertical-align: middle;
}
.n-layout--static-positioned{
  height: 100%;
}
>>>.CodeMirror-gutters{
  left: 0!important;
}
>>>.CodeMirror-linenumber.CodeMirror-gutter-elt{
  left:0!important;
}
>>>.CodeMirror-gutter-wrapper{
  left:-38.5px!important;
}

</style>