function musicDownload() {


    //GM_deleteValue('iconTop');return;
    //禁止iframe内加载脚本，如：网易云
    if (self.frameElement && self.frameElement.tagName == "IFRAME") {

        return;
    }
    let iconLogoUrl = 'https://navai.vip/images/plug/logoXI.png'
    /*--config--*/
    let {
        couponUrl,
        couponHost,
        webUrl,
        isMobile,
        iconVipTop,
        iconVipPosition,
        iconVipWidth,
        iconVipOpacity,
        couponTimerNum,
        couponWaitTime,
        iconWaitTime,
        selectedLeft,
        selectedRight,
        qqMusicDownload,
        netEaseMusicDownload,
        kugouMusicDownload,
        kuwoMusicDownload,
        ximalayaMusicDownload
    } = {

        couponUrl: window.location.href,

        couponHost: window.location.host,

        webUrl: 'http://music.liuzhijin.cn/',

        isMobile: /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent),

        iconVipTop: 360,

        iconVipPosition: 'left',

        iconVipWidth: 45,

        couponTimerNum: 100,//100次等于10秒

        couponWaitTime: 100,

        iconWaitTime: 100,

        iconVipOpacity: 100,

        selectedLeft: 'selected',

        selectedRight: '',

        qqMusicDownload: 22,

        netEaseMusicDownload: 22,

        kugouMusicDownload: 22,

        kuwoMusicDownload: 22,

        ximalayaMusicDownload: 22,

    }

    /*--lang--*/
    var lang = {
        set: '设置',
        iconPosition: '图标设置',
        playVideo: '音乐解析',
        playMusic: '音乐下载',
        iconHeight: '图标高度',
        iconWidth: '图标大小',
        iconLine: '水平位置',
        iconWaitTime: '等待时间',
        iconLeft: '靠左',
        iconRight: '靠右',
        tipIconHeight: '默认360,建议1~500',
        tipIconWidth: '默认40,建议20~50',
        tipIconOpacity: '请填写0-100的整数',
        tipErrorIconHeight: '<图标位置>中的<图标高度>应为1000以内正整数，建议1~500',
        tipErrorIconWidth: '<图标位置>中的<图标大小>应为100以内正整数，建议20~50',
        tipErrorIconOpacity: '填写数字不正确',
        musicDownload: '音乐下载',
        qqMusicDownload: 'QQ音乐',
        netEaseMusicDownload: '网易云',
        kugouMusicDownload: '酷狗',
        kuwoMusicDownload: '酷我',
        ximalayaMusicDownload: '喜马拉雅',
        scriptsinstall: '脚本安装',
        scriptsuse: '使用方法',
        question: '常见问题',
        tggroup: 'Telegram'
    };

    const musicDownload = [
        {
            funcName: "playMusic",
            name: 'netease',
            match: /^https?:\/\/music\.163\.com/,
            tip: '请在音乐单曲页点击图标下载',
            isOpen: netEaseMusicDownload
        },
        {
            funcName: "playMusic",
            name: 'qq',
            match: /^https?:\/\/y\.qq\.com/,
            tip: '请点击播放需要下载的歌曲，在播放页点击图标下载',
            isOpen: qqMusicDownload
        },
        {
            funcName: "playMusic",
            name: 'kugou',
            match: /kugou\.com/,
            tip: '请点击播放需要下载的歌曲，然后在网页下方播放器内点击"下载"',
            isOpen: kugouMusicDownload
        },
        {
            funcName: "playMusic",
            name: 'kuwo',
            match: /kuwo\.cn/,
            tip: '请点击播放需要下载的歌曲，然后在网页下方播放器内点击"下载"',
            isOpen: kuwoMusicDownload
        },
        {
            funcName: "playMusic",
            name: 'ximalaya',
            match: /^https?:\/\/www\.ximalaya\.com/,
            tip: '请点击播放需要下载的歌曲，然后在网页下方播放器内点击"下载"',
            isOpen: ximalayaMusicDownload
        }
    ];

    /*--create style--*/

    var domHead = document.getElementsByTagName('head')[0];

    var domStyle = document.createElement('style');

    domStyle.type = 'text/css';

    domStyle.rel = 'stylesheet';

    class BaseClass {
        constructor() {
        }

        createElement(dom, domId) {

            var rootElement = document.body;

            var newElement = document.createElement(dom);

            newElement.id = domId;

            var newElementHtmlContent = document.createTextNode('');

            rootElement.appendChild(newElement);

            newElement.appendChild(newElementHtmlContent);

        }

        request(method, url, data, isCookie = '') {

            let request = new XMLHttpRequest();

            return new Promise((resolve, reject) => {

                request.onreadystatechange = function () {

                    if (request.readyState == 4) {

                        if (request.status == 200) {

                            resolve(request.responseText);

                        } else {

                            reject(request.status);
                        }

                    }
                }

                request.open(method, url);
                //request.withCredentials = true;
                if (isCookie) {
                    request.withCredentials = true;
                }
                request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                request.send(data);

            })

        }


        static getElement(css, all = '') {

            return new Promise((resolve, reject) => {

                let num = 0;

                let timer = setInterval(function () {

                    num++

                    let dom;

                    if (all == false) {

                        dom = document.querySelector(css);

                        if (dom) {

                            clearInterval(timer);

                            resolve(dom);

                        }

                    } else {

                        dom = document.querySelectorAll(css);

                        if (dom.length > 0) {

                            clearInterval(timer);

                            resolve(dom);

                        }
                    }

                    if (num == 20) {
                        clearInterval(timer);
                        resolve(false);
                    }

                }, 300)

            })


        }

        static toast(msg, duration) {

            duration = isNaN(duration) ? 3000 : duration;

            let toastDom = document.createElement('div');

            toastDom.innerHTML = msg;

            //toastDom.style.cssText="width: 60%;min-width: 150px;opacity: 0.7;height: 30px;color: rgb(255, 255, 255);line-height: 30px;text-align: center;border-radius: 5px;position: fixed;top: 40%;left: 20%;z-index: 999999;background: rgb(0, 0, 0);font-size: 12px;";
            toastDom.style.cssText = 'padding:2px 15px;min-height: 36px;line-height: 36px;text-align: center;transform: translate(-50%);border-radius: 4px;color: rgb(255, 255, 255);position: fixed;top: 50%;left: 50%;z-index: 9999999;background: rgb(0, 0, 0);font-size: 16px;'

            document.body.appendChild(toastDom);

            setTimeout(function () {

                var d = 0.5;

                toastDom.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';

                toastDom.style.opacity = '0';

                setTimeout(function () {
                    document.body.removeChild(toastDom)
                }, d * 1000);

            }, duration);

        }

        //create zhmLogoIcon
        zhmLogo() {

            var _this = this;

            let sortDiv = iconVipPosition == 'left' ? 'row' : 'row-reverse';

            let playVideoStyle = `
               .zhm_play_vidoe_icon{
                  padding-top:2px;
                  cursor:pointer;
                  z-index:999999;
                  position:fixed;${iconVipPosition}:5px;top:${iconVipTop}px;
                  text-align:center;
                  overflow:visible;
                  display:flex;
                  flex-direction:${sortDiv};
                  width:auto;
               }
               .zhm_play_video_wrap{
                  z-index:9999999;
                  overflow: hidden;
                  width:300px;
               }
               .iconLogo{
               opacity:${iconVipOpacity / 100};
               }
               .zhm_play_video_line{
                  width:320px;
                  height:316px;
                  overflow-y:scroll;
                  overflow-x:hidden;
               }
               .zhm_play_vide_line_ul{
                  width:300px;
                  display: flex;
                  justify-content: flex-start;
                  flex-flow: row wrap;
                  list-style: none;
                  padding:0px;
                  margin:0px;

               }
               .zhm_play_video_line_ul_li{
                  padding:4px 0px;
                  margin:2px;
                  width:30%;
                  color:#FFF;
                  text-align:center;
                  background-color:#f24443;
                  box-shadow:0px 0px 10px #fff;
                  font-size:14px;
               }
               .zhm_play_video_line_ul_li:hover{
                  color:#260033;
                  background-color:#fcc0c0
               }
               .zhm_line_selected{
                  color:#260033;
                  background-color:#fcc0c0
               }

               .zhm_play_video_jx{
                  width:100%;
                  height:100%;
                  z-index:999999;
                  position: absolute;top:0px;padding:0px;
               }
               `;

            domStyle.appendChild(document.createTextNode(playVideoStyle));

            domHead.appendChild(domStyle);

            let playWrapHtml = "<div href='javascript:void(0)' target='_blank' style='' class='playButton zhm_play_vidoe_icon' id='zhmlogo'>";

            playWrapHtml += `<img class='iconLogo' style='width:${iconVipWidth}px;height:${iconVipWidth}px;' src="${iconLogoUrl}">`

            playWrapHtml += "<div>";

            _this.createElement('div', 'zhmIcon');

            let zhmPlay = document.getElementById('zhmIcon');

            zhmPlay.innerHTML = playWrapHtml;

        }

        //左键按下拖动
        //type:根据不同类型，处理图标单击事务
        zhmLogoDrag(type, web) {

            var _this = this;

            var zhmLogoDrag = document.querySelector("#zhmlogo");

            var zhmLogoIcon = document.querySelector(".iconLogo");

            if (!zhmLogoDrag || !zhmLogoIcon) return;
        }

        //下载
        static LR_download(url, filename,event) {

            let ua = navigator.userAgent.toLowerCase();

            if (ua.match(/version\/([\d.]+).*safari/)) {

                window.open(url);

            } else {
                url = url.replace('http://', 'https://');
                fetch(url)
                    .then(res => res.blob())
                    .then(blob => {
                        const a = document.createElement("a");
                        const objectUrl = window.URL.createObjectURL(blob);
                        a.download = filename;
                        console.log(objectUrl, 3);
                        a.href = objectUrl;
                        a.click();
                        console.log(a, 4);
                        window.URL.revokeObjectURL(objectUrl);
                        a.remove();
                        document.querySelector('#zhmlogo').style.pointerEvents = 'auto';
                        document.querySelector('#zhmlogo').style.cursor = 'pointer';
                    })
            }


        }

    }

    class PlayMusicClass extends BaseClass {
        constructor() {
            super();
        }

        xmlyCreateCheckbox() {

            let soundListli = document.querySelectorAll('.sound-list ul li');

            soundListli.forEach(function (item) {

                let checkboxed = item.querySelector('input');

                if (checkboxed) {
                    return;
                }

                let title = item.querySelector('.text');

                if (!title) {
                    return;
                }
                ;

                title.style = "width:360px";

                let src = title.querySelector('a').getAttribute('href');

                let firstDom = item.querySelector('.icon-wrapper');

                let inputDom = firstDom.cloneNode(true);

                inputDom.style = 'min-width: 0px;';

                inputDom.innerHTML = "<input type='checkbox' name='zhmCheckbox' value=" + src + "  class='zhmCheckbox'>";

                firstDom.before(inputDom);

            })

        }
    }


    var nowWeb = [];

    for (let i = 0; i < musicDownload.length; i++) {

        if (location.href.match(musicDownload[i].match) && musicDownload[i].isOpen == 22) {

            nowWeb.push(musicDownload[i]);

            break;
        }

    }

    var baseClass = new BaseClass();


    if (nowWeb.length != 1) {

        console.log('没有匹配该网站或已关闭');
        return;

    }

    function playMusicFunc() {

        if (self.frameElement && self.frameElement.tagName == "IFRAME") {

            return;
        }

        var playMusicClass = new PlayMusicClass();


        //netease 路由两次，需重定义
        const newUrl = location.href;

        let jxMusicWeb = musicDownload.filter(function (item) {
            return newUrl.match(item.match);
        })
        if (jxMusicWeb.length) {

            let timerZhmIcon = setInterval(function () {

                if (document.querySelector('#zhmIcon')) {

                    playMusicClass.zhmLogo();

                    playMusicClass.zhmLogoDrag('music', jxMusicWeb);

                    clearInterval(timerZhmIcon); // 取消定时器

                    if (jxMusicWeb[0].name === 'kuwo' && kuwoMusicDownload === 22) {
                        iconLogoUrl = 'https://navai.vip/images/plug/kuwo.png';
                        let iconLogo = document.querySelector('.iconLogo');
                        iconLogo.setAttribute('src', iconLogoUrl)
                        document.querySelector('#zhmlogo').addEventListener('click', function () {

                            let audioSrc = document.querySelector("audio").src;

                            let songName = document.querySelector('.control .song_name').title;

                            let artist = document.querySelector('.control .artist').title;
                            document.querySelector('#zhmlogo').style.pointerEvents = 'none';
                            document.querySelector('#zhmlogo').style.cursor = 'not-allowed';
                            BaseClass.LR_download(audioSrc, songName + '-' + artist + '.mp3');

                        })
                    }

                    if (jxMusicWeb[0].name === 'ximalaya' && ximalayaMusicDownload === 22) {
                        iconLogoUrl = 'https://navai.vip/images/plug/ximalaya.png';
                        let iconLogo = document.querySelector('.iconLogo');
                        iconLogo.setAttribute('src', iconLogoUrl)
                        //播放器下载事件
                        document.querySelector('#zhmlogo').addEventListener('click', function () {

                            let fmTitle = document.querySelector('.fm-title');

                            let fmTitleMatch = fmTitle.href.match(/^https?:\/\/www\.ximalaya\.com\/sound\/(\S*)$/);

                            let url = 'https://mobile.ximalaya.com/mobile-playpage/track/v3/baseInfo/' + new Date().getTime() + '?device=web&trackId=' + fmTitleMatch[1];

                            playMusicClass.request('get', url).then((result) => {

                                let data = JSON.parse(result);

                                let playUrl = data.trackInfo.playUrlList[1].url;

                                let str1 = playUrl.replaceAll('-', '+');

                                let str2 = str1.replaceAll('_', '/');

                                let num = str2.length % 4;

                                if (num) {

                                    str2 += '===='.substr(num);
                                }

                                let decrypted = CryptoJS.AES.decrypt({

                                    ciphertext: CryptoJS.enc.Base64.parse(str2)

                                }, CryptoJS.enc.Hex.parse("aaad3e4fd540b0f79dca95606e72bf93"), {

                                    mode: CryptoJS.mode.ECB,

                                    padding: CryptoJS.pad.Pkcs7

                                }).toString(CryptoJS.enc.Utf8);

                                console.log(decrypted);

                                if (decrypted) {
                                    document.querySelector('#zhmlogo').style.pointerEvents = 'none';
                                    document.querySelector('#zhmlogo').style.cursor = 'not-allowed';
                                    BaseClass.LR_download(decrypted, data.trackInfo.title + '.mp3');

                                } else {
                                    console.log('解密地址失败');
                                }

                            })

                        })

                        //页面列表创建批量下载
                        let timer = setInterval(function () {

                            let urlMatch = location.href.match(/^https:\/\/www.ximalaya.com\/album\/[0-9]+/);

                            if (urlMatch) {

                                let soundList = document.querySelector('#anchor_sound_list');

                                if (soundList) {

                                    let soundListHead = soundList.querySelector('.head');

                                    let soundListHeadTitle = soundListHead.querySelector('.sort').lastChild;

                                    let batchDownloadDom = document.querySelector('#batchDownload');

                                    if (!batchDownloadDom) {

                                        let data = [{name: '批量下载', id: 'batchDownload'}, {
                                            name: '重置',
                                            id: 'reset'
                                        }, {name: '全选', id: 'selectAll'}];

                                        data.forEach(function (item) {

                                            let control = soundListHeadTitle.cloneNode(true);

                                            control.setAttribute('id', item.id);

                                            control.innerText = item.name;

                                            soundListHeadTitle.after(control);

                                            control.before(" | ");

                                        });

                                        document.querySelector('#selectAll').addEventListener('click', function () {

                                            let zhmCheckbox = soundList.querySelectorAll("input[name='zhmCheckbox']");

                                            zhmCheckbox.forEach(function (item) {

                                                if (!item.checked) {

                                                    item.checked = true;
                                                }

                                            })

                                        });

                                        document.querySelector('#reset').addEventListener('click', function () {

                                            let zhmCheckbox = soundList.querySelectorAll("input[name='zhmCheckbox']");

                                            zhmCheckbox.forEach(function (item) {

                                                item.checked = false;

                                            })

                                        })
                                        //正序倒序事件
                                        soundListHead.querySelector('.sort').firstChild.addEventListener('click', function () {

                                            setTimeout(function () {

                                                playMusicClass.xmlyCreateCheckbox();

                                            }, 2000)

                                        });

                                        soundListHeadTitle.addEventListener('click', function () {

                                            setTimeout(function () {

                                                playMusicClass.xmlyCreateCheckbox();

                                            }, 2000)

                                        });

                                        document.querySelector('#batchDownload').addEventListener('click', function () {

                                            //BaseClass.toast('已下载，请稍候');

                                            let zhmCheckbox = soundList.querySelectorAll("input[name='zhmCheckbox']");

                                            zhmCheckbox.forEach(function (item) {

                                                if (item.checked) {

                                                    let scrMatch = item.value.match(/\/sound\/([0-9]+)/);

                                                    let url = 'https://mobile.ximalaya.com/mobile-playpage/track/v3/baseInfo/' + new Date().getTime() + '?device=web&trackId=' + scrMatch[1];

                                                    playMusicClass.request('get', url).then((result) => {

                                                        let data = JSON.parse(result);

                                                        let playUrl = data.trackInfo.playUrlList[1].url;

                                                        let str1 = playUrl.replaceAll('-', '+');

                                                        let str2 = str1.replaceAll('_', '/');

                                                        let num = str2.length % 4;

                                                        if (num) {

                                                            str2 += '===='.substr(num);
                                                        }

                                                        let decrypted = CryptoJS.AES.decrypt({

                                                            ciphertext: CryptoJS.enc.Base64.parse(str2)

                                                        }, CryptoJS.enc.Hex.parse("aaad3e4fd540b0f79dca95606e72bf93"), {

                                                            mode: CryptoJS.mode.ECB,

                                                            padding: CryptoJS.pad.Pkcs7

                                                        }).toString(CryptoJS.enc.Utf8);

                                                        //console.log(decrypted);

                                                        if (decrypted) {

                                                            BaseClass.LR_download(decrypted, data.trackInfo.title + '.mp3');

                                                        } else {
                                                            console.log('解密地址失败');
                                                        }

                                                    })

                                                }

                                            })

                                        })
                                    }

                                    let zhmCheckbox = document.querySelectorAll('.zhmCheckbox');

                                    if (zhmCheckbox.length == 0) {

                                        playMusicClass.xmlyCreateCheckbox();
                                    }

                                    //翻页事件

                                    let pageBar = document.querySelector('.pagination-page');

                                    if (pageBar) {

                                        pageBar.addEventListener('click', function () {

                                            setTimeout(function () {

                                                playMusicClass.xmlyCreateCheckbox();

                                            }, 2000)

                                        })

                                    }

                                    //跳页事件
                                    let pageLink = document.querySelector('button[type=submit]');

                                    if (pageLink) {

                                        pageLink.addEventListener('click', function () {

                                            setTimeout(function () {

                                                playMusicClass.xmlyCreateCheckbox();

                                            }, 1000)

                                        })
                                    }
                                }
                            } else {
                                console.log('未匹配到列表地址');
                            }

                        }, 500)

                        //全局点击事件
                        document.addEventListener('click', function (e) {

                            var objLink = {};

                            e.path.forEach(function (item) {

                                if (item.href) {

                                    objLink.href = item.href ? item.href : '';

                                    objLink.target = item.target ? item.target : '';

                                    return;
                                }

                            })

                            if (objLink.href && objLink.target != '_blank') {

                                location.href = objLink.href;

                                return;
                            }
                        })

                    }

                    if (jxMusicWeb[0].name === 'kugou' && kugouMusicDownload === 22) {
                        iconLogoUrl = 'https://navai.vip/images/plug/kugou.png';
                        let iconLogo = document.querySelector('.iconLogo');
                        iconLogo.setAttribute('src', iconLogoUrl);
                        let aDom = document.querySelectorAll('a');

                        aDom.forEach(function (item) {

                            let dataObj = item.getAttribute('dataobj');

                            if (dataObj) {

                                item.removeAttribute('dataobj');

                                item.setAttribute('target', '_blank');
                                //console.log(dataObj);
                            }

                        })

                        if (couponUrl.indexOf('mixsong') != -1 || couponUrl.indexOf('song') != -1 || couponUrl.indexOf('share') != -1) {
                            document.querySelector('#zhmlogo').addEventListener('click', function () {

                                let audio = document.querySelector('#myAudio');

                                let audioSrc = audio.getAttribute('src');

                                let singerName = document.querySelector('.singerName').title;

                                let songName = document.querySelector('#songNameTemp').title;
                                document.querySelector('#zhmlogo').style.pointerEvents = 'none';
                                document.querySelector('#zhmlogo').style.cursor = 'not-allowed';
                                BaseClass.LR_download(audioSrc, songName + '-' + singerName.substr(0, singerName.length - 1) + '.mp3');

                            })
                        }

                    }

                    if (jxMusicWeb[0].name === 'netease' && netEaseMusicDownload === 22) {
                        iconLogoUrl = 'https://navai.vip/images/plug/netease.png';
                        let iconLogo = document.querySelector('.iconLogo');
                        iconLogo.setAttribute('src', iconLogoUrl)
                        document.querySelector('#zhmlogo').addEventListener('click', function () {
                            console.log('点击logo', '这里需要下载了');
                            let downloadUrl = document.querySelector('.j-flag.words');
                            let id = '';
                            if (downloadUrl) {
                                let aUrl = downloadUrl.querySelector('a')?.getAttribute('href');
                                if (aUrl) {
                                    let matchResult = aUrl.match(/[?&]id=([^&]*)/);
                                    if (matchResult) {
                                        id = matchResult[1];
                                    }
                                }
                            } else {
                                BaseClass.toast('请先播放歌曲');
                            }
                            if (id) {
                                fetch(`https://api.linhun.vip/api/NetEaseCloud?id=${id}&apiKey=98cfaacda9ef501acb4b5aa7c96fafdb`)
                                    .then(response => response.json())
                                    .then(data => {
                                        if (data.code === 200 && data.MusicLink) {
                                            document.querySelector('#zhmlogo').style.pointerEvents = 'none';
                                            document.querySelector('#zhmlogo').style.cursor = 'not-allowed';
                                            BaseClass.LR_download(data.MusicLink, data.Song || id);
                                        }
                                    })
                                return true;
                            }

                        });
                        return false;
                    }

                    if (jxMusicWeb[0].name ==='qq' && qqMusicDownload === 22) {
                        // 移除QQ音乐弹窗
                        const timer =setInterval(() => {
                            const dialog = document.querySelector('.yqq-dialog-root');
                            console.log('-------------------',dialog);
                            if (dialog) dialog.parentNode.removeChild(dialog);clearInterval(timer);
                        }, 500)


                        iconLogoUrl = 'https://navai.vip/images/plug/qqmusic.png';
                        let iconLogo = document.querySelector('.iconLogo');
                        iconLogo.setAttribute('src', iconLogoUrl)
                        document.querySelector('#zhmlogo').addEventListener('click', function (event) {
                            if (location.href.indexOf('https://y.qq.com/n/ryqq/player') !== -1) {
                                const playerInfo = document.querySelector('.player_music__info');
                                if (playerInfo){
                                    const linkElement = playerInfo.querySelectorAll('a');
                                    let musicName = ''
                                    // 遍历所有元素并获取它们的文本内容
                                    linkElement.forEach(function(element) {
                                        if (element.className !== 'player_music__try'){
                                            musicName+=element.textContent;
                                        }
                                    });
                                    // 请求接口获取歌曲链接
                                    if (musicName.length > 0) {
                                        BaseClass.toast('正在获取歌曲链接...');
                                        fetch(`https://api.linhun.vip/api/qqyy?name=${musicName}&y=1&n=1&apiKey=cabc118a8f4ccac1707f6585c2a8cc7d`)
                                            .then(response => response.json())
                                            .then(data => {
                                                if (data.code === 200 && data.mp3) {
                                                    document.querySelector('#zhmlogo').style.pointerEvents = 'none';
                                                    document.querySelector('#zhmlogo').style.cursor = 'not-allowed';

                                                    BaseClass.LR_download(data.mp3, data.name + data.author || musicName,event);
                                                }else{
                                                    BaseClass.toast('未获取到歌曲名称！ 请联系作者,或刷新页面重试');
                                                }
                                            })
                                            .catch(error => {
                                                console.log(error);
                                                BaseClass.toast('未获取到歌曲名称！ 请联系作者,或刷新页面重试2');
                                            })
                                    }else{
                                        BaseClass.toast('未获取到歌曲名称！ 请联系作者1');
                                    }
                                }

                            }else{
                                BaseClass.toast('请先播放歌曲');
                            }

                        })
                    }

                    let zhmPlay = document.getElementById('zhmIcon');

                } else {

                    playMusicClass.createElement('div', 'zhmIcon');
                }

            })

        } else {

            let zhmPlayDom = document.querySelector('#zhmIcon');

            if (zhmPlayDom) {

                zhmPlayDom.parentNode.removeChild(zhmPlayDom);

            }

            console.log('当前音频网址没有添加匹配或匹配错误');

        }

    }

    playMusicFunc();


}

musicDownload()