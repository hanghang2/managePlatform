import NODE_ENV from '../buildConfig';
// import {testData} from './testData'
//是否为测试状态
// let isTest = false;

import Axios from './axios';
Axios.init();
//pc调试阶段 true是 false否
const isPctest = NODE_ENV.DEV;
// const isPctest = false;
export let OSS = NODE_ENV.OSS_URL;
let  avatar = '',
    bindStatus = '',
    communityId = '',
    communityName = '',
    name = '',
    phone = '',
    userId = '',
    url = '',
    nickName = '',
    corpid = '',
    id = '';
export let UserInfo =  {
    avatar:'',
    bindStatus:'',
    communityId:'',
    communityName:'',
    name:'',
    phone:'',
    userId:'',
    url:'',
    nickName:'',
    id:''
};
if(isPctest){
    avatar = "https://static-legacy.dingtalk.com/media/lADPDgQ9qqJREgzNCnfNCnM_2675_2679.jpg";
    bindStatus = "2";
    communityId = 12;
    communityName = '双桥新村东苑';
    name = '郑毅行';
    phone = '18502541906';
    userId = '184323125736517304';
    url = 'dingtalk://dingtalkclient/action/open_micro_app?miniAppId=2019082366360709&version=613811&source=DEBUG&agentId=283599764&pVersion=1&packageType=1&corpId=ding46e6d4b2c77e214f35c2f4657eb6378f';
    nickName = '业主9354';
    id = 5376;
    UserInfo = localStorage.UserInfo ? JSON.parse(localStorage.UserInfo) : {
        avatar:avatar,
        bindStatus:bindStatus,
        communityId:communityId,
        communityName:communityName,
        name:name,
        phone:phone,
        userId:userId,
        url:url,
        nickName:nickName,
        id:id
    };
}
//请求头设置
export let  httpHeader = {
    "x-code":"xiaozhi",
    "x-client":"owner",
    "x-invoker":"dingding",
    "x-userid":"",
    "communityid":"",
    // 'content-type': 'application/x-www-form-urlencoded',
    'code':"xiaozhi"
}

if(isPctest){
    // corpid = 'ding46e6d4b2c77e214f35c2f4657eb6378f';//求是
    corpid = 'dingc9bff05153ae821d35c2f4657eb6378f';//开发试运行
    httpHeader["x-corpid"] = corpid;
}
export const Apps = {
    config(param, success) {//获取corpid
        param.code = httpHeader["code"];
        postHttp('app/app/dingding/config',param, success);
    },
    access(param, success) {//免登鉴权接口
        httpHeader.authcode = param.authCode;
        param.code = httpHeader["code"];
        postHttp('app/app/dingding/access',param, success);
    },
    xiaozhiJsApi(param, success) {//小智用户、房产同步（返回登录token）
        postHttp('app/app/dingding/xiaozhiJsApi',param, success);
    }
}
export const Index = {//首页
    list(param, success) {
        postHttp('app/app/mdownermember/list', param, success)
    }
}
export const AddHome = {//添加家人
    list(param, success) {//获取家人list
        postHttp('app/app/mdownermember/list', param, success)
    },
    relationlistapi(param, success) {//获取与业主的关系
        postHttp('app/app/mine/relationlistapi', param, success)
    },
    addmember(param, success) {//添加家人
        postHttp('app/app/mdownermember/addmember', param, success)
    },
    deletemember(param, success) {//删除家人
        postHttp('app/app/mdownermember/deletemember', param, success)
    },
    updatemember(param, success) {//编辑家人
        postHttp('app/app/mdownermember/updatemember', param, success)
    }
}
export const user = {
    applyKey(param, success) {
        postHttp('app/app/xiaozhi/check', param, success)
    },
}
//房产管理
export const FacialInformation = {
    qiniufilecapture(param, success) {//上传图片
        // postHttp('app/app/xiaozhi/qiniufilecapture', param, success)
        postFormHttp('app/app/xiaozhi/qiniufilecapture', param, success)
    }
}

//检验userId
function userIdVerify (param,callback,config,form){
    httpHeader["x-userid"] = UserInfo.userId;
    httpHeader["communityid"] = UserInfo.communityId;
    if(!form){
        param.communityid = httpHeader.communityid;
    }
    callback();
}

//get请求
function getHttp (url,param, success){
    let config = {headers:httpHeader};
    userIdVerify(param,()=>{
        Axios.axiosInstance.get(url, {params:param},config).then((response) => {
            success(response)
        }).catch((err) => {
            // console.log(err);
        })
    },config)
}
//post请求
function postHttp (url,param, success){
    let config = {
        headers:httpHeader
    };
    userIdVerify(param,()=>{
        Axios.axiosInstance.post(url, param,config).then((response) => {
            success(response)
        }).catch((err) => {
            console.log(err);
            // Toast.fail(err.msg,2)
        })
    },config)
}
//模拟form提交
function postFormHttp (url,param, success){
    //添加请求头
    userIdVerify(param,()=>{
        let config = {
            headers: {
                ...httpHeader,
                'Content-Type': 'multipart/form-data'
            },
            transformRequest: [function(data) {
                return data;
            }],
        }
        Axios.axiosInstance.post(url, param, config).then((response) => {
            success(response)
        }).catch((err) => {
            // console.log(err);
        })
    },{},true)
}

