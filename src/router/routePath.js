import Index from '../page/Index' //首页
import FacialInformation from '../page/FacialInformation' //人脸信息上传
import applyKeys from '../page/applyKeys'//人脸信息介绍
import Password from  '../page/Password'//住户密码
import AddHomeMember from  '../page/AddHomeMember'//添加家人--列表页面
import AddHomeForm from  '../page/AddHomeForm'//添加家人--添加页面
import EditHomePerson from  '../page/EditHomePerson'//编辑家人

export default [
    {
        name:'首页',
        path:'/Index',
        component:Index
    },{
        name:'人脸信息上传',
        path:'/FacialInformation',
        component:FacialInformation
    },{
        name:'钥匙列表',
        path:'/applyKeys',
        component:applyKeys
    },{
        name:'密码',
        path:'/Password',
        component:Password
    },{
        name:'家人列表',
        path:'/AddHomeMember',
        component:AddHomeMember
    },{
        name:'添加家人',
        path:'/AddHomeForm',
        component:AddHomeForm
    },{
        name:'编辑家人',
        path:'/EditHomePerson',
        component:EditHomePerson
    },
]
