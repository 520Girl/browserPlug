<template>
  <div>
    <h1>Welcome to Navai VIP</h1>
    <div class="artplayer-app" ></div>
  </div>
</template>
<script lang="ts">
import Artplayer from 'artplayer';
import artplayerPluginDanmuku from 'artplayer-plugin-danmuku';
import Hls from 'hls.js'

// import 'artplayer/dist/artplayer.css';
import {defineComponent,onMounted} from 'vue'
export default defineComponent({
  name: 'Index',
  setup() {
    function playM3u8(video, url, art) {
      console.log('m3u82', Hls.isSupported());
      if (Hls.isSupported()) {
        if (art.hls) art.hls.destroy();
        const hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(video);
        art.hls = hls;
        art.on('destroy', () => hls.destroy());
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = url;
      } else {
        art.notice.show = 'Unsupported playback format: m3u8';
      }
    }
    onMounted(() => {
      var art = new Artplayer({
        container: '.artplayer-app',
        url: 'https://svipsvip.ffzyread1.com/20240509/26990_e21f6089/2000k/hls/mixed.m3u8',
        // https://www.iyunys.com/681393/28/14.html
        // https://svipsvip.ffzyread1.com/20240509/26990_e21f6089/2000k/hls/mixed.m3u8
        // https://svipsvip.ffzyread1.com/20240509/26990_e21f6089/2000k/hls/491a3122933000004.ts
        customType: {
          m3u8: playM3u8,
          ts:function(video, url, art){
            console.log('ts', video, url, art);
          }
        },
        autoSize: true,
        fullscreen: true,
        fullscreenWeb: true,
        autoOrientation: true,
        flip: true,
        playbackRate: true,
        aspectRatio: true,
        setting: true,
        plugins: [
          artplayerPluginDanmuku({
            danmuku: '/assets/sample/danmuku.xml',
            speed: 5, // 弹幕持续时间，单位秒，范围在[1 ~ 10]
            opacity: 1, // 弹幕透明度，范围在[0 ~ 1]
            fontSize: 25, // 字体大小，支持数字和百分比
            color: '#FFFFFF', // 默认字体颜色
            mode: 0, // 默认模式，0-滚动，1-静止
            margin: [10, '25%'], // 弹幕上下边距，支持数字和百分比
            antiOverlap: true, // 是否防重叠
            useWorker: true, // 是否使用 web worker
            synchronousPlayback: false, // 是否同步到播放速度
            filter: (danmu) => danmu.text.length < 50, // 弹幕过滤函数，返回 true 则可以发送
            lockTime: 5, // 输入框锁定时间，单位秒，范围在[1 ~ 60]
            maxLength: 100, // 输入框最大可输入的字数，范围在[0 ~ 500]
            minWidth: 200, // 输入框最小宽度，范围在[0 ~ 500]，填 0 则为无限制
            maxWidth: 600, // 输入框最大宽度，范围在[0 ~ Infinity]，填 0 则为 100% 宽度
            theme: 'light', // 输入框自定义挂载时的主题色，默认为 dark，可以选填亮色 light
            heatmap: true, // 是否开启弹幕热度图, 默认为 false
            beforeEmit: (danmu) => !!danmu.text.trim(), // 发送弹幕前的自定义校验，返回 true 则可以发送

            // 通过 mount 选项可以自定义输入框挂载的位置，默认挂载于播放器底部，仅在当宽度小于最小值时生效
            // mount: document.querySelector('.artplayer-danmuku'),
          }),
        ],
      });

// 监听手动输入的弹幕，保存到数据库
      art.on('artplayerPluginDanmuku:emit', (danmu) => {
        console.info('新增弹幕', danmu);
      });

// 监听加载到的弹幕数组
      art.on('artplayerPluginDanmuku:loaded', (danmus) => {
        console.info('加载弹幕', danmus.length);
      });

// 监听加载到弹幕的错误
      art.on('artplayerPluginDanmuku:error', (error) => {
        console.info('加载错误', error);
      });

// 监听弹幕配置变化
      art.on('artplayerPluginDanmuku:config', (option) => {
        console.info('配置变化', option);
      });

// 监听弹幕停止
      art.on('artplayerPluginDanmuku:stop', () => {
        console.info('弹幕停止');
      });

// 监听弹幕开始
      art.on('artplayerPluginDanmuku:start', () => {
        console.info('弹幕开始');
      });

// 监听弹幕隐藏
      art.on('artplayerPluginDanmuku:hide', () => {
        console.info('弹幕隐藏');
      });

// 监听弹幕显示
      art.on('artplayerPluginDanmuku:show', () => {
        console.info('弹幕显示');
      });

// 监听弹幕销毁
      art.on('artplayerPluginDanmuku:destroy', () => {
        console.info('弹幕销毁');
      });

    })
    // fetch('https://svipsvip.ffzyread1.com/20240509/26990_e21f6089/index.m3u8')
    //     .then(response => response.text())
    //     .then(data => {
    //       console.log(data)
    //     })
    //     .catch(error => {
    //       console.log(error)
    //     })
  }
})
</script>
<style>

.artplayer-app {
  width: 400px;
  height: 300px;
}
</style>