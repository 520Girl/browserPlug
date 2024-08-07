// ==navai.vip==
// @reminder        请不要删除这部分代码注释，这是脚本能正常工作的基本条件！当然，你可以按需修改这里的内容！
// @id              tengxunVideo
// @name            vip视频解析去广告
// @url-pattern     ["://*.youku.com/*","://*.iqiyi.com/*","://*.iq.com/*","://*.le.com/*","://v.qq.com/*","://m.v.qq.com/*","://3g.v.qq.com/*","://*.tudou.com/*","://*.mgtv.com/*","://tv.sohu.com/*","://*.1905.com/*","://film.sohu.com/*","://*.bilibili.com/*","://*.pptv.com/*"]
// @enable          true
// @require-js      [""]
// @auto-refresh    0
// @tips            本服务提供各大视频平台的免费解析，涵盖优酷、爱奇艺、腾讯视频、B站等，支持PC及移动端，无需VIP会员即可观看，同时去除广告干扰。用户可自定义解析线路，选择站内或站外解析，并调整图标样式。我们承诺免费服务，并持续进行更新维护。
// @updated         2024-05-12 17:17:47
// ==/navai.vip==
var domHead = document.getElementsByTagName('head')[0];

var domStyle = document.createElement('style');

domStyle.type = 'text/css';

domStyle.rel = 'stylesheet';
// 设置logo图标
let {iconLogoUrl, iconLogowidth, iconLogoheight, bgcolor} = {
    iconLogoUrl: 'https://s1.aigei.com/src/img/png/59/59631572eedd4b4b85894ca6baa98679.png?imageMogr2/auto-orient/thumbnail/!282x282r/gravity/Center/crop/282x282/quality/85/%7CimageView2/2/w/282&e=1735488000&token=P7S2Xpzfz11vAkASLTkfHN7Fw-oOZBecqeJaxypL:HDts7oHBQT2ZLfBNs8wfwgEuFRs=',
    iconLogowidth: 45,
    iconLogoheight: 45,
    bgcolor: '#7bc772'
};

function setIconLogo() {
    let addressMatch = [
        {match: "://.*.youku.com/.*", iconUrl: 'youku.png', bgcolor: '#7a80cb'},
        {match: "://.*.iqiyi.com/.*", iconUrl: 'iqiyi.png', bgcolor: '#58e000'},
        {match: "://.*.iq.com/.*", iconUrl: 'iqiyi.png', bgcolor: '#58e000'},
        {match: "://.*.le.com/.*", iconUrl: 'le.png', bgcolor: '#d70c18'},
        {match: "://v.qq.com/.*", iconUrl: 'qq.png', bgcolor: '#2da7f9'},
        {match: "://m.v.qq.com/.*", iconUrl: 'qq.png', bgcolor: '#2da7f9'},
        {match: "://3g.v.qq.com/.*", iconUrl: 'qq.png', bgcolor: '#2da7f9'},
        {match: "://.*.tudou.com/.*", iconUrl: 'tudou.png', bgcolor: '#ff862c'},
        {match: "://.*.mgtv.com/.*", iconUrl: 'mgtv.png', bgcolor: '#f06000'},
        {match: "://tv.sohu.com/.*", iconUrl: 'sohu.png', bgcolor: '#fdd000'},
        {match: "://.*.1905.com/.*", iconUrl: '1905.png', bgcolor: '#016ed2'},
        {match: "://film.sohu.com/*", iconUrl: 'sohu.png', bgcolor: '#ff0000'},
        {match: "://.*.bilibili.com/.*", iconUrl: 'bilibili.png', bgcolor: '#20b0e3'},
        {match: "://.*.pptv.com/.*", iconUrl: 'pptv.png', bgcolor: '#016ed2'},
    ]

    let iconUrl = {iconUrl: 'logoXI.png', bgcolor: '#016ed2'};
    addressMatch.forEach(item => {
        const regex = new RegExp(item.match);
        if (regex.test(location.href)) {
            iconUrl = item;
        }
    });
    return iconUrl;
}

const setIconLogoUrl = setIconLogo();
iconLogoUrl = 'https://navai.vip/images/plug/' + setIconLogoUrl.iconUrl;
bgcolor = setIconLogoUrl.bgcolor;
var isMobile = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);

