/*  项目使用了 react + react-router-dom(4.x) + redux + axios;
* 协助插件:(react-redux方便components操作store ， redux-thunk异步操作store);
* 另外:(可以使用sass(scss)、css外部样式，或者react内部样式);
*/
/* 项目命令(使用react-scripts插件控制，如果想手动控制参考如下eject命令[慎用，目前开发环境配置已经满足开发])
*start为开发环境(process.env.NODE_ENV为development)
*build为生产环境(process.env.NODE_ENV为production)
*test为测试环境(运行测试脚本等功能)
*eject请勿使用(作用如下)
* react-scripts 是 create-react-app 的一个核心包，一些脚本和工具的默认配置都集成在里面，而 yarn eject 命令执行后会将封装在 create-react-app 中的配置全部反编译到当前项目，这样用户就能完全取得 webpack 文件的控制权。所以，eject 命令存在的意义就是更改 webpack 配置存在的
* */
import React from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';//ie兼容
import {Provider} from 'react-redux';//操作状态管理
import * as serviceWorker from './utils/serviceWorker';
//自定义文件
import NODE_ENV from  './buildConfig';//打包配置文件
// import './utils/rem';
import Route from './router';
import store from './store'; //状态管理
import './style/index.css';
const render = Component => {
    ReactDOM.render(
        <Provider store={store}>
            <Component store={store}/>
        </Provider>,
        document.getElementById('root')
    )
}
render(Route)
// 取消网页缓存
serviceWorker.unregister();
