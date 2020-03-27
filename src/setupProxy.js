const proxy = require('http-proxy-middleware')
// 8081
const proxyUrl = "http://192.168.1.227:8080";//刘名震
// const proxyUrl = "http://192.168.1.23:8085";//孙培文
// const proxyUrl = "http://49.4.25.83:8080/";//求是

module.exports = function(app) {
    app.use(proxy('/app', {
            target: proxyUrl,
            secure: false,
            changeOrigin: true,
            pathRewrite: {
                "^/app": "/app"
            },
        })
    );
};
