import {createStore, applyMiddleware} from 'redux'
import userReducer from './reducer'
import thunk from 'redux-thunk' //用于处理异步action

let store = createStore(
    userReducer,
    applyMiddleware(thunk)
)

export default store

/* redux使用
*  1.组建设置状态管理值
*  components(改变数据) -> action(通知store) -> store(根据action-type发送给reducer) -> reducer(改变数据)
*  2.组建获取状态管理值
*  store(初始值、数据改变) -> components(初始赋值,接受到store改变通知)
*  注：store.subscribe(function);设置components监听函数
*  3.本项目使用components中react-redux操作和获取不使用以上方法;
*/
