<template>
  <n-modal
      v-model:show="show"
      class="custom-card"
      preset="card"
      :style="bodyStyle"
      :bordered="false"
  >
    <template #header-extra>
      <n-gradient-text :type="title[1] === '自动保存成功'? 'success' :'warning'">
        {{title[1]}}
      </n-gradient-text>
    </template>
    <template #header>
      {{title[0]}}
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
        <n-button type="info" size="small">
          <template #icon>
            <n-icon>
              <create-icon />
            </n-icon>
          </template>
          创建文件
        </n-button>
        <n-button type="success" size="small">
          <template #icon>
            <n-icon>
              <folder-open-icon />
            </n-icon>
          </template>
          导入文件
        </n-button>
      </n-space>
    </template>
  </n-modal>
</template>
<script lang="ts">
import { h,ref,defineComponent,onMounted,onUnmounted,watch,getCurrentInstance,reactive   } from 'vue'
import type { MenuOption } from 'naive-ui'
import {NButton, NModal,NLayout, NLayoutSider, NMenu, NIcon, NSpace,NGradientText  } from 'naive-ui'
import {BookmarkOutline, CaretDownOutline, Create as CreateIcon, FolderOpen as FolderOpenIcon, LogoJavascript as JsLogo,LogoCss3 as CssLogo} from '@vicons/ionicons5'
import "codemirror/mode/javascript/javascript.js"
import Codemirror from "codemirror-editor-vue3"
import type { CmComponentRef } from "codemirror-editor-vue3"
import type { Editor, EditorConfiguration } from "codemirror"
import {Tpl} from './addPlug.js'
import {devTool} from '~background/handleTools'
import {devToolMap} from "~background/tools";
function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}
const menuOptions: MenuOption[] = [
  {
    label: 'content-script',
    key: 'content-script.js'
  }
]

export default defineComponent({
  name: 'CodeModal',
  props: {
    showModal:{type: Boolean, default: false},
    PlugData:{type:Object,default: {}}
  },
  emits: ['update:showModal','update:PlugData'],
  components: {
    NButton,CreateIcon,NGradientText,
    NModal,FolderOpenIcon,
    NLayout,NSpace,NIcon,
    NLayoutSider,NMenu,Codemirror
  },
  setup(props,{emit}) {
    const { refs } = getCurrentInstance();
    const cmRef = ref<CmComponentRef>()
    const show = ref(props.showModal)
    let PlugData = reactive(props.PlugData)
    const code = ref(Tpl)
    let title = reactive(['编辑文件',''])
    const contentClick=ref('content-script.js')
    const cmOptions: EditorConfiguration = {
      mode: "text/javascript",
      lineNumbers: true
    }
    const onChange = (val: string, cm: Editor) => {
      // console.log('onChange',val)
      // console.log('onChange2',cm.getValue())
    }
    watch([()=>props.PlugData,PlugData], (newVal) => {
      console.log('watch',newVal)
      PlugData = newVal[0]
      // 当是创建时，不存在 name字段
      if (!PlugData.hasOwnProperty('name')){
        // 创建
        console.log('创建')
        console.log(PlugData)
      }else{
        // 更新
        if (PlugData.devToolMap && PlugData.devToolMap.hasOwnProperty('MScript') &&  PlugData.devToolMap.MScript.length > 0){
          const result = PlugData.devToolMap.MScript.find(item => {
            if (item.filename === contentClick.value ){
              return item
            }
          });
          // 这里确认了文件名有相同的， 但无法确认是否是 创建 还是 更新
          if (result) {
            // console.log('code result',result.content)
            cmRef.value?.refresh()
            const regex = /@id\s+(.+)/;
            const match = regex.exec(result.content);
            if (match && match[1] && PlugData.id) {
              console.log('match',PlugData.id)
              code.value = result.content.replace(/(@id\s+)(.+)/,`@id              ${PlugData.id}` );
            }else{
              code.value = result.content
            }
          }

        }
      }
      emit('update:PlugData', newVal[1])
    })
    // mobile 打开 关闭
    watch([() => props.showModal,show], (newVal) => {
      show.value = newVal[0]
      emit('update:showModal', newVal[1])
    })
    //自动保存
    let timeout;
    const autoSave = (val: string) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          saveToLocalStorage(val)
        }, 200);


    }
    // 将数据保存到本地内存中
    const saveToLocalStorage = (val: string) => {
      let obj = {devToolMap:{MPattern:[],MName:'',MScript:[],Nrequirejs:[],MRefresh:0}}
      const regex = /\/\/ ==navai.vip==([\s\S]*?)\/\/ ==\/navai.vip==/;
      const matches = regex.exec(val);
      if (matches) {
        const content = matches[1].trim();
        const idMatch = /@id\s+(.+)/.exec(content);
        const nameMatch = /@name\s+(.+)/.exec(content);
        let urlPatternMatch: RegExpExecArray | string = /@url-pattern\s+(.+)/.exec(content);
        const enableMatch = /@enable\s+(.+)/.exec(content);
        let requireJsMatch: RegExpExecArray | string = /@require-js\s+(.+)/.exec(content);
        const autoRefreshMatch = /@auto-refresh\s+(.+)/.exec(content);
        const updatedMatch = /@updated\s+(.+)/.exec(content);
        // 提取 @id 和 @name 的值
        const id = idMatch ? idMatch[1].trim() : '';
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
        obj.installed = enable
        obj.updated = updated
        obj.devToolMap.MScript = [
          {
            filename: contentClick.value,
            content: val
          }
        ]
        //基础模板
        const basefield = {_devTool:true,noPage:true,menu:false,type:'plug',contentScriptJs:true,contentScriptCss:false,systemInstalled:false}
        obj = Object.assign({},obj,PlugData,basefield)
        console.log('saveToLocalStorage',obj)
        if (!PlugData.hasOwnProperty('id') || !PlugData.id){
          devTool.update(obj.id,obj)
        }else{
          devTool.update(PlugData.id,obj)
        }

        emit('update:PlugData', PlugData)
        console.log('obj',PlugData.id,PlugData.devToolMap.MScript[0].content)
      } else {
        emit('update:PlugData',PlugData)
        title[1] = '内容不符合规范'
        console.log('未找到匹配内容',PlugData);
      }

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
      show,
      title,
      code,
      cmRef,
      cmOptions,
      onChange,
      autoSave,
      onReady,
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