if (isMobile) {

    let playLine = [
        {"name": "纯净1", "url": "https://im1907.top/?jx="},
        {"name": "B站1", "url": "https://jx.jsonplayer.com/player/?url="},
        {"name": "爱豆", "url": "https://jx.aidouer.net/?url="},
        {"name": "听乐", "url": "https://jx.dj6u.com/?url="},
        {"name": "YT", "url": "https://jx.yangtu.top/?url="}
    ];

    let useWeb = ['m.bilibili.com', 'youku.com', 'www.youku.com', 'm.youku.com', '3g.v.qq.com', 'm.v.qq.com', 'm.iqiyi.com', 'm.mgtv.com', 'm.tv.sohu.com', 'm.1905.com', 'm.pptv.com', 'm.le.com'];

    if (useWeb.indexOf(location.host) == -1) {
        console.log('不是应用网站')
    }

    function setCookie(cname, cvalue, exdays) {

        var d = new Date();

        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));

        var expires = "expires=" + d.toGMTString();

        document.cookie = cname + "=" + cvalue + "; " + expires;
    }

    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i].trim();
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    function createElement(dom, domId) {

        var rootElement = document.body;

        var newElement = document.createElement(dom);

        newElement.id = domId;

        var newElementHtmlContent = document.createTextNode('');

        rootElement.appendChild(newElement);

        newElement.appendChild(newElementHtmlContent);

    }

    function toast(msg, duration) {

        duration = isNaN(duration) ? 3000 : duration;

        let toastDom = document.createElement('div');

        toastDom.innerHTML = msg;

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

    function playVideoFunc() {
        //css
        let playVideoStyle = `
        .zhm_play_vidoe_icon{
            padding-top:2px;cursor:pointer;
            z-index:9999999;
            display:block;
            position:fixed;let:0px;top:360px;text-align:center;overflow:visible;

        }
        .zhm_play_video_wrap{
            position:fixed;left:40px;top:360px;
            z-index:9999999;
            overflow: hidden;
            width:300px;
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
            background-color:${bgcolor};
            box-shadow:0px 0px 10px #fff;
            font-size:14px;
        }
        .zhm_play_video_line_ul_li:hover{
            color:#260033;
            opacity:0.7;
            background-color:${bgcolor}
        }
        .zhm_line_selected{
            color:#000000;
            opacity:0.8;
            background-color:${bgcolor}
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

        //template:icon,playLine;
        let playWrapHtml = `<div href='javascript:void(0)' target='_blank' style='' class='playButton zhm_play_vidoe_icon' id='zhmlogo'><img class='iconLogo' src='${iconLogoUrl}' title='点击右侧列表进行解析' style='width:${iconLogowidth}px height:${iconLogoheight}px;'>`;

        playWrapHtml += "<div class='playLineDiv zhm_play_video_wrap' style='display:none;'>"

        playWrapHtml += "<div class='zhm_play_video_line'>";

        playWrapHtml += "<div><ul class='zhm_play_vide_line_ul'>";

        playLine.forEach(function (item) {

            let selected = '';

            if (getCookie('playLineAction') == item.url) {

                selected = 'zhm_line_selected';

            }

            playWrapHtml += `<li class='playLineTd zhm_play_video_line_ul_li ${selected}' url='${item.url}' >${item.name}</li>`;

        })

        playWrapHtml += "</div></div></div>";

        //template:node;播放区域

        let playJxHtml = "<div class='zhm_play_video_jx'>";

        playJxHtml += "<iframe allowtransparency=true frameborder='0' scrolling='no' allowfullscreen=true allowtransparency=true name='jx_play' style='height:100%;width:100%' id='playIframe'></iframe></div>";

        //循环判断是否在播放页，是则执行下面
        let jxVideoData = [

            {
                funcName: "playVideo",
                node: "#player",
                match: /m\.v\.qq\.com\/x\/play\.html\?cid=/,
                areaClassName: 'slider_box'
            },
            {
                funcName: "playVideo",
                node: "#player",
                match: /m\.v\.qq\.com\/play\.html\?cid\=/,
                areaClassName: 'slider_box'
            },
            {
                funcName: "playVideo",
                node: "#player",
                match: /m\.v\.qq\.com\/cover\/.*html/,
                areaClassName: 'slider_box'
            },
            {
                funcName: "playVideo",
                node: "#player",
                match: /https?:\/\/m\.v\.qq\.com\/x\/m\/play\?.*cid.*/,
                areaClassName: 'slider_box'
            },
            {
                funcName: "playVideo",
                node: "#player",
                match: /3g\.v\.qq\.com\/x\/m\/play\?cid=.*/,
                areaClassName: 'slider_box'
            },

            {
                funcName: "playVideo",
                node: ".m-video-player-wrap",
                match: /^https:\/\/m.iqiyi\.com\/[vwa]\_/,
                areaClassName: 'm-sliding-list'
            },
            {
                funcName: "playVideo",
                node: ".intl-video-wrap",
                match: /^https:\/\/www\.iq\.com\/play\//,
                areaClassName: 'm-sliding-list'
            },

            {funcName: "playVideo", node: "#player", match: /m\.youku\.com\/alipay_video\/id_/, areaClassName: ''},
            {funcName: "playVideo", node: "#player", match: /m\.youku\.com\/video\/id_/, areaClassName: ''},

            {
                funcName: "playVideo",
                node: ".player-container",
                nodeType: 'class',
                match: /m\.bilibili\.com\/bangumi/,
                areaClassName: 'ep-list-pre-body'
            },
            {
                funcName: "playVideo",
                node: ".mplayer",
                nodeType: 'class',
                match: /m\.bilibili\.com\/video\//,
                areaClassName: 'ep-list-pre-body'
            },

            {
                funcName: "playVideo",
                node: ".video-area",
                nodeType: 'class',
                match: /m\.mgtv\.com\/b/,
                areaClassName: 'clearfix'
            },

            {
                funcName: "playVideo",
                node: "#le_playbox",
                nodeType: 'id',
                match: /m\.le\.com\/ptv\/vplay\//,
                areaClassName: 'sideslip_slide'
            },

            {
                funcName: "playVideo",
                node: "#j-player",
                nodeType: 'id',
                match: /m\.le\.com\/vplay/,
                areaClassName: 'juji'
            },

            {funcName: "playVideo", node: "#player", nodeType: 'id', match: /play\.tudou\.com\/v_show\/id_/},

            {funcName: "playVideo", node: "#pptv_playpage_box", nodeType: 'id', match: /v\.pptv\.com\/show\//},

            {funcName: "playVideo", node: "#player", nodeType: 'id', match: /vip\.1905.com\/play\//},

            {funcName: "playVideo", node: "#vodPlayer", nodeType: 'id', match: /www\.1905.com\/vod\/play\//},
        ];

        //创建logo_icon
        createElement('div', 'zhmIcon');

        let zhmPlay = document.getElementById('zhmIcon');

        zhmPlay.innerHTML = playWrapHtml;

        let jxVideoWeb = jxVideoData.filter(function (item) {

            return location.href.match(item.match);

        })

        document.querySelector('#zhmlogo').addEventListener('click', function () {

            let jxVideoWeb = jxVideoData.filter(function (item) {

                return location.href.match(item.match);

            })

            if (jxVideoWeb.length == 0) {

                toast('请在视频播放页点击图标');

            } else {

                var {funcName, match: nowMatch, node: nowNode, name: nowName} = jxVideoWeb[0];

                let playLineDiv = document.querySelector('.zhm_play_video_wrap');

                let playShow = playLineDiv.style.display;

                playShow == 'none' ? playLineDiv.style.display = 'block' : playLineDiv.style.display = 'none';

                var playLineTd = document.querySelectorAll('.playLineTd');

                playLineTd.forEach(function (item) {

                    item.addEventListener('click', function () {

                        playLineTd.forEach(function (e) {

                            e.setAttribute('class', 'playLineTd zhm_play_video_line_ul_li');
                        })

                        this.setAttribute('class', 'playLineTd zhm_play_video_line_ul_li zhm_line_selected');

                        setCookie('playLineAction', this.getAttribute('url'), 30);

                        let nowWebNode = document.querySelector(nowNode);

                        if (nowWebNode) {

                            nowWebNode.innerHTML = playJxHtml;

                            let playIframe = document.querySelector('#playIframe');

                            playIframe.src = item.getAttribute('url') + location.href;

                        } else {

                            console.log('视频网站结点不存在');
                        }

                    })

                })

                let videoSelect = document.querySelector('.' + jxVideoWeb[0].areaClassName);

                videoSelect.addEventListener('click', function (e) {

                    setTimeout(function () {

                        location.href = location.href;

                    }, 1000)

                });
                return false;
            }

        })


        let timer = setInterval(function () {

            let jxVideoWeb = jxVideoData.filter(function (item) {

                return location.href.match(item.match);

            })

            if (jxVideoWeb.length > 0) {

                let videoSelect = document.querySelector('.' + jxVideoWeb[0].areaClassName);

                if (videoSelect) {

                    videoSelect.addEventListener('click', function (e) {

                        setTimeout(function () {

                            location.href = location.href;

                        }, 1000)

                    });

                }

            }

        }, 1000)

    }

    playVideoFunc();
} else {
    /*--config--*/
    var Config = {

        couponUrl: window.location.href,

        couponHost: window.location.host,

        webUrl: 'http://music.liuzhijin.cn/',

        iconVipTop: 360,

        iconVipPosition: 'left',

        iconVipWidth: 40,

        couponTimerNum: 100,//100次等于10秒

        couponWaitTime: 100,

        iconWaitTime: 100,

        iconVipOpacity: 100,

        selectedLeft: 'selected',

        selectedRight: '',

        videoPlayLineAdd: 0,

    }

    var {
        couponUrl,
        couponHost,
        webUrl,
        iconVipTop,
        iconVipPosition,
        iconVipWidth,
        iconVipOpacity,
        couponTimerNum,
        couponWaitTime,
        iconWaitTime,
        selectedLeft,
        selectedRight,
        videoPlayLineAdd,
    } = Config;

    class BaseClass {
        constructor() {
            this.setStyle();
        }

        setStyle() {
            let menuSetStyle = `
                    .zhmMask{
                        z-index:999999999;
                        background-color:#000;
                        position: fixed;top: 0;right: 0;bottom: 0;left: 0;
                        opacity:0.8;
                    }
                    .wrap-box{
                        z-index:1000000000;
                        position:fixed;;top: 50%;left: 50%;transform: translate(-50%, -200px);
                        width: 300px;
                        color: #555;
                        background-color: #fff;
                        border-radius: 5px;
                        overflow:hidden;
                        font:16px numFont,PingFangSC-Regular,Tahoma,Microsoft Yahei,sans-serif !important;
                        font-weight:400 !important;
                    }
                    .setWrapHead{
                        background-color:#f24443;height:40px;color:#fff;text-align:center;line-height:40px;
                    }
                    .setWrapLi{
                        margin:0px;padding:0px;
                    }
                    .setWrapLi li{
                        background-color: #fff;
                        border-bottom:1px solid #eee;
                        margin:0px !important;
                        padding:12px 20px;
                        display: flex;
                        justify-content: space-between;align-items: center;
                        list-style: none;
                    }
    
                    .setWrapLiContent{
                        display: flex;justify-content: space-between;align-items: center;
                    }
                    .setWrapSave{
                        position:absolute;top:-2px;right:10px;font-size:24px;cursor:pointer
                    }
                    .iconSetFoot{
                        position:absolute;bottom:0px;padding:10px 20px;width:100%;
                    z-index:1000000009;background:#fef9ef;
                    }
                    .iconSetFootLi{
                        margin:0px;padding:0px;
                    }
    
                    .iconSetFootLi li{
                        display: inline-flex;
                        padding:0px 2px;
                        justify-content: space-between;align-items: center;
                        font-size: 12px;
                    }
                    .iconSetFootLi li a{
                        color:#555;
                    }
                    .iconSetFootLi a:hover {
                        color:#fe6d73;
                    }
                    .iconSetPage{
                        z-index:1000000001;
                        position:absolute;top:0px;left:300px;
                        background:#fff;
                        width:300px;
                        height:100%;
                    }
                    .iconSetUlHead{
                    padding:0px;
                    margin:0px;
                    }
                    .iconSetPageHead{
                        border-bottom:1px solid #ccc;
                        height:40px;
                        line-height:40px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        background-color:#fe6d73;
                        color:#fff;
                        font-size: 15px;
                    }
                    .iconSetPageLi{
                        margin:0px;padding:0px;
                    }
                    .iconSetPageLi li{
                        list-style: none;
                        padding:8px 20px;
                        border-bottom:1px solid #eee;
                    }
                    .zhihuSetPage{
                        z-index:1000000002;position:absolute;top:0px;left:300px;background:#fff;width:300px;height:100%;
                    }
                    .iconSetPageInput{
                        display: flex !important;justify-content: space-between;align-items: center;
                    }
                    .zhihuSetPageLi{
                        margin:0px;padding:0px;
                        height:258px;
                        overflow-y: scroll;
                    }
    
                    .zhihuSetPageContent{
                        display: flex !important;justify-content: space-between;align-items: center;
                    }
    
                    .zhm_circular{
                        width: 40px;height: 20px;border-radius: 16px;transition: .3s;cursor: pointer;box-shadow: 0 0 3px #999 inset;
                    }
                    .round-button{
                        width: 20px;height: 20px;;border-radius: 50%;box-shadow: 0 1px 5px rgba(0,0,0,.5);transition: .3s;position: relative;
                    }
                    .zhm_back{
                        border: solid #FFF; border-width: 0 3px 3px 0; display: inline-block; padding: 3px;transform: rotate(135deg);  -webkit-transform: rotate(135deg);margin-left:10px;cursor:pointer;
                    }
                    .to-right{
                        margin-left:20px; display: inline-block; padding: 3px;transform: rotate(-45deg); -webkit-transform: rotate(-45deg);cursor:pointer;
    
                    }
                    .iconSetSave{
                        font-size:24px;cursor:pointer;margin-right:5px;margin-bottom:4px;color:#FFF;
                    }
                    .zhm_set_page{
                        z-index:1000000003;
                        position:absolute;
                        top:0px;left:300px;
                        background:#fff;
                        width:300px;
                        height:100%;
                    }
                    .zhm_set_page_header{
                        border-bottom:1px solid #ccc;
                        height:40px;
                        line-height:40px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        background-color:#fe6d73;
                        color:#fff;
                        font-size: 15px;
                    }
                    .zhm_set_page_content{
                        display: flex !important;justify-content: space-between;align-items: center;
                    }
                    .zhm_set_page_list{
                        margin:0px;padding:0px;
                        height: 220px;
                        overflow-y: scroll;
                    }
    
                    .zhm_set_page_list::-webkit-scrollbar {
                        /*滚动条整体样式*/
                        width : 0px;  /*高宽分别对应横竖滚动条的尺寸*/
                        height: 1px;
                    }
                    .zhm_set_page_list::-webkit-scrollbar-thumb {
                        /*滚动条里面小方块*/
                        border-radius   : 2px;
                        background-color: #fe6d73;
                    }
                    .zhm_set_page_list::-webkit-scrollbar-track {
                        /*滚动条里面轨道*/
                        box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
                        background   : #ededed;
                        border-radius: 10px;
                    }
                    .zhm_set_page_list li{
                        /*border-bottom:1px solid #ccc;*/
                        padding:12px 20px;
                        display:block;
                        border-bottom:1px solid #eee;
                    }
                    li:last-child{
                        border-bottom:none;
                    }
                    .zhm_scroll{
                    overflow-y: scroll !important;
                    }
                    .zhm_scroll::-webkit-scrollbar {
                        /*滚动条整体样式*/
                        width : 0px;  /*高宽分别对应横竖滚动条的尺寸*/
                        height: 1px;
                    }
                    .zhm_scroll::-webkit-scrollbar-thumb {
                        /*滚动条里面小方块*/
                        border-radius   : 2px;
                        background-color: #fe6d73;
                    }
                    .zhm_scroll::-webkit-scrollbar-track {
                        /*滚动条里面轨道*/
                        box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
                        background   : #ededed;
                        border-radius: 10px;
                    }
                    /*-form-*/
                    :root {
                        --base-color: #434a56;
                        --white-color-primary: #f7f8f8;
                        --white-color-secondary: #fefefe;
                        --gray-color-primary: #c2c2c2;
                        --gray-color-secondary: #c2c2c2;
                        --gray-color-tertiary: #676f79;
                        --active-color: #227c9d;
                        --valid-color: #c2c2c2;
                        --invalid-color: #f72f47;
                        --invalid-icon: url("data:image/svg+xml;charset=utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%3E%20%3Cpath%20d%3D%22M13.41%2012l4.3-4.29a1%201%200%201%200-1.42-1.42L12%2010.59l-4.29-4.3a1%201%200%200%200-1.42%201.42l4.3%204.29-4.3%204.29a1%201%200%200%200%200%201.42%201%201%200%200%200%201.42%200l4.29-4.3%204.29%204.3a1%201%200%200%200%201.42%200%201%201%200%200%200%200-1.42z%22%20fill%3D%22%23f72f47%22%20%2F%3E%3C%2Fsvg%3E");
                    }
                    .text-input {
                        font-size: 16px;
                        position: relative;
                        right:0px;
                        z-index: 0;
                    }
                    .text-input__body {
                        -webkit-appearance: none;
                        -moz-appearance: none;
                        appearance: none;
                        background-color: transparent;
                        border: 1px solid var(--gray-color-primary);
                        border-radius: 3px;
                        height: 1.7em;
                        line-height: 1.7;
                        overflow: hidden;
                        padding: 2px 1em;
                        text-overflow: ellipsis;
                        transition: background-color 0.3s;
                        width:55%;
                        font-size:14px;
                        box-sizing: initial;
                    }
                    .text-input__body:-ms-input-placeholder {
                        color: var(--gray-color-secondary);
                    }
                    .text-input__body::-moz-placeholder {
                        color: var(--gray-color-secondary);
                    }
                    .text-input__body::placeholder {
                        color: var(--gray-color-secondary);
                    }
    
                    .text-input__body[data-is-valid] {
                        padding-right: 1em;
    
                    }
                    .text-input__body[data-is-valid=true] {
                        border-color: var(--valid-color);
                    }
                    .text-input__body[data-is-valid=false] {
                        border-color: var(--invalid-color);
                        box-shadow: inset 0 0 0 1px var(--invalid-color);
                    }
                    .text-input__body:focus {
                        border-color: var(--active-color);
                        box-shadow: inset 0 0 0 1px var(--active-color);
                        outline: none;
                    }
                    .text-input__body:-webkit-autofill {
                        transition-delay: 9999s;
                        -webkit-transition-property: background-color;
                        transition-property: background-color;
                    }
                    .text-input__validator {
                        background-position: right 0.5em center;
                        background-repeat: no-repeat;
                        background-size: 1.5em;
                        display: inline-block;
                        height: 100%;
                        left: 0;
                        position: absolute;
                        top: 0;
                        width: 100%;
                        z-index: -1;
                    }
                    .text-input__body[data-is-valid=false] + .text-input__validator {
                        background-image: var(--invalid-icon);
                    }
                    .select-box {
                        box-sizing: inherit;
                        font-size: 16px;
                        position: relative;
                        transition: background-color 0.5s ease-out;
                        width:90px;
                    }
                    .select-box::after {
                        border-color: var(--gray-color-secondary) transparent transparent transparent;
                        border-style: solid;
                        border-width: 6px 4px 0;
                        bottom: 0;
                        content: "";
                        display: inline-block;
                        height: 0;
                        margin: auto 0;
                        pointer-events: none;
                        position: absolute;
                        right: -72px;
                        top: 0;
                        width: 0;
                        z-index: 1;
                    }
                    .select-box__body {
                        box-sizing: initial;
                        -webkit-appearance: none;
                        -moz-appearance: none;
                        appearance: none;
                        background-color: transparent;
                        border: 1px solid var(--gray-color-primary);
                        border-radius: 3px;
                        cursor: pointer;
                        height: 1.7em;
                        line-height: 1.7;
                        padding-left: 1em;
                        padding-right: calc(1em + 16px);
                        width: 140%;
                        font-size:14px;
                        padding-top:2px;
                        padding-bottom:2px;
                    }
                    .select-box__body[data-is-valid=true] {
                        border-color: var(--valid-color);
                        box-shadow: inset 0 0 0 1px var(--valid-color);
                    }
                    .select-box__body[data-is-valid=false] {
                        border-color: var(--invalid-color);
                        box-shadow: inset 0 0 0 1px var(--invalid-color);
                    }
                    .select-box__body.focus-visible {
                        border-color: var(--active-color);
                        box-shadow: inset 0 0 0 1px var(--active-color);
                        outline: none;
                    }
                    .select-box__body:-webkit-autofill {
                        transition-delay: 9999s;
                        -webkit-transition-property: background-color;
                        transition-property: background-color;
                    }
                    .textarea__body {
                        -webkit-appearance: none;
                        -moz-appearance: none;
                        appearance: none;
                        background-color: transparent;
                        border: 1px solid var(--gray-color-primary);
                        border-radius: 0;
                        box-sizing: initial;
                        font: inherit;
                        left: 0;
                        letter-spacing: inherit;
                        overflow: hidden;
                        padding: 1em;
                        position: absolute;
                        resize: none;
                        top: 0;
                        transition: background-color 0.5s ease-out;
                        width: 100%;
                        }
                    .textarea__body:only-child {
                        position: relative;
                        resize: vertical;
                    }
                    .textarea__body:focus {
                        border-color: var(--active-color);
                        box-shadow: inset 0 0 0 1px var(--active-color);
                        outline: none;
                    }
                    .textarea__body[data-is-valid=true] {
                        border-color: var(--valid-color);
                        box-shadow: inset 0 0 0 1px var(--valid-color);
                    }
                    .textarea__body[data-is-valid=false] {
                        border-color: var(--invalid-color);
                        box-shadow: inset 0 0 0 1px var(--invalid-color);
                    }
    
                    .textarea ._dummy-box {
                        border: 1px solid;
                        box-sizing: border-box;
                        min-height: 240px;
                        overflow: hidden;
                        overflow-wrap: break-word;
                        padding: 1em;
                        visibility: hidden;
                        white-space: pre-wrap;
                        word-wrap: break-word;
                    }
                    .toLeftMove{
                        nimation:moveToLeft 0.5s infinite;
                        -webkit-animation:moveToLeft 0.5s infinite; /*Safari and Chrome*/
                        animation-iteration-count:1;
                        animation-fill-mode: forwards;
                    }
    
                    @keyframes moveToLeft{
                        from {left:200px;}
                        to {left:0px;}
                    }
    
                    @-webkit-keyframes moveToLeft /*Safari and Chrome*/{
                        from {left:200px;}
                        to {left:0px;}
                    }
    
                    .toRightMove{
                        nimation:moveToRight 2s infinite;
                        -webkit-animation:moveToRight 2s infinite; /*Safari and Chrome*/
                        animation-iteration-count:1;
                        animation-fill-mode: forwards;
                    }
                    @keyframes moveToRight{
                        from {left:0px;}
                        to {left:2000px;}
                    }
    
                    @-webkit-keyframes moveToRight /*Safari and Chrome*/{
                        from {left:0px;}
                        to {left:200px;}
                    }
    
                `;

            domStyle.appendChild(document.createTextNode(menuSetStyle));

            domHead.appendChild(domStyle);
        }

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
               background-color:${bgcolor};
               box-shadow:0px 0px 10px #fff;
               font-size:14px;
            }
            .zhm_play_video_line_ul_li:hover{
               color:#260033;
               opacity:0.7;
                background-color:${bgcolor}
            }
            .zhm_line_selected{
               color:#260033;
               opacity:0.8;
               background-color:${bgcolor}
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

            playWrapHtml += `<img class='iconLogo' style='width:${iconLogowidth}px;height:${iconLogoheight}px' src='${iconLogoUrl}'>`

            playWrapHtml += "<div>";

            _this.createElement('div', 'zhmIcon');

            let zhmPlay = document.getElementById('zhmIcon');

            zhmPlay.innerHTML = playWrapHtml;

        }

        //type:根据不同类型，处理图标单击事务
        zhmLogoDrag(type, web) {

            var _this = this;

            var zhmLogoDrag = document.querySelector("#zhmlogo");

            var zhmLogoIcon = document.querySelector(".iconLogo");

            if (!zhmLogoDrag || !zhmLogoIcon) return;

            zhmLogoDrag.onmousedown = function (event) {

                if (event.which == 3) return false;//屏蔽右键

                let sedownTop = zhmLogoDrag.offsetTop;

                let zhmLogoIconHeight = zhmLogoIcon.offsetHeight;

                let bottomSpace = 10;

                if (event.target.className != 'iconLogo') return;

                //let shiftX = event.clientX - zhmLogoDrag.getBoundingClientRect().left;
                let shiftx = 5;

                let shiftY = event.clientY - zhmLogoDrag.getBoundingClientRect().top;

                zhmLogoDrag.style.position = 'fixed';

                zhmLogoDrag.style.zIndex = 9999999;

                document.body.append(zhmLogoDrag);

                function onMouseMove(event) {

                    //zhmLogoDrag.style.left = pageX - shiftX + 'px';
                    zhmLogoDrag.style.left = '5px';

                    let height = window.innerHeight - zhmLogoIconHeight - bottomSpace;

                    let y = event.pageY - shiftY;

                    y = Math.min(Math.max(0, y), height);

                    zhmLogoDrag.style.top = y + 'px';

                }

                //在mousemove事件上移动图标
                document.addEventListener('mousemove', onMouseMove);
                //松开事件
                document.onmouseup = function (e) {

                    // GM_setValue('iconTop',zhmLogoDrag.offsetTop);

                    document.removeEventListener('mousemove', onMouseMove);

                    zhmLogoDrag.onmouseup = null;

                    let height = zhmLogoDrag.offsetTop + zhmLogoIconHeight + bottomSpace;

                    if (zhmLogoDrag.offsetTop < 0) {

                        zhmLogoDrag.style.top = '0px';
                    }

                    if (window.innerHeight < height) {

                        zhmLogoDrag.style.top = window.innerHeight - zhmLogoIconHeight - bottomSpace + 'px';

                    }
                    //click事件处理
                    switch (type) {

                        case 'video':

                            if (zhmLogoDrag.offsetTop == sedownTop && web.length == 0 && zhmLogoDrag.offsetTop > 0 && window.innerHeight > height) {

                                BaseClass.toast('请在视频播放页点击图标');
                            }
                            break;
                    }
                };

            };

            zhmLogoDrag.ondragstart = function () {
                return false;
            };
        }

        setCookie(cname, cvalue, exdays) {

            var d = new Date();

            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));

            var expires = "expires=" + d.toGMTString();

            document.cookie = cname + "=" + cvalue + "; " + expires;
        }

        createElement(dom, domId) {

            var rootElement = document.body;

            var newElement = document.createElement(dom);

            newElement.id = domId;

            var newElementHtmlContent = document.createTextNode('');

            rootElement.appendChild(newElement);

            newElement.appendChild(newElementHtmlContent);

        }

        getCookie(cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i].trim();
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        }

    }

    class PlayVideoClass extends BaseClass {
        constructor() {
            super();
        }
    }

    //! 1. 生成logo 元素并添加到页面
    const playVideoClass = new PlayVideoClass();
    playVideoClass.zhmLogo();

    //! 2. 生成解析按钮页面的几个解析接口页面 hover，添加到 logo元素上
    const playLine = [
        {"name": "纯净1", "url": "https://im1907.top/?jx=", "mobile": 1},
        {"name": "B站1", "url": "https://jx.jsonplayer.com/player/?url=", "mobile": 1},
        {"name": "YT", "url": "https://jx.yangtu.top/?url=", "mobile": 0},
        {"name": "BL", "url": "https://vip.bljiex.com/?v=", "mobile": 0},
        {"name": "冰豆", "url": "https://bd.jx.cn/?url=", "mobile": 0},
        {"name": "CK", "url": "https://www.ckplayer.vip/jiexi/?url=", "mobile": 0},
        {"name": "弹幕", "url": "https://dmjx.m3u8.tv/?url=", "mobile": 0},
        {"name": "IK9", "url": "https://yparse.ik9.cc/index.php?url=", "mobile": 0},
        {"name": "JY", "url": "https://jx.playerjy.com/?url=", "mobile": 0},
        {"name": "解析la", "url": "https://api.jiexi.la/?url=", "mobile": 0},
        {"name": "M3U8", "url": "https://jx.m3u8.tv/jiexi/?url=", "mobile": 0},
        {"name": "PM", "url": "https://www.playm3u8.cn/jiexi.php?url=", "mobile": 0},
        {"name": "盘古", "url": "https://www.pangujiexi.cc/jiexi.php?url=", "mobile": 0},
        {"name": "盘古2", "url": "https://www.pangujiexi.com/jiexi/?url=", "mobile": 0},
        {"name": "剖云", "url": "https://www.pouyun.com/?url=", "mobile": 0},
        {"name": "七哥", "url": "https://jx.nnxv.cn/tv.php?url=", "mobile": 0},
        {"name": "神哥", "url": "https://json.ovvo.pro/jx.php?url=", "mobile": 0},
        {"name": "听乐", "url": "https://jx.dj6u.com/?url=", "mobile": 1},
        {"name": "维多", "url": "https://jx.ivito.cn/?url=", "mobile": 0},
        {"name": "虾米", "url": "https://jx.xmflv.com/?url=", "mobile": 0},
        {"name": "虾米2", "url": "https://jx.xmflv.cc/?url=", "mobile": 0},
        {"name": "夜幕", "url": "https://www.yemu.xyz/?url=", "mobile": 0},
        {"name": "云析", "url": "https://jx.yparse.com/index.php?url=", "mobile": 0},
        {"name": "17云", "url": "https://www.1717yun.com/jx/ty.php?url=", "mobile": 0},
        {"name": "180", "url": "https://jx.000180.top/jx/?url=", "mobile": 0},
        {"name": "2ys", "url": "https://gj.fenxiangb.com/player/analysis.php?v=", "mobile": 0},
        {"name": "8090", "url": "https://www.8090g.cn/?url=", "mobile": 0}
    ]

    let playWrapHtml = "<div class='zhm_play_video_line'>";

    playWrapHtml += "<div><ul class='zhm_play_vide_line_ul'>";

    playLine.forEach(function (item) {
        let selected = '';
        if (playVideoClass.getCookie('playLineAction') == item.url) {
            selected = 'zhm_line_selected';
        }
        playWrapHtml += `<li class='playLineTd zhm_play_video_line_ul_li ${selected}' url='${item.url}' >${item.name}</li>`;
    })

    playWrapHtml += "</div>";
    let zhmPlay = document.getElementById('zhmlogo');
    let playLineDom = document.createElement('div');
    playLineDom.className = 'playLineDiv zhm_play_video_wrap';
    playLineDom.style.display = 'none';
    playLineDom.innerHTML = playWrapHtml;
    zhmPlay.appendChild(playLineDom);

    //! 播放区域的匹配和更新
    let playJxHtml = "<div class='zhm_play_video_jx'>";
    playJxHtml += "<iframe allowtransparency=true frameborder='0' scrolling='no' allowfullscreen=true allowtransparency=true name='jx_play' style='height:100%;width:100%' id='playIframe'></iframe></div>";
    let jxVideoData = [
        {
            funcName: "playVideo",
            node: ".player__container",
            match: /https:\/\/v.qq.com\/x\/cover\/[a-zA-Z0-9]+.html/,
            areaClassName: 'playlist-list',
            name: 'qqPC'
        },
        {
            funcName: "playVideo",
            node: "#player-container",
            match: /https:\/\/v.qq.com\/x\/cover\/[a-zA-Z0-9]+\/[a-zA-Z0-9]+.html/,
            areaClassName: 'playlist-list',
            name: 'qqPC'
        },
        {funcName: "playVideo", node: ".container-player", match: /v\.qq\.com\/x\/page/, areaClassName: 'mod_episode'},

        {
            funcName: "playVideo",
            node: "#flashbox",
            match: /^https:\/\/www\.iqiyi\.com\/[vwa]\_/,
            areaClassName: 'qy-episode-num',
            name: 'iqiyiPc'
        },
        {
            funcName: "playVideo",
            node: ".m-video-player-wrap",
            match: /^https:\/\/m.iqiyi\.com\/[vwa]\_/,
            areaClassName: 'm-sliding-list'
        },
        {
            funcName: "playVideo",
            node: ".intl-video-wrap",
            match: /^https:\/\/www\.iq\.com\/play\//,
            areaClassName: 'm-sliding-list'
        },

        {
            funcName: "playVideo",
            node: "#player",
            match: /v\.youku\.com\/v_show\/id_/,
            areaClassName: 'new-box-anthology-items'
        },
        {funcName: "playVideo", node: "#player", match: /v\.youku\.com\/v_play\/id_/},

        //{funcName:"playVideo", node:".player-container",nodeType:'id',match:/www\.bilibili\.com\/video/},
        {
            funcName: "playVideo",
            node: "#bilibili-player",
            nodeType: 'id',
            match: /www\.bilibili\.com\/video/,
            name: 'biliPc',
            areaClassName: 'video-episode-card'
        },
        //{funcName:"playVideo", node:"#player_module",nodeType:'id',match:/www\.bilibili\.com\/bangumi/,areaClassName:'list-wrapper'},原来DOM
        {
            funcName: "playVideo",
            node: ".bpx-player-primary-area",
            nodeType: 'id',
            match: /www\.bilibili\.com\/bangumi/,
            areaClassName: 'eplist_ep_list_wrapper__PzLHa'
        },
        {
            funcName: "playVideo",
            node: "#mgtv-player-wrap",
            nodeType: 'id',
            match: /^https?:\/\/www.mgtv\.com\/b|l\/[0-9]/,
            areaClassName: 'episode-items'
        },

        {
            funcName: "playVideo",
            node: ".x-player",
            nodeType: 'class',
            match: /tv\.sohu\.com\/v/,
            areaClassName: 'series-tab_pane'
        },
        {funcName: "playVideo", node: "#playerWrap", nodeType: 'id', match: /film\.sohu\.com\/album\//},

        {
            funcName: "playVideo",
            node: "#le_playbox",
            nodeType: 'id',
            match: /le\.com\/ptv\/vplay\//,
            areaClassName: 'juji_grid'
        },

        {funcName: "playVideo", node: "#player", nodeType: 'id', match: /play\.tudou\.com\/v_show\/id_/},

        {funcName: "playVideo", node: "#pptv_playpage_box", nodeType: 'id', match: /v\.pptv\.com\/show\//},

        {funcName: "playVideo", node: "#player", nodeType: 'id', match: /vip\.1905.com\/play\//},

        {funcName: "playVideo", node: "#vodPlayer", nodeType: 'id', match: /www\.1905.com\/vod\/play\//},
    ];
    let jxVideoWeb = jxVideoData.filter(function (item) {
        return location.href.match(item.match);
    })

    playVideoClass.zhmLogoDrag('video', jxVideoWeb);


    //是否在播放页
    if (jxVideoWeb.length > 0) {

        var {funcName, match: nowMatch, node: nowNode, name: nowName} = jxVideoWeb[0];

        //鼠标经过显示线路
        document.querySelector('.playButton').onmouseover = () => {

            document.querySelector(".playLineDiv").style.display = 'block';

        }

        document.querySelector('.playButton').onmouseout = () => {

            document.querySelector(".playLineDiv").style.display = 'none';

        }

        //选择线路解析播放

        var playLineTd = document.querySelectorAll('.playLineTd');

        playLineTd.forEach(function (item) {

            item.addEventListener('click', function () {

                playLineTd.forEach(function (e) {

                    e.setAttribute('class', 'playLineTd zhm_play_video_line_ul_li');
                })

                this.setAttribute('class', 'playLineTd zhm_play_video_line_ul_li zhm_line_selected');

                playVideoClass.setCookie('playLineAction', this.getAttribute('url'), 30);

                let nowWebNode = document.querySelector(nowNode);

                if (nowWebNode) {

                    nowWebNode.innerHTML = playJxHtml;

                    let playIframe = document.querySelector('#playIframe');

                    playIframe.src = item.getAttribute('url') + location.href;

                } else {

                    console.log('视频网站结点不存在');
                }


            })

        })

        /*--特殊处理--*/
        //优酷去广告
        if (nowNode == "#player") {

            setTimeout(function () {

                let youkuAd = document.querySelector('.advertise-layer');

                let ykAd = youkuAd.lastChild;

                ykAd.parentNode.removeChild(ykAd);

                document.querySelector('.kui-dashboard-0').style = 'display:flex';

                let playVideo = document.querySelector('.video-layer video');

                playVideo.play();

                let n = 0;

                //暂停
                document.querySelector('.kui-play-icon-0').addEventListener('click', function () {

                    let video = document.querySelector('.video-layer video');

                    if (n++ % 2 == 0) {

                        video.pause();

                    } else {

                        video.play();
                    }

                });

                playVideo.addEventListener('timeupdate', function () { //播放时间改变

                    let youkuAd = document.querySelector('.advertise-layer');

                    let ykAd = youkuAd.lastChild;


                    if (ykAd) {

                        ykAd.parentNode.removeChild(ykAd);
                    }

                    document.querySelector('.kui-dashboard-0').style = 'display:flex';
                });

                //键盘快进快退暂停播放
                document.onkeydown = function (event) {
                    //console.log(event.keyCode);
                    let video = document.querySelector('.video-layer video');

                    if (event.keyCode == 39) {

                        video.currentTime = video.currentTime + 5;

                    }
                    if (event.keyCode == 37) {

                        video.currentTime = video.currentTime - 5;

                    }

                    if (event.keyCode == 32) {

                        if (n++ % 2 == 0) {

                            video.pause();

                        } else {

                            video.play();
                        }
                    }
                }

            }, 3000)
        }
        //爱奇艺去广告
        if (nowNode == "#flashbox") {

            setTimeout(function () {

                let dom = document.querySelector('.skippable-after');

                if (dom) {

                    dom.click();

                }

            }, 3000)

        }

        //腾讯去vip弹窗
        if (nowNode == "#player-container") {

            let n = 0;

            let timer = setInterval(function () {

                if (n++ < 100) {

                    let panelTipVip = document.querySelector('.panel-overlay');

                    if (panelTipVip) {

                        panelTipVip.style.display = 'none';

                        clearInterval(timer);
                    }

                } else {

                    clearInterval(timer);

                }

            }, 100)


        }
        //乐视选集处理
        if (nowNode == "#le_playbox") {

            setTimeout(function () {

                let jBlock = document.querySelectorAll('.j_block');

                if (!jBlock) return;

                for (let i = 0; i < jBlock.length; i++) {

                    let videoId = jBlock[i].getAttribute('data-vid');

                    let link = `https://www.le.com/ptv/vplay/${videoId}.html`;

                    jBlock[i].firstChild.setAttribute('href', link);
                }
            }, 3000)
        }

        //B站大会员url处理，页面class不一致
        if (nowNode == ".player-container") {

            setTimeout(function () {

                if (!document.querySelector('.player-container') && !document.querySelector('.bpx-player-container')) {

                    nowNode = '.player-mask';

                } else {

                    nowNode = '.bpx-player-container';
                }

            }, 3000)
        }

        /*腾讯视频点击其它视频跳转*/
        if (nowName == 'qqPC') {

            let figure = document.querySelectorAll('.figure');

            let figureDetail = document.querySelectorAll('.figure_detail');

            let listItem = [...figure, ...figureDetail];

            if (listItem.length > 0) {

                listItem.forEach(function (item) {

                    item.addEventListener('click', function () {

                        let link = this.getAttribute('href');

                        if (link) {

                            location.href = link;

                            return;
                        }

                    })

                });

            }

        }
        //注释是多个播放选集区域
        /*
            let eareClassNameArr = jxVideoWeb[0].areaClassName.split(',');

            console.log(eareClassNameArr);return;

            if(eareClassNameArr.length==0)return;
        */
        setTimeout(function () {
            /*
                    for(let i=0;i<eareClassNameArr.length;i++){

                        if(document.querySelector('.'+eareClassNameArr[i])){

                            videoSelect.addEventListener('click',function(e){

                                //console.log(e.target.parentNode.href);

                                setTimeout(function(){

                                    location.href=location.href;

                                },1000)

                            });

                        }

                    }
                    */

            let videoSelect = document.querySelectorAll('.' + jxVideoWeb[0].areaClassName);

            if (videoSelect.length == 0) {
                console.log('该网站播放区类名改变');
                return;
            }

            videoSelect.forEach(function (item) {

                item.addEventListener('click', function (e) {

                    //console.log(e.target.parentNode.href);

                    setTimeout(function () {

                        location.href = location.href;

                    }, 1000)

                });

            });

        }, 2000);
    }
}

