/**********************调用钉钉的所有方法*******************************/
import NODE_ENV from '../buildConfig';
//调用钉钉插件
import dd from 'dingtalk-jsapi'
//pc调试阶段 true是 false否    测试 组id,测试微应用ID
const test = NODE_ENV.DEV , testAgentId = '265952307',testCorpId = 'dingc9bff05153ae821d35c2f4657eb6378f';//顶顶开发试运行

let androidOrios;//钉钉全局变量、判断是否是手机端
const corpId = test ? testCorpId : 'dinge12dff95506bf28535c2f4657eb6378f';//钉钉未来社区
export const Authentication = {//鉴权 免登
    config(timeStamp,nonceStr,signature){
        //************************************鉴权url不能加#号****************************************
        if(androidOrios){
            dd.ui.webViewBounce.disable();//禁用iOS webview弹性效果。
            dd.config({
                agentId: test ? testAgentId : '269693527', // 必填，微应用ID
                corpId: corpId,//必填，企业ID
                timeStamp: timeStamp, // 必填，生成签名的时间戳
                nonceStr: nonceStr, // 必填，生成签名的随机串
                signature: signature, // 必填，签名
                //type:0/1,   //选填。0表示微应用的jsapi,1表示服务窗的jsapi；不填默认为0。该参数从dingtalk.js的0.8.3版本开始支持
                jsApiList : [
                    'device.audio.startRecord',
                    'device.audio.stopRecord',
                    'device.audio.onRecordEnd',
                    'device.audio.translateVoice',
                ] // 必填，需要使用的jsapi列表，注意：不要带dd。
            });
        }
    },
    getAuthCode(corpid,callback,error){
        androidOrios = dd.ios || dd.android;
        if(androidOrios){
            dd.ui.webViewBounce.disable();//禁用iOS webview弹性效果。
            dd.runtime.permission.requestAuthCode({//调用此api不需要进行鉴权（即不需要进行dd.config）
                corpId: corpid,
                onSuccess: function(result) {
                    callback(result)
                    /*{
                        code: 'hYLK98jkf0m' //string authCode
                    }*/
                },
                onFail : function(err) {
                    error();
                    alert(JSON.stringify(err))

                }

            })
        }
    },
    webViewBounceDisable(){
        androidOrios = dd.ios || dd.android;
        if(androidOrios) {
            dd.ui.webViewBounce.disable();//禁用iOS webview弹性效果。
        }
    }
}

//设置标题
export const pageTitle = {
    init(thisRoute,success){
        androidOrios = dd.ios || dd.android;
        if(androidOrios){
            //设置head中心文字
            dd.biz.navigation.setTitle({
                title : thisRoute.meta.title
            });
            dd.biz.navigation.setIcon({
                showIcon: false
            });
            //判断head是否有右侧文字导航
            if(thisRoute.meta.rightText){
                dd.biz.navigation.setRight({
                    show: true,
                    control: true,
                    text: thisRoute.meta.rightText,
                    onSuccess : function(result) {
                        if(thisRoute.meta.rightRoute){
                            success(thisRoute.meta.rightRoute);
                        }
                    },
                });
            }else{
                dd.biz.navigation.setRight({
                    show: false,
                });
            }

        }
    }
}
export let Schedule_Ding = {
    setTitel(text){
        if(!androidOrios){
            return;
        }
        //设置head中心文字
        dd.biz.navigation.setTitle({
            title : text
        });
    },
    setIcon(success){
        if(!androidOrios){
            return;
        }
        dd.biz.navigation.setIcon({
            showIcon : true,//是否显示icon
            iconIndex : 101,//显示的iconIndex, 如上图
            onSuccess : (result)=> {
                //点击icon之后将会回调这个函数
                success()
            }
        })
    },
    setRight(rightText,success){
        if(!androidOrios){
            return;
        }
        dd.biz.navigation.setRight({
            show: true,
            control: true,
            text: rightText,
            onSuccess : (result)=> {
                success();
            },
        });
    }
}

export let record = {
    start(callback){//开始
        if(androidOrios){
            dd.ready(function(){
                //开始
                dd.device.audio.startRecord({
                    onSuccess : function () {//支持最长为300秒（包括）的音频录制，默认60秒(包括)。
                    },
                    onFail : function (err) {

                    }
                });
                //自动停止监听
                dd.device.audio.onRecordEnd({
                    onSuccess : function(res) {
                        // res.mediaId; // 停止播放音频MediaID
                        // res.duration; // 返回音频的时长，单位：秒
                        callback(res.mediaId,res.duration)
                    },
                    onFail : function (err) {

                    }
                });
            })
        }
    },
    end(callback){
        if(!androidOrios){
            return;
        }
        dd.ready(function(){
            dd.device.audio.stopRecord({
                onSuccess : function(res){
                    //res.mediaId; // 返回音频的MediaID，可用于本地播放和音频下载
                    //res.duration; // 返回音频的时长，单位：秒
                    callback(res.mediaId,res.duration);
                },
                onFail : function (err) {
                }
            });
        })
    },
    translateVoice(mediaId,duration,callback){//语音转文字
        if(!androidOrios){
            return;
        }
        dd.ready(function(){
            dd.device.audio.translateVoice({
                mediaId : mediaId,
                duration : duration,
                onSuccess : function (res) {
                    // res.mediaId; // 转换的语音的mediaId
                    // res.content; // 语音转换的文字内容
                    callback(res.content)
                },
                onFail : function (err) {
                    callback()
                }
            });
        })
    }
}
export let goApplet = {//打开小程序
    go(urlHead,urlBody){
        androidOrios = dd.ios || dd.android;
        if(!androidOrios){
            return;
        }
        dd.ready(function() {
            dd.biz.util.openLink({
                url:urlHead + "&page=" + urlBody,
                onSuccess : function(result) {
                    /**/
                },
                onFail : function(err) {}
            })
        });
    },
    open(url){
        if(!androidOrios){
            return;
        }
        dd.ready(function() {
            dd.biz.util.openLink({
                url:url,
                onSuccess : function(result) {
                    /**/
                },
                onFail : function(err) {}
            })
        });
    }
}


let util = {
    get_accessToken(){

    }
}

