console.log('-------------------------------------------------')

function videoDownload() {
    'use strict';

    /*--config--*/
    let {
        couponUrl,
        couponHost,
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
        dyVideoDownload,
        ksVideoDownload,
        xiguaVideoDownload,
        biliVideoDownload,
        youtubeVideoDownload
    } = {

        couponUrl: window.location.href,

        couponHost: window.location.host,

        isMobile: /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent),

        iconVipTop: 360,

        iconVipPosition: 'left',

        iconVipWidth: 40,

        couponTimerNum: 100,//100次等于10秒

        couponWaitTime: 100,

        iconWaitTime: 100,

        iconVipOpacity: 100,

        selectedLeft: 'selected',

        selectedRight: '',

        dyVideoDownload: 22,

        ksVideoDownload: 22,

        xiguaVideoDownload: 22,

        biliVideoDownload: 22,

        youtubeVideoDownload: 22,
    }
    /*--lang--*/
    var lang = {
        videoDownload: '设置',
        dyVideoDownload: '抖音下载',
        ksVideoDownload: '快手下载',
        xiguaVideoDownload: '西瓜下载',
        biliVideoDownload: 'B站 (bilibili) 下载',
        youtubeVideoDownload: 'youtube下载',
        scriptsinstall: '脚本安装',
        scriptsuse: '使用方法',
        question: '常见问题',
        tggroup: 'Telegram'
    };

    var videoDownload = [
        {
            funcName: 'videoDownload',
            name: 'dyVideoDownload',
            match: /^https?:\/\/www\.douyin\.com\/?.+$/,
            isWebOpen: dyVideoDownload
        },
        {
            funcName: 'videoDownload',
            name: 'ksVideoDownload',
            match: /^https?:\/\/www\.kuaishou\.com\/?.+$/,
            isWebOpen: ksVideoDownload
        },
        {
            funcName: 'videoDownload',
            name: 'xiguaVideoDownload',
            match: /^https?:\/\/www\.ixigua\.com\//,
            isWebOpen: xiguaVideoDownload
        },
        {
            funcName: 'videoDownload',
            name: 'biliVideoDownload',
            match: /^https?:\/\/www\.bilibili\.com\//,
            isWebOpen: biliVideoDownload
        },
        {
            funcName: 'videoDownload',
            name: 'youtubeVideoDownload',
            match: /^https?:\/\/www\.youtube\.com/,
            isWebOpen: youtubeVideoDownload
        }
    ];

    var downloadOption = [{name: '直接下载', id: 'toDownload'}, {name: '复制链接', id: 'toCopy'}, {
        name: '打开文件',
        id: 'toLink'
    }];

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

        getQueryString(e) {
            var t = new RegExp("(^|&)" + e + "=([^&]*)(&|$)");
            var a = window.location.search.substr(1).match(t);
            if (a != null) return a[2];
            return "";
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

        //下载
        static LR_download(url, filename) {

            let ua = navigator.userAgent.toLowerCase();

            console.log(ua.match(/version\/([\d.]+).*safari/));

            if (ua.match(/version\/([\d.]+).*safari/)) {

                window.open(url);

            } else {

                url = url.replace('http://', 'https://');
                console.log(url, 2);
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
                    })
                // GM_download(url, filename);
            }


        }

        static copyToClipboard(text) {

            let input = document.createElement('input');

            input.value = text;

            document.body.appendChild(input);

            input.select();

            document.execCommand('Copy');

            document.body.removeChild(input);

        }
    }

    class VideoDownloadClass extends BaseClass {

        constructor() {
            super();
        }

        dyVideoDownload() {

            var _this = this;

            let timer = setInterval(function () {

                //! 1.获取所有视频
                let videoDomAll = document.querySelectorAll('video');

                //console.log(videoDomAll);return;

                if (videoDomAll.length == 0) return;

                //! 2.获取当前视频
                let videoAll = [];

                for (let i = 0; i < videoDomAll.length; i++) {

                    let autoplay = videoDomAll[i].getAttribute('autoplay');

                    if (autoplay !== null) {

                        videoAll.push(videoDomAll[i]);

                    }

                }
                let videoContainer = location.href.indexOf('modal_id') != -1 ? videoAll[0] : videoAll[videoAll.length - 1];

                if (!videoContainer) return;

                //! 3.视频地址
                let url = videoContainer && videoContainer.children.length > 0 && videoContainer.children[0].src ? videoContainer.children[0].src : videoContainer.src;

                //视频ID

                let videoId;

                //let resp = url.match(/^(https:)?\/\/v[0-9]+-weba?\.douyinvod\.com\/([a-zA-Z0-9]+)\/[a-zA-Z0-9]+\/video/);

                let resp = url.match(/^(https:)?\/\/.+\.com\/([a-zA-Z0-9]+)\/[a-zA-Z0-9]+\/video/);

                let res = url.match(/blob:https:\/\/www.douyin.com\/(.*)/);

                if (resp && resp[2]) {

                    videoId = resp[2];

                } else if (res && res[1]) {

                    videoId = res[1]

                } else {

                    videoId = videoContainer.getAttribute('data-xgplayerid')
                }

                //console.log(videoId);
                //! 4.所有视频操作按钮区域
                let playContainer = videoContainer.parentNode.parentNode.querySelector('.xg-right-grid');

                if (!playContainer) return;

                let videoDownloadDom = playContainer.querySelector('#zhmDyDownload' + videoId);

                if (videoDownloadDom) {

                    let dom = playContainer.querySelectorAll('.xgplayer-playclarity-setting');

                    for (let n = 0; n < dom.length; n++) {

                        let btn = dom[n].querySelector('.btn');

                        if (dom[n].id != 'zhmDyDownload' + videoId && btn.innerText == '下载') {

                            dom[n].parentNode.removeChild(dom[n]);
                        }

                    }

                    return;

                }

                if (videoContainer && playContainer) {

                    let playClarityDom = playContainer.querySelector('.xgplayer-playclarity-setting');

                    if (!playClarityDom) {
                        console.log('未获取智能按钮元素');
                        return;
                    }

                    let palyClarityBtn = playClarityDom.querySelector('.btn');

                    if (!palyClarityBtn) {
                        console.log('未获取智能文本元素');
                        return;
                    }

                    let downloadDom = playClarityDom.cloneNode(true);

                    downloadDom.setAttribute('id', 'zhmDyDownload' + videoId);

                    if (location.href.indexOf('search') == -1) {

                        downloadDom.style = 'margin-top:-68px;padding-top:100px;padding-left:20px;padding-right:20px;';

                    } else {

                        downloadDom.style = 'margin-top:0px;padding-top:100px;';
                    }
                    //! 5.下载按钮
                    let downloadText = downloadDom.querySelector('.btn');

                    downloadText.innerText = '下载';

                    downloadText.style = 'font-size:12px;font-weight:600;';

                    downloadText.setAttribute('id', 'zhmDouyinDownload' + videoId);

                    let detail = playContainer.querySelector('xg-icon:nth-of-type(1)').children[0];

                    let linkUrl = detail.getAttribute('href') ? detail.getAttribute('href') : location.href;

                    if (linkUrl.indexOf('www.douyin.com') == -1) {

                        linkUrl = '//www.douyin.com' + linkUrl;
                    }

                    downloadText.setAttribute('data-url', linkUrl);

                    downloadText.removeAttribute('target');

                    downloadText.setAttribute('href', 'javascript:void(0);');

                    let virtualDom = downloadDom.querySelector('.virtual');

                    downloadDom.onmouseover = function () {

                        //downloadDom.className='xgplayer-playclarity-setting';

                        if (location.href.indexOf('search') == -1) {

                            virtualDom.style = 'display:block !important';

                        } else {

                            virtualDom.style = 'display:block !important;margin-bottom:37px;';
                        }

                    }

                    downloadDom.onmouseout = function () {

                        //downloadDom.className='xgplayer-playclarity-setting disappear';
                        virtualDom.style = 'display:none !important';
                    }

                    let downloadHtml = '';

                    downloadOption.forEach(function (item) {

                        downloadHtml += `<div class="item ${item.id}" id="${item.id}${videoId}">${item.name}</div>`;

                    })

                    if (downloadDom.querySelector('.virtual')) {

                        downloadDom.querySelector('.virtual').innerHTML = downloadHtml;

                    }

                    //playContainer.appendChild(downloadDom);

                    playClarityDom.after(downloadDom);
                    //! 6. 复制链接按钮
                    let toLinkDom = playContainer.querySelector('#toLink' + videoId);

                    if (toLinkDom) {

                        toLinkDom.addEventListener('click', function () {

                            if (url.match(/^blob/)) {

                                BaseClass.toast('加密视频地址，无法直接打开');

                            } else {

                                window.open(url);
                            }

                        })

                    }

                    let toDownloadDom = playContainer.querySelector('#toDownload' + videoId);

                    if (toDownloadDom) {

                        toDownloadDom.addEventListener('click', function () {
                            //console.log(url);return;

                            if (url.match(/^blob/)) {

                                BaseClass.toast('加密视频地址，无法下载');

                            } else {

                                BaseClass.toast('正在下载请稍侯');

                                let infoDom = playContainer.parentNode.parentNode.parentNode.querySelector('.video-info-detail');

                                let descInfo = infoDom ? infoDom : document.querySelector('.z8_VexPf');

                                let filename;

                                if (descInfo && descInfo.innerText && descInfo.innerText.replaceAll('.', '')) {

                                    filename = descInfo.innerText.replaceAll('.', '') + '.mp4';

                                } else {

                                    filename = new Date().getTime() + '.mp4';
                                }

                                BaseClass.LR_download(url, filename);
                            }
                        })

                    }

                    let toCopyDom = playContainer.querySelector('#toCopy' + videoId);

                    if (toCopyDom) {

                        toCopyDom.addEventListener('click', function () {

                            BaseClass.toast('已复制到剪贴板');

                            BaseClass.copyToClipboard(url);
                        })
                    }

                }

                //clearInterval(timer);

            }, 100)

        }

        ksVideoDownload() {

            var _this = this;
            const soundBtn = document.getElementsByClassName('kwai-player-volume-container player-bar-volume')
            console.log('检测到快手视频播放页 存在哦', soundBtn);
            if (soundBtn) {
                async function getControls() {

                    let videoDomArr = await BaseClass.getElement('.player-video', 1);

                    if (!videoDomArr) {

                        console.log('没有找到DOM');
                        return;

                    }
                    let videoDom = videoDomArr.length > 2 ? videoDomArr[1] : videoDomArr[0];

                    if (videoDom.getAttribute('src').match(/^blob/)) {
                        //删除残留下载DOM
                        /*
                        let videoDownloadDom = document.querySelector('#zhmKsDownload');

                        if(videoDownloadDom){
                            videoDownloadDom.parentNode.removeChild(videoDownloadDom);
                        }
                        */
                        console.log('blob视频无法下载');
                        return;
                    }

                    _this.createKsVideoDownload(videoDom);

                    videoDom.addEventListener('playing', function () { //播放中
                        console.log("播放中");
                    });

                    videoDom.addEventListener('ended', function () { //结束

                        console.log("播放结束");

                        //getControls();

                        let autoPlay = document.querySelector('.auto-warpper').getAttribute('autoplay');

                        if (autoPlay) {
                            getControls();
                            return;

                        }

                    }, false);

                    document.querySelector('#toDownload').addEventListener('click', function () {

                        BaseClass.toast('正在下载请稍侯');

                        let playTimeTotal = document.querySelector('.total').innerText;

                        let second = playTimeTotal.match(/(.+):(.+)/);

                        let secondTotal = second[1] * 60 + parseInt(second[2]);

                        let dataUrl = document.querySelector('#zhmKsDownload').getAttribute('data-url');

                        let account = document.querySelector('.profile-user-name-title') ? document.querySelector('.profile-user-name-title').innerText : document.querySelector('.feed-author').innerText;

                        let title = document.querySelector('.video-info-title') ? document.querySelector('.video-info-title').innerText : new Date().getTime();

                        let videoFileName = (account && title) ? account + '-' + title + '.mp4' : new Date().getTime() + '.mp4';

                        BaseClass.LR_download(dataUrl, videoFileName);

                        /*

                            if(secondTotal<30){

                                let videoFileName = new Date().getTime()+'.mp4';

                                GM_download(dataUrl,videoFileName);

                            }else{

                                window.open(dataUrl);
                            }
                            */
                    })

                    document.querySelector('#toCopy').addEventListener('click', function () {

                        BaseClass.toast('已复制到剪贴板');

                        BaseClass.copyToClipboard(videoDom.getAttribute('src'));
                    })

                    document.querySelector('#toLink').addEventListener('click', function () {

                        window.open(videoDom.getAttribute('src'));

                    })

                }

                getControls();

                document.addEventListener('click', function (e) {

                    getControls();

                })

                window.addEventListener("wheel", getControls);

                window.addEventListener('keydown', function (e) {

                    if (e.code == 'ArrowDown' || e.code == 'ArrowUp') {

                        getControls();
                    }

                })
            } else {
                console.log('未获取音量按钮元素');
                return;
            }

        }

        createKsVideoDownload(videoDom) {

            let match = /^https?:\/\/www\.kuaishou\.com\/(.+)/;

            let resp = location.href.match(match);

            if (!resp || (resp[1].indexOf('short-video') == -1 && resp[1].indexOf('video') == -1 && resp[1].indexOf('new-reco') == -1)) {

                console.log('当前不是视频播放页');
                return;
            }

            if (resp[1].indexOf('short-video') != -1) {

                let playerArea = document.querySelector('.video-container-player');

                let playerAreaWidth = playerArea.style.width.match(/(.+)px/);

                let playerBarProgress = document.querySelector('.player-bar-progress');

                playerBarProgress.style.width = playerAreaWidth[1] - 320 + 'px';

                let timeTotal = document.querySelector('.total');

                timeTotal.style.right = '180px';
            }

            let controls = document.querySelector('.right');

            let videoDownloadDom = document.querySelector('#zhmKsDownload');

            if (videoDownloadDom) {

                videoDownloadDom.parentNode.removeChild(videoDownloadDom);
            }

            let detailDom = controls.querySelector('div:nth-of-type(1)');

            let xgIcon = detailDom.cloneNode(true);

            let linkUrl = videoDom.getAttribute('src');

            xgIcon.querySelector('.kwai-player-volume-sound').innerHTML = "<div style='cursor:pointer;'>下载</div>";

            let slider = xgIcon.querySelector('.pl-slider');

            //slider.style = 'width:49px;padding:10px 5px 20px;';

            let downloadList = '';

            downloadOption.forEach(function (item) {

                downloadList += `<div style="margin-top:10px;color:#FFF;cursor:pointer;" id="${item.id}">${item.name}</div>`;

            })

            slider.innerHTML = downloadList;

            xgIcon.setAttribute('data-url', linkUrl);

            xgIcon.setAttribute('id', 'zhmKsDownload');

            xgIcon.style = 'height:80px;';

            detailDom.before(xgIcon);

            xgIcon.onmouseover = function () {

                //downloadDom.className='xgplayer-playclarity-setting';

                slider.style = 'margin-top:10px;width:49px;padding:10px 5px 20px;display:block !important';

            }

            xgIcon.onmouseout = function () {

                //downloadDom.className='xgplayer-playclarity-setting disappear';
                slider.style = 'display:none !important';
            }

            return;
            //重构播放操作按钮

            let zhmKsButton = document.querySelector('#zhmKsButton');

            //console.log(zhmKsButton);

            if (zhmKsButton) {

                //zhmKsButton.parentNode.removeChild(zhmKsButton);

                return false;
            }

            let buttonIcon = detailDom.cloneNode(true);
            //console.log(buttonIcon);
            buttonIcon.setAttribute('id', 'zhmKsButton');

            let buttonIconImg = buttonIcon.querySelector('.unmuted-icon');

            if (buttonIconImg) {
                buttonIconImg.style = 'background: url(https://s2-10623.kwimgs.com/udata/pkg/cloudcdn/img/player-setting.ad1f5ce8.svg) no-repeat';
            }
            detailDom.after(buttonIcon);

            let plSlider = buttonIcon.querySelector('.pl-slider');

            plSlider.style = 'width:auto;padding:10px 10px 25px 10px;';

            plSlider.innerHTML = "";

            let buttonFour = controls.querySelector('div:nth-of-type(4)');

            buttonFour.style.margin = '0px';

            let autoPlay = document.querySelector('.play-setting-container');

            if (autoPlay) {
                autoPlay.style.margin = '0px 40px 0px 0px';
            }
            let buttonFive = controls.querySelector('div:nth-of-type(5)');

            if (buttonFive) {

                buttonFive.style.margin = '15px 0px';

                buttonFive.onmouseover = function () {

                    setTimeout(function () {

                        let toolTip = document.querySelector('.kwai-player-rotate-tooltip');

                        if (toolTip) {

                            toolTip.parentNode.removeChild(toolTip);
                        }


                    }, 30)

                }

                plSlider.appendChild(buttonFive);
            }
            let buttonSix = controls.querySelector('div:nth-of-type(6)');

            if (buttonSix) {

                buttonSix.style.margin = '15px 0px';

                let toolTip = document.querySelector('.kwai-player-fullscreen-tooltip');

                buttonSix.onmouseover = function () {

                    setTimeout(function () {

                        let toolTip = document.querySelector('.kwai-player-fullscreen-tooltip');

                        if (toolTip) {

                            toolTip.parentNode.removeChild(toolTip);

                        }

                    }, 30)

                }

                plSlider.appendChild(buttonSix);
            }
            plSlider.appendChild(buttonFour);

        }

        xiguaVideoDownload() {

            var _this = this;

            async function getControls() {

                let videoDom = await BaseClass.getElement('video');
                if (!videoDom) {

                    console.log('没有找到DOM');
                    return;

                }

                _this.createXiguaVideoDownload();
                // 存在跨域的问题，解决方法是通过 background.js 发送消息给 content.js 进行解析
                const options = {
                    method: "get",
                    height: {'Accept': 'text/plain, text/html,application/json'},
                    data: ''
                }
                let url = 'http://47.99.158.118/video-crack/v2/parse?content=' + encodeURIComponent(location.href)
                chrome.runtime.sendMessage({
                    type: 'fh-dynamic-any-thing',
                    thing: 'videoDownload',
                    params: {
                        url: url,
                        options: options
                    }
                }).then(res => {
                    if (res.msg === 'success') {
                        let videoSrc = '';

                        if (res.code === 0) {

                            videoSrc = res.data.url;

                        }
                        console.log(videoSrc);
                        document.querySelector('#toDownload').addEventListener('click', function () {

                            if (!videoSrc) {

                                BaseClass.toast('该视频无法下载');

                                return;
                            }

                            let videoTitle = document.querySelector('.videoTitle h1').innerText;

                            let videoAuthor = document.querySelector('.author__userName').title;

                            BaseClass.toast('正在下载请稍侯');

                            BaseClass.LR_download(videoSrc, videoTitle + '@' + videoAuthor + '.mp4');
                        })

                        document.querySelector('#toCopy').addEventListener('click', function () {

                            if (!videoSrc) {

                                BaseClass.toast('该视频不能复制地址');

                                return;
                            }

                            BaseClass.toast('已复制到剪贴板');

                            BaseClass.copyToClipboard(videoSrc);
                        })

                        document.querySelector('#toLink').addEventListener('click', function () {

                            if (!videoSrc) {

                                BaseClass.toast('该视频不能直接打开');

                                return;
                            }

                            window.open(videoSrc);

                        })

                        document.addEventListener('click', function (e) {

                            e && e.path && e.path.forEach(function (item) {

                                if (item.className == 'xgplayer-control-item control_playnext common-control-item') {

                                    setTimeout(function () {

                                        location.reload();

                                        return;

                                    }, 1000)

                                }
                                ;

                            })

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
                })
                document.querySelector('video').addEventListener('ended', function () { //结束

                    console.log("播放结束");
                    /*
                        let autoPlay = document.querySelector('.xg-switch-checked');

                        if(autoPlay){

                            getControls();
                            return;
                        }
*/
                    setTimeout(function () {

                        location.reload();

                    }, 5500);

                }, false);

            }

            getControls();
        }

        createXiguaVideoDownload() {
            let rightGrid = document.querySelector('.xg-right-grid');

            let playControl = rightGrid.querySelector('div:nth-of-type(2)');

            let control = playControl.cloneNode(true);

            let entry = control.querySelector('.xgplayer-control-item__entry');

            entry.innerHTML = '<div class="xgpcPlayer_textEntry"><span>下载</span></div>';

            let popover = control.querySelector('.xgplayer-control-item__popover');

            let downloadList = '<ul>';

            downloadOption.forEach(function (item) {

                downloadList += `<li tabindex="0" role="menuitemradio" aria-checked="false" id="${item.id}">${item.name}</li>`;

            })

            downloadList += '</ul>';

            popover.innerHTML = downloadList;

            playControl.before(control);

            let divDom = document.createElement('div');

            divDom.style = "width: 80px; height: 140px;position:absolute;bottom:40px;left:20px;z-index:-1";

            control.appendChild(divDom);

            control.onmouseover = function () {

                popover.style.display = 'block';

            }

            control.onmouseout = function () {

                popover.style.display = 'none';

            }


        }

        biliVideoDownload() {

            var _this = this;
            const playerWrap = document.getElementById('bilibili-player');
            if (playerWrap) {
                async function getControls() {

                    if (location.href.indexOf('bangumi') != -1) {

                        let rightControl = await BaseClass.getElement('.squirtle-controller-wrap-right');

                        if (!rightControl) {

                            console.log('没有找到DOM');
                            return;
                        }

                        _this.createBiliVideoDownload();

                    } else {

                        let n = 0;

                        let timer = setInterval(function () {

                            let dom = document.querySelector('.bilibili-player-video-btn-quality');

                            let domOther = document.querySelector('.bpx-player-ctrl-quality');

                            if (dom) {

                                clearInterval(timer);

                                _this.createBiliVideoDownload();

                                return;

                            } else if (domOther) {

                                clearInterval(timer);

                                _this.createBiliVideoDownloadOther();

                                return;

                            } else {
                                if (n++ > 30) clearInterval(timer);
                            }

                        }, 100)

                        return;

                    }

                    //_this.createBiliVideoDownload();

                    let timerZhmIcon = setInterval(function () {

                        let videoDom = [{name: 'video', type: 'dom'}, {
                            name: 'bwp_video',
                            type: 'dom'
                        }, {name: '.bilibili-player-video', type: 'class'}];

                        for (let i = 0; i < videoDom.length; i++) {

                            let video = videoDom[i].type == 'dom' ? document.querySelector(videoDom[i].name) : document.querySelector(videoDom[i].name).firstChild;

                            if (video) {

                                clearInterval(timerZhmIcon); //取消定时器

                                video.addEventListener('play', function () {

                                    console.log("播放开始");

                                    _this.createBiliVideoDownload();
                                });

                                video.addEventListener('ended', function () { //结束

                                    if (location.href.indexOf('bangumi') != -1) {

                                        let biliDownload = document.querySelector('#biliDownload');

                                        console.log(biliDownload);

                                        biliDownload.parentNode.removeChild(biliDownload);

                                    }
                                })

                                break;

                            }

                        }
                        ;

                    })

                }

                getControls();
                //屏蔽登录弹框
                let video = document.querySelector('video');

                if (video) {

                    video.addEventListener('pause', function () {
                        console.log("暂停");
                        setTimeout(function () {

                            let closeIcon = document.querySelector('.bili-mini-close-icon');

                            console.log(closeIcon);

                            if (closeIcon) {

                                closeIcon.click();

                                video.play();

                            }
                            ;

                        }, 50);

                    });

                }
                ;
            } else {
                console.log('Dom元素不存在');
            }


        }

        createBiliVideoDownload() {

            var _this = this;

            async function getControls() {

                let downloadIcon = document.querySelector('#biliDownload');

                if (downloadIcon) {
                    console.log('下载按钮已存在');
                    return;
                }

                if (location.href.indexOf('bangumi') != -1) {

                    let quality = await BaseClass.getElement('.squirtle-quality-wrap');

                    if (!quality) {

                        console.log('没有找到DOM');
                        return;
                    }

                    let control = quality.cloneNode(true);

                    console.log(control.querySelector('.squirtle-video-quality-text'));

                    control.querySelector('.squirtle-video-quality-text').innerText = '下载';

                    control.setAttribute('id', 'biliDownload');

                    quality.before(control);

                } else if (location.href.indexOf('video') != -1) {

                    let autoIconDom = await BaseClass.getElement('.bilibili-player-video-btn-quality');

                    if (!autoIconDom) {

                        console.log('没有找到DOM');
                        return;

                    }

                    let control = autoIconDom.cloneNode(true);

                    control.style = 'margin-right:20px;';

                    control.querySelector('.bui-select-result').innerText = '下载';

                    control.querySelector('.bui-select-result').setAttribute('id', 'biliDownload');

                    autoIconDom.before(control);

                } else {

                    console.log('当前页面不是视频或番剧');
                    return;

                }

                document.querySelector('#biliDownload').addEventListener('click', function () {

                    let bvid = '', avid = '';

                    if (location.href.indexOf('bangumi') != -1) {

                        bvid = document.querySelector('.av-link').innerText;

                    } else if (location.href.indexOf('video') != -1) {

                        let params = location.href.match(/https:\/\/www.bilibili.com\/video\/(.+)\?/);

                        if (params[1].indexOf('av') != -1) {

                            avid = params[1].replace('av', '');

                        } else {

                            bvid = params[1].substring(params[1].length - 1) == '/' ? params[1].substring(0, params[1].length - 1) : params[1];
                        }

                    } else {

                        BaseClass.toast('当前页面无法下载');
                        return;
                    }

                    if (!bvid && !avid) {

                        console.log('未获取bvid或avid');
                        return;
                    }

                    let url = "https://api.bilibili.com/x/web-interface/view?bvid=" + bvid + "&aid=" + avid;

                    let uri = _this.request('get', url).then((result) => {

                        let resp = JSON.parse(result);

                        if (resp.code < 0) {

                            BaseClass.toast('该视频无法下载');

                            console.log('视频信息接口返回数据错误');
                            return;
                        }

                        //选集cid

                        let pageId = _this.getQueryString('p');

                        let cid = '';

                        if (pageId) {

                            cid = resp.data.pages[pageId - 1].cid;

                        } else {

                            cid = resp.data.cid;
                        }

                        console.log(cid);

                        let link = 'https://api.bilibili.com/x/player/playurl?avid=' + resp.data.aid + '&cid=' + cid + '&qn=112';

                        let res = _this.request('get', link).then((result) => {

                            let data = JSON.parse(result);

                            if (data.code < 0) {
                                BaseClass.toast('该视频无法下载');
                                console.log('视频地址接口返回数据错误');
                                return;
                            }

                            let downloadUrl = data.data.durl[0].url;

                            //GM_download(downloadUrl);

                            window.open(downloadUrl);

                        })

                    })
                })

            }

            getControls();

        }

        createBiliVideoDownloadOther() {

            var _this = this;

            async function getControls() {

                let downloadIcon = document.querySelector('#biliDownload');

                if (downloadIcon) {
                    console.log('下载按钮已存在');
                    return;
                }

                if (location.href.indexOf('bangumi') != -1) {

                    let quality = await BaseClass.getElement('.squirtle-quality-wrap');

                    if (!quality) {

                        console.log('没有找到DOM');
                        return;
                    }

                    let control = quality.cloneNode(true);

                    control.querySelector('.squirtle-video-quality-text').innerText = '下载';

                    control.setAttribute('id', 'biliDownload');

                    quality.before(control);

                } else if (location.href.indexOf('video') != -1 || location.href.indexOf('festival') != -1) {

                    let autoIconDom = await BaseClass.getElement('.bpx-player-ctrl-quality');

                    if (!autoIconDom) {

                        console.log('没有找到DOM');
                        return;

                    }

                    let control = autoIconDom.cloneNode(true);

                    console.log(control);

                    control.style = 'margin-top:-80px;padding-top:80px;margin-right:20px;';

                    control.querySelector('.bpx-player-ctrl-quality-result').innerText = '下载';

                    control.querySelector('.bpx-player-ctrl-quality-menu').setAttribute('id', 'biliDownload');

                    let menuItems = control.querySelectorAll('.bpx-player-ctrl-quality-menu-item');

                    menuItems.forEach(function (item) {

                        let dataValue = item.getAttribute('data-Value');

                        if (dataValue != 16 && dataValue != 80) {

                            item.parentNode.removeChild(item);
                        }

                    });

                    autoIconDom.before(control);

                    control.onmouseover = function () {

                        control.className = 'bpx-player-ctrl-btn bpx-player-ctrl-quality bpx-state-show';

                    }

                    control.onmouseout = function () {

                        control.className = 'bpx-player-ctrl-btn bpx-player-ctrl-quality';
                    }

                } else {

                    console.log('当前页面不是视频或番剧');
                    return;

                }

                document.querySelector('#biliDownload').addEventListener('click', function (e) {

                    let biliDataValue = e.target.getAttribute('data-Value') ? e.target.getAttribute('data-Value') : '';

                    if (!biliDataValue) return;

                    let bvid = '', avid = '';

                    if (location.href.indexOf('bangumi') != -1) {

                        bvid = document.querySelector('.av-link').innerText;

                    } else if (location.href.indexOf('video') != -1) {

                        let nowUrl = location.href.split('?');

                        let params = nowUrl[0].match(/https:\/\/www.bilibili.com\/video\/(.+)/);

                        if (params[1].indexOf('av') != -1) {

                            avid = params[1].replace('av', '');

                        } else {

                            bvid = params[1].substring(params[1].length - 1) == '/' ? params[1].substring(0, params[1].length - 1) : params[1];
                        }

                    } else if (location.href.indexOf('festival') != -1) {

                        bvid = _this.getQueryString('bvid');

                    } else {

                        BaseClass.toast('当前页面无法下载');
                        return;
                    }

                    if (!bvid && !avid) {

                        console.log('未获取bvid或avid');
                        return;
                    }

                    let url = "https://api.bilibili.com/x/web-interface/view?bvid=" + bvid + "&aid=" + avid;

                    let uri = _this.request('get', url).then((result) => {

                        let resp = JSON.parse(result);

                        if (resp.code < 0) {

                            BaseClass.toast('该视频无法下载');

                            console.log('视频信息接口返回数据错误');
                            return;
                        }

                        //选集cid

                        let pageId = _this.getQueryString('p');

                        let cid = '';

                        if (pageId) {

                            cid = resp.data.pages[pageId - 1].cid;

                        } else {

                            cid = resp.data.cid;
                        }

                        let link = 'https://api.bilibili.com/x/player/playurl?avid=' + resp.data.aid + '&cid=' + cid + '&qn=' + biliDataValue;

                        let res = _this.request('get', link, '', true).then((result) => {

                            let data = JSON.parse(result);

                            if (data.code < 0) {
                                BaseClass.toast('该视频无法下载');
                                console.log('视频地址接口返回数据错误');
                                return;
                            }

                            let downloadUrl = data.data.durl[0].url;

                            //GM_download(downloadUrl);

                            window.open(downloadUrl);

                        })

                    })
                })

            }

            getControls();

        }

        youtubeVideoDownload() {

            var _this = this;

            let timer = setInterval(function () {

                let url = location.href.match(/^https?:\/\/www\.youtube\.com\/(watch\?v=.+|shorts\/.+)/);

                if (url) {

                    let youtubeIcon = document.querySelector('#zhmlogo');

                    if (youtubeIcon) {
                        youtubeIcon.style.opacity = 1;
                        return;

                    }

                    _this.zhmLogo();

                    let playWrapHtml = "<div class='zhm_play_video_line'>";

                    playWrapHtml += "<ul class='zhm_play_vide_line_ul'>";

                    let playLine = [
                        {name: '下载线路1', url: 'https://zh.savefrom.net/176/#url='},
                        {name: '下载线路2', url: 'https://mydowndown.com/y2#'},
                        {name: '下载线路3', url: 'https://www.ytdownfk.com/search?url='},
                        {name: '下载线路4', url: 'https://yout.com/video/?url='}
                    ];

                    playLine.forEach(function (item) {

                        playWrapHtml += `<li class='playLineTd zhm_play_video_line_ul_li' url='${item.url}' >${item.name}</li>`;

                    })

                    playWrapHtml += "</ul></div>";

                    let zhmPlay = document.getElementById('zhmlogo');

                    let playLineDom = document.createElement('div');

                    playLineDom.className = 'playLineDiv zhm_play_video_wrap';

                    playLineDom.style.display = 'none';

                    playLineDom.innerHTML = playWrapHtml;

                    zhmPlay.appendChild(playLineDom);

                    let playLineTd = document.querySelectorAll('.playLineTd');

                    playLineTd.forEach(function (item) {

                        item.addEventListener('click', function () {

                            window.open(item.getAttribute('url') + location.href);

                        })

                    })

                    document.querySelector('.playButton').onmouseover = () => {

                        document.querySelector(".playLineDiv").style.display = 'block';

                    }

                    document.querySelector('.playButton').onmouseout = () => {

                        document.querySelector(".playLineDiv").style.display = 'none';

                    }

                    _this.zhmLogoDrag('youtube', '');

                } else {

                    let zhmIcon = document.querySelector('#zhmIcon');

                    if (zhmIcon) {

                        zhmIcon.parentNode.removeChild(zhmIcon);
                    }


                    let zhmlogo = document.querySelector('#zhmlogo');

                    if (zhmlogo) {

                        //zhmlogo.parentNode.removeChild(zhmlogo);

                        zhmlogo.style.opacity = 0;
                    }

                }

            }, 500)

        }

    }

    var nowWeb = [];

    for (let i = 0; i < videoDownload.length; i++) {

        if (location.href.match(videoDownload[i].match) && videoDownload[i].isWebOpen == 22) {

            nowWeb.push(videoDownload[i]);

            break;
        }

    }


    if (nowWeb.length != 1) {

        console.log('没有匹配该网站或该模块已关闭');
        return;

    } else {

        var videoDownloadClass = new VideoDownloadClass();
        console.log('------------- 匹配到网址', nowWeb[0].name);
        videoDownloadClass[nowWeb[0].name]();

    }

};
videoDownload()