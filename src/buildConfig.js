let config = {};
//开发环境
if(process.env.NODE_ENV == "development"){
    config = {
        API_ROOT:'/',
        OSS_URL:"http://dingdingpro.oss-cn-hangzhou.aliyuncs.com/",
        DEV:false
    }
}else if(process.env.NODE_ENV == "production"){
//    生产环境
    config = {
        API_ROOT: 'http://49.4.25.83:8080/',//求是
        OSS_URL:"http://qiushipro.oss-cn-hangzhou.aliyuncs.com/",//求是
        // API_ROOT: 'http://dingding.emagiclife.com/',//未来社区
        // OSS_URL:"http://dingdingpro.oss-cn-hangzhou.aliyuncs.com/",//未来社区
        // API_ROOT:'http://192.168.1.227:8080/',
        // OSS_URL:"http://dingdingpro.oss-cn-hangzhou.aliyuncs.com/",
        DEV:false
    }
}
export default config;



