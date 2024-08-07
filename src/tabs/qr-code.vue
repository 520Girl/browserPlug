<template>
  <n-layout embedded content-style="padding: 24px;" position="absolute">
    <n-layout embedded content-style="padding: 24px;" position="absolute">
      <n-layout-header>
        <n-flex align="center" justify="space-between" class="header">
          <div class="header-continer">
            <n-avatar
                round
                size="small"
                :src="'/'+icons[32]"
            />
            <n-gradient-text type="info" class="height-title">
              {{qrEncodeMode? '生成' : '解码'}}二维码
            </n-gradient-text>
          </div>
        </n-flex>
      </n-layout-header>
      <n-layout-content  content-style="padding: 10px 24px;">
        <n-split direction="vertical" :default-size="0.4">
          <template #1>
            <n-flex vertical align="center" justify="center">
              <n-qr-code
                  :value="qrcode"
                  :color="color"
                  id="qr-code"
                  v-model:icon-src="thumbnailUrl"
                  :background-color="qrBgColor"
                  :size="size"
                  v-if="qrEncodeMode"
              />
              <div id="qr-code"  v-else>

              </div>
<!--              <n-avatar-->
<!--                  v-else-->
<!--                  id="qr-code"-->
<!--                  :src="qrcodeDecodeUrl"-->
<!--              />-->
            </n-flex>
          </template>
          <template #2>
            <n-flex vertical align="center" justify="center" style="margin-top: 10px;margin-left: 20px;margin-right: 20px;">
              <n-input v-model:value="qrcode" autofocus  type="textarea" />
              <div class="btn-group">
                <n-input-number v-model:value="size"  :disabled="!qrEncodeMode" />
                <n-color-picker v-model:value="color"   :disabled="!qrEncodeMode" style="width:33.3%" />
                <n-color-picker v-model:value="qrBgColor"  :disabled="!qrEncodeMode" style="width:33.3%" />
                <n-button @click="handleDownloadQRCode">
                  下载
                </n-button>
              </div>
              <n-upload
                  list-type="image"
                  @before-upload="beforeUpload"
                  @remove="handleRemove"
                  style="text-align: center;"
                  :disabled="!qrEncodeMode"
                  :create-thumbnail-url="createThumbnailUrl"
              >
                <n-button>上传文件</n-button>
              </n-upload>
            </n-flex>
          </template>
        </n-split>


      </n-layout-content>
      <n-layout-footer
          position="absolute"
          style="height: 64px; padding: 24px"
          bordered
      ></n-layout-footer>
    </n-layout>
  </n-layout>

