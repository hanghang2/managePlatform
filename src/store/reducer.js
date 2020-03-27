let defaultState = {
    systemStyle:localStorage.systemStyle ? JSON.parse(localStorage.systemStyle) : {
        leftHead:{bgColor:'#20222a',textColor:'#ffffff'},
        leftMain:{bgColor:'#20222a',textColor:'#cccccc'},
        rightHead:{bgColor:'#ffffff',textColor:'#333333'},
        rightMain:{bgColor:'#ffffff',textColor:'#333333'},
    },//系统风格
    userInfo:{},//用户信息
    monthCode:localStorage.monthCode ? JSON.parse(localStorage.monthCode) : {},//月度密码信息
    indexUserData:{}, //首页用户信息
    userKeys:[],//钥匙列表
    editFamily:localStorage.editFamily ? JSON.parse(localStorage.editFamily) : {},//家人编辑信息
    familyNum:0, //家人数量
    user:localStorage.user,
    pageData:{}
}
//通知消息 store ---> reducer 数据收到改变通知
export default (state = defaultState, action = {})=>{
    // 方法一 适合大量模块修改
    // if(typeof reducerFun[action.type] == 'function') return reducerFun[action.type](state,action);
    // else return state;
    //方法二 适合少量模块修改
    switch (action.type) {
        case 'SET_userInfo'://用户信息
            return {...state,userInfo:action.value};
        case  'SET_monthCode'://月度密码信息
            localStorage.monthCode = JSON.stringify(action.value);//存缓存
            return {...state,monthCode:action.value};
        case 'SET_indexUserData'://首页用户信息
            return {...state,indexUserData:action.data};
        case 'SET_userKeys'://钥匙列表
            return {...state,userKeys:action.data};
        case 'SET_editFamily'://家人编辑信息
            localStorage.editFamily = JSON.stringify(action.data);//存缓存
            return {...state,editFamily:action.data};
        case 'SET_familyNum'://设置家人数量
            return {...state,familyNum:action.num};
        case 'SET_user'://设置家人数量
            localStorage.user = action.data;//存缓存
            return {...state,user:action.data};
        case 'SET_pageData':
            state.pageData[action.attr] = action.data;
            return state;
        case 'SET_systemStyle':
            localStorage.systemStyle = JSON.stringify(action.data);//存缓存
            return {...state,systemStyle:action.data};
        default:
            return state;
    }
}

//set state方法
// const reducerFun = {
//     SET_userInfo(state,action){//用户信息
//         return {...state,userInfo:action.value};
//     },
//     SET_monthCode(state,action){//月度密码信息
//         localStorage.monthCode = JSON.stringify(action.value);//存缓存
//         return {...state,monthCode:action.value};
//     },
//     SET_indexUserData(state,action){//首页用户信息
//         return {...state,indexUserData:action.data};
//     },
//     SET_userKeys(state,action){//钥匙列表
//         return {...state,userKeys:action.data};
//     },
//     SET_editFamily(state,action){//家人编辑信息
//         localStorage.editFamily = JSON.stringify(action.data);//存缓存
//         return {...state,editFamily:action.data};
//     },
//     SET_familyNum(state,action){//设置家人数量
//         return {...state,familyNum:action.num};
//     }
// }