</template>
<script lang="ts">
import {defineComponent, reactive, ref,watch} from 'vue'
import setting from '../options/setting'
import jsQR from "jsqr";
import {
  NColorPicker,
  NQrCode, NInputNumber,
  NFlex, NButton, NUpload,
  NLayout, UploadFileInfo, createDiscreteApi,
  NLayoutHeader, UploadSettledFileInfo,
  NLayoutContent,
  NLayoutFooter,
  NTag, NInput,
  NBadge, NIcon, NGradientText, NAvatar, NSplit,
} from 'naive-ui'
import weatherIcon from "~popup/weatherIcon.vue";
export default defineComponent({
  name: 'QrCode',
  components: {
    weatherIcon,NUpload,
    NSplit,NInput,
    NAvatar, NGradientText, NIcon, NBadge, NTag,
    NLayoutFooter,NInputNumber,
    NLayoutContent,
    NLayoutHeader,
    NLayout,NButton,
    NColorPicker,
    NQrCode,
    NFlex,
  },
  setup() {
    const color = ref('#225A95FF')
    const size = ref(200)
    const {icons} = chrome.runtime.getManifest();
    const thumbnailUrl = ref('')
    const qrcode = ref(`https://${setting.optionsDefault.DEV_REQUEST_URL}`);
    const {message} = createDiscreteApi(["message"])
    const qrBgColor = ref('#F5F5F5')
    const qrEncodeMode = ref(true)
    const qrcodeDecodeUrl = ref('')

    //! 数据初始化 获取 点击menu 传过来的数据
    let mode = new URL(location.href).searchParams.get('mode');
    qrEncodeMode.value = mode !== 'decode';

    chrome.tabs.query({currentWindow: true,active: true, }, (tabs) => {
      let activeTab = tabs.filter(tab => tab.active)[0];
      chrome.runtime.sendMessage({
        type: 'fh-dynamic-any-thing',
        thing: 'request-page-content',
        tabId: activeTab.id
      }).then(resp => {
        console.log('获取页面内容',resp)
        console.log('解码',qrcodeDecodeUrl.value)
        if(!resp) return ;
        let text = resp.content || (resp.tab ? (resp.tab.fromTab ? resp.tab.fromTab.url : '') : '');
        if (text) {

          if (qrEncodeMode.value){
            // 转为二维码
            qrcode.value = text
          }else{
            // 解码
            decodeQRCode(text)
            qrcode.value = text
          }

        }
      });
    });
    //! 下载二维码
    const handleDownloadQRCode = () => {
      const canvas = document
          .querySelector('#qr-code')
          ?.querySelector<HTMLCanvasElement>('canvas')
      if (canvas) {
        // 创建带有白边的新画布
        const borderedCanvas = document.createElement('canvas');
        const bCtx = borderedCanvas.getContext('2d');
        const borderSize = 10; // 设定白边的大小
        borderedCanvas.width = canvas.width + 2 * borderSize;
        borderedCanvas.height = canvas.height + 2 * borderSize;

        // 绘制白色背景
        bCtx.fillStyle = qrBgColor.value; // 设置为白色
        bCtx.fillRect(0, 0, borderedCanvas.width, borderedCanvas.height);

        // 在新画布上绘制原始图像
        bCtx.drawImage(canvas, borderSize, borderSize);

        // 获取包含白边的数据 URL
        const url = borderedCanvas.toDataURL();

        // 创建链接并下载图片
        const a = document.createElement('a');
        a.download = 'QRCode.png';
        a.href = url;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    }
    //! 上传图片生成略缩图
   const createThumbnailUrl = (file: File | null, fileInfo: UploadSettledFileInfo): Promise<string> | undefined  => {
     if (!file) return undefined
     return new Promise((resolve) => {
       const img = new Image()
       img.src = URL.createObjectURL(file)
       img.onload = () => {
         const canvas = document.createElement('canvas')
         const ctx = canvas.getContext('2d')
         const maxSize = 100
         let width = img.width
         let height = img.height
         if (width > height) {
           if (width > maxSize) {
             height *= maxSize / width
             width = maxSize
           }
         } else {
           if (height > maxSize) {
             width *= maxSize / height
             height = maxSize
           }
         }
         canvas.width = width
         canvas.height = height
         ctx.drawImage(img, 0, 0, width, height)
         const url = canvas.toDataURL()
         thumbnailUrl.value = url
         resolve(url)
       }
     })
   }

   //! 上传类型判断
   const beforeUpload = async (data: {
     file: UploadFileInfo
     fileList: UploadFileInfo[]
   }) => {
      let fileClass = ['image/png', 'image/jpeg', 'image/gif', 'image/webp']
     if (!fileClass.includes(data.file.file?.type)) {
       message.error('只能上传png格式的图片文件，请重新上传')
       return false
     }
     return true
   }

   //! 移除上传文件
   const handleRemove = (file: UploadFileInfo) => {
     console.log(thumbnailUrl.value, '移除上传文件')
      console.log(file, '移除上传文件')
     thumbnailUrl.value = ''
     console.log(thumbnailUrl.value, '移除上传文件')
   }

   //! 解码
   const decodeQRCode = (url) => {
      console.log('解码1',url)
     const img = new Image()
     img.src = url
     img.onload = () => {
       const canvas = document.createElement('canvas')
       const ctx = canvas.getContext('2d')
       const maxSize = 100
       let width = img.width
       let height = img.height
       if (width > height) {
         if (width > maxSize) {
           height *= maxSize / width
           width = maxSize
         }
       } else {
         if (height > maxSize) {
           width *= maxSize / height
           height = maxSize
         }
       }
       canvas.width = width
       canvas.height = height
       ctx.fillStyle = qrBgColor.value; // 设置为白色
       ctx.fillRect(0, 0, width, height);
       // 先绘制原始图像 才能得到正确的二维码数据
       ctx.drawImage(img, 0, 0, width, height)

       // 使用 jsQR 库识别二维码
       const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
       console.log('解码',imageData)
       const code = jsQR(imageData.data, imageData.width, imageData.height);
       if (code) {
         qrcode.value = code.data
         message.success(`识别成功：${code.data}`)

         console.log('解码',code.data)
       } else {
         message.error('未识别到二维码')
       }

       // 绘制图片
       document.querySelector('#qr-code').appendChild(canvas);
       console.log('解码2',url,canvas)
     }
     img.onerror = () => {
       qrcodeDecodeUrl.value = url
     }

   }
    return {
      color,
      qrBgColor,
      icons,
      size,
      qrcode,
      handleDownloadQRCode,
      thumbnailUrl,
      createThumbnailUrl,
      beforeUpload,
      handleRemove,
      qrEncodeMode,
      qrcodeDecodeUrl
    }
  }
})
</script>
<style scoped>
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
.btn-group{
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
  width: 100%;
}
>>>.n-layout-content{
  height: 83%;
}
</style